import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

export const maxDuration = 60;

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
        console.log("Validating content type in DETAIL route...");
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

        const systemPrompt = `You are an expert policy analyst. The user has provided a policy document and wants a brief, yet insightful explanation of it.
        
Write a concise, high-impact breakdown of the policy in markdown format. 
Limit your response to roughly 3-4 key sections. Focus ONLY on the most critical background, technical rules, and consequences.
Do NOT write a long essay. Keep it professional, sharp, and easy to skim.

Target Audience Role: ${jobType || "General Citizen"}
Language Constraint: You must write the entire response in ${language === 'id' ? 'Indonesian' : 'English'}.

Use markdown formatting like ## headers, **bold text**, and bullet points.`;

        console.log("Calling Groq API for DETAILED explanation...");
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Policy Text:\n\n${policyTextToAnalyze.substring(0, 15000)}` }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.4,
        });

        const generatedText = chatCompletion.choices[0]?.message?.content || "No details could be generated.";

        return NextResponse.json({ detail: generatedText }, { status: 200 });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
