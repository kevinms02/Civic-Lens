```md
# Product Requirements Document (PRD)

## Product Name
**PolicyDecode** *(working title)*  

Alternative names:
- CivicLens
- GovSimplify
- PolicyLens

**Tagline:**  
> Understand government policies in seconds.

---

# 1. Executive Summary

PolicyDecode is an **AI-powered Government Policy Explainer** designed to transform complex government policies (tax regulations, social assistance programs, education policies, healthcare regulations, etc.) into **clear, simple, and easy-to-understand explanations for citizens**.

Government policies are often written in legal or bureaucratic language, making them difficult for the general public to understand. PolicyDecode aims to bridge this gap by using AI to **summarize, simplify, and explain policy impacts** in seconds.

### MVP Goal
Allow users to:

- Paste government policy text
- Upload policy documents (PDF)
- Instantly receive:
  - TL;DR summary
  - Key points
  - Impact for citizens

---

# 2. Problem Statement

Government policies are often difficult for citizens to understand because they are:

- Written in complex legal language
- Long and difficult to navigate
- Full of bureaucratic and technical terminology

As a result, many citizens:

- Do not know their rights
- Misinterpret regulations
- Do not understand how policies affect them

Examples of confusing policies:

- Small business tax regulations
- Electricity subsidy policies
- National healthcare policies (BPJS)
- Social assistance programs
- Education regulations

---

# 3. Target Users

## Primary Users

- General citizens
- University students
- Small business owners (UMKM)
- Workers and freelancers

## Secondary Users

- Journalists
- NGOs
- Law and public policy students
- Policy analysts

---

# 4. Product Vision

Make government policies **accessible and understandable for everyone** using AI.

### Long-Term Vision

Become the **“Google Translate for public policies.”**

---

# 5. Key Use Cases

## Use Case 1 — Simplify Policy

Users want to quickly understand a government regulation.

Flow:

```

paste policy text
↓
AI simplification
↓
simple explanation

```

---

## Use Case 2 — Upload Policy Document

Users upload a PDF document containing a government policy.

Flow:

```

upload PDF
↓
extract text
↓
AI analysis

```

---

## Use Case 3 — Impact Analysis

Users want to understand how the policy affects them.

Example output:

```

Impact for:

* Students
* Workers
* Small businesses

```

---

# 6. Core Features (MVP)

## Feature 1 — Policy Simplifier

Transforms complex policy language into simple explanations.

Example output:

```

Simple Explanation

```

---

## Feature 2 — Key Points Extraction

Extracts the most important points from the policy.

Example:

```

Key Points

* Rule 1
* Rule 2
* Rule 3

```

---

## Feature 3 — TL;DR Summary

Provides a short **2–3 sentence summary** of the policy.

---

## Feature 4 — Impact Analysis

Explains how the policy affects different groups of citizens.

Example:

```

Impact for Small Businesses
Impact for Students
Impact for Workers

```

---

## Feature 5 — Policy Q&A (Optional)

Users can ask questions about the policy.

Example:

```

Do freelancers need to pay tax?

```

The AI will answer based on the uploaded policy document.

---

# 7. Example User Flow

### Step 1
User opens the website.

### Step 2
User inputs policy text or uploads a document.

```

paste text
or
upload document

```

### Step 3
AI processes the policy.

### Step 4
Results are displayed in a dashboard.

```

Policy Summary
Key Points
Impact

```

---

# 8. UI Pages

## Home Page

Main elements:

- Headline and product introduction
- Policy text input
- Upload document button

---

## Result Page

Sections displayed:

```

Policy Overview
TLDR
Key Points
Impact
Ask Questions

```

---

# 9. Technical Requirements

## Frontend

- Next.js
- TailwindCSS
- Shadcn UI

---

## Backend

- Node.js API  
or  
- Python FastAPI

---

## AI Models

- Google Gemini API
- Groq
- OpenRouter

---

## Document Processing

- pdf-parse
- LangChain

---

## Database (Optional)

- Supabase
- Firebase

---

# 10. AI Prompt Design

Example prompt used for policy explanation:

```

Explain the following government policy in simple language.

Provide:

1. A simple explanation
2. Key points
3. Impact for citizens

```

---

# 11. Success Metrics

For hackathon evaluation:

- Policy explanation generated in under 5 seconds
- Clear and understandable summaries
- Stable demo without errors

---

# 12. Future Features (Post-Hackathon)

## Policy Comparison

Compare previous and updated policies.

---

## Personalized Impact

Users select their profile:

```

Student
Worker
Business Owner

```

AI explains how the policy affects them specifically.

---

## Policy Chatbot

Users can chat with policy documents similarly to ChatGPT.

---

# 13. Risks

## AI Hallucination

Solution:

- Use RAG (Retrieval Augmented Generation)
- Display source references

---

## Long Documents

Solution:

- Text chunking before sending to the AI model

---

# 14. Development Timeline (7 Days)

| Day | Task |
|----|----|
| Day 1 | Project setup |
| Day 2 | Basic UI |
| Day 3 | AI integration |
| Day 4 | Document upload |
| Day 5 | Impact analysis |
| Day 6 | UI polishing |
| Day 7 | Testing and pitch preparation |

---

# 15. Demo Script (Hackathon)

During the presentation:

1. Take a complex tax policy document
2. Paste the text into the web app
3. Click **Explain Policy**

Expected output:

```

TLDR
Key Points
Impact

```

Judges can immediately see the value of the product.

---

# Product Positioning

> **AI that translates government policies into language everyone can understand.**
```
