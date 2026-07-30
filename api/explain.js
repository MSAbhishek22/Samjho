// /api/explain.js — Vercel serverless function
// Accepts POST { topic, interest, lang, mode?, previousAnalogy?, missingPart? }
// mode="explain" (default) → Prompt A
// mode="reteach"           → Prompt C

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

const LANG_INSTRUCTIONS = {
  en: 'Hinglish — a casual, warm mix of Hindi and English written in Roman script, exactly as Indian students speak in everyday conversation',
  hi: 'Hindi written in Devanagari script (pure Hindi, not Hinglish)',
  ta: 'Tamil written in native Tamil script (pure Tamil, not transliterated)',
  bn: 'Bengali written in native Bengali script (pure Bengali, not transliterated)',
  mr: 'Marathi written in native Devanagari script (pure Marathi, not transliterated)',
};

const PROMPT_A = ({ topic, interest, lang_instruction }) => `\
You are Samjho, a friendly Indian tutor who explains concepts using analogies from a student's own interests.
Respond ONLY in ${lang_instruction}.

Student's topic: ${topic}
Student's interest area: ${interest}

Task: Explain the concept in 3–4 short sentences using a vivid analogy from their interest area.
Keep it simple, warm, and conversational — like an elder sibling explaining, not a textbook.
End with the ${lang_instruction} equivalent of: "Ab tum apne shabdon mein mujhe samjhao ye concept?"

Do NOT use complex jargon. Do NOT exceed 90 words total.`;

const PROMPT_C = ({ topic, interest, lang_instruction, missingPart, previousAnalogy }) => `\
The student did not fully grasp this part of the concept: "${missingPart}"

Original topic: ${topic}
Interest area: ${interest}
Previous analogy used: ${previousAnalogy}

Task: Re-explain ONLY the missing part using a DIFFERENT analogy — specifically, do NOT reuse the same domain as the previous analogy; pick a completely fresh angle (e.g. if previous was cricket, try daily life, cooking, or a journey instead).
Keep it under 65 words, respond in ${lang_instruction}, warm encouraging tone.
End with the ${lang_instruction} equivalent of "Ab dobara try karo?"`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    topic,
    interest,
    lang = 'en',
    mode = 'explain',
    previousAnalogy = '',
    missingPart = '',
  } = req.body;

  if (!topic || !interest) {
    return res.status(400).json({ error: 'topic and interest are required' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }

  const lang_instruction = LANG_INSTRUCTIONS[lang] || LANG_INSTRUCTIONS.en;

  const systemContent =
    mode === 'reteach'
      ? PROMPT_C({ topic, interest, lang_instruction, missingPart, previousAnalogy })
      : PROMPT_A({ topic, interest, lang_instruction });

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: systemContent }],
        temperature: 0.72,
        max_tokens: 200,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq API error:', groqRes.status, errText);
      return res.status(502).json({ error: 'Groq API error', detail: errText });
    }

    const data = await groqRes.json();
    const explanation = data.choices?.[0]?.message?.content?.trim() || '';

    return res.status(200).json({ explanation });
  } catch (err) {
    console.error('explain handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
