import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

export const maxDuration = 60; // Set Vercel max duration if needed

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req: Request) {
    if (!GROQ_API_KEY) {
        return NextResponse.json({ error: 'GROQ_API_KEY is not configured.' }, { status: 500 });
    }

    try {
        const formData = await req.formData();
        const policyTextToAnalyze = formData.get('text') as string;
        const jobType = formData.get('jobType') as string;
        const language = formData.get('language') as string;

        if (!policyTextToAnalyze || !policyTextToAnalyze.trim()) {
            return NextResponse.json({ error: 'No text provided.' }, { status: 400 });
        }

        const groq = new Groq({ apiKey: GROQ_API_KEY });

        // Fast Validation Step
        console.log("Validating content type...");
        const validationCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a content classifier. Answer only with YES if the text is a government policy, law, legal regulation, or Terms of Service. Answer NO if it is anything else (recipes, stories, random text, etc.)." },
                { role: "user", content: `Text snippet: ${policyTextToAnalyze.substring(0, 1000)}` }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0,
        });

        const isValid = validationCompletion.choices[0]?.message?.content?.trim().toUpperCase();
        if (isValid?.includes('NO')) {
            return NextResponse.json({ error: language === 'id' ? 'Ini kayaknya bukan aturan pemerintah atau hukum deh. Kita cuma bisa bantu analisis dokumen resmi kebijakan aja.' : 'This content doesn\'t seem to be a government policy or law. We only analyze official regulatory documents.' }, { status: 400 });
        }

        // Extremely strict JSON-only prompt
        const systemPrompt = `You are a highly analytical AI assistant. You must output strictly valid JSON and nothing else. No markdown formatting, no thinking tags, no introductory text. Just the raw JSON object. 
 
The user wants to analyze a government policy or terms of service, specifically through the lens of a particular job or role.
 
Analyze the provided text and output a JSON object with this exact structure:
{
  "summary": "A 2-3 sentence extremely simple summary of what this policy does, in the tone of Gen Z slang/simple terms.",
  "keyPointsList": [
    "Key point 1",
    "Key point 2",
    "Key point 3"
  ],
  "impacts": [
    { "label": "Impact 1", "text": "Detail about impact 1", "bg": "bg-secondary" },
    { "label": "Impact 2", "text": "Detail about impact 2", "bg": "bg-accent" }
  ]
}

- Language: ${language === 'id' ? 'Indonesian' : 'English'}
- Target Role: ${jobType || "General Citizen"}
- Ensure "impacts" array has exactly 2 or 3 items, with "bg" randomly assigned "bg-secondary" or "bg-accent".`;

        console.log("Calling Groq API (llama-3.3-70b-versatile)...");
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Policy Text to Analyze:\n\n${policyTextToAnalyze.substring(0, 15000)}` }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.1, // Low temperature for more predictable JSON output
            response_format: { type: "json_object" } // Enforce JSON object response
        });

        const generatedText = chatCompletion.choices[0]?.message?.content || "{}";
        console.log("Raw Groq Output:", generatedText);

        try {
            const generatedData = JSON.parse(generatedText);
            return NextResponse.json(generatedData, { status: 200 });
        } catch (parseError) {
            console.error("Failed to parse Groq JSON response:", parseError);
            console.error("String that failed to parse:", generatedText);
            return NextResponse.json({ error: 'Failed to parse AI response into JSON.' }, { status: 500 });
        }

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
