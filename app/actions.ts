'use server';

export async function analyzeProject(userInput: string, fileList: string[]) {
  const GROQ_KEY = process.env.GROQ_API_KEY;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a Lead Structural Steel Detailing Auditor. 
            Provide an EXHAUSTIVE technical intake report. 
            DEPTH REQUIREMENTS:
            1. EXECUTIVE SUMMARY: Write 150-200 words of technical analysis.
            2. RISKS: Provide 3 deep-dive technical risks with paragraphs of explanation.
            3. BASIS: Identify sheet ranges (S101-S500) and NISD/AISC code compliance.
            4. HOURS: Use realistic detailing hours (e.g., 45-200 hrs) and calculate cost at $45/hr.`
          },
          {
            role: "user",
            content: `Files: ${fileList.join(", ")}. Notes: "${userInput}". 
            Return ONLY JSON: {
              "projectName": "string",
              "totalEstHours": "range",
              "totalEstCost": "range",
              "confidence": "Rating",
              "executiveAnalysis": "Detailed technical summary...",
              "detailedRisks": [{"title": "Name", "explanation": "Paragraph..."}],
              "basisOfEstimate": {"sheets": "S-Sheets", "standards": "NISD", "complexityReasoning": "Why hours?"},
              "hoursTable": [{"task": "Modeling", "low": 18, "high": 24, "pct": "30%", "notes": "audit notes"}]
            }`
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return JSON.parse(data.choices[0].message.content);

  } catch (error: any) {
    console.error("AI Error:", error.message);
    return { error: true, message: error.message };
  }
} 