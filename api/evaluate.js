// /api/evaluate.js — Vercel serverless function
// Accepts POST { topic, explanation, transcript, lang }
// Returns { understood, correct_parts, missing_or_wrong_part, encouragement_line }

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

const PROMPT_B = ({ topic, explanation, transcript }) => `\
You are evaluating whether a student truly understood a concept based on their explanation back to you.

Original concept: ${topic}
Your explanation given to the student: ${explanation}
Student's teach-back attempt: ${transcript}

Task: Analyze which SPECIFIC part of the concept the student got right and which part (if any) they missed or got wrong.
Respond in this EXACT JSON format only — no extra text, no markdown fences, no explanation before or after:

{
  "understood": true,
  "correct_parts": ["short phrase 1", "short phrase 2"],
  "missing_or_wrong_part": null,
  "encouragement_line": "one warm Hinglish sentence of genuine praise"
}

If the student missed something, set understood to false and fill missing_or_wrong_part. If they got it right, set understood to true and missing_or_wrong_part to null.
The encouragement_line should always be warm, personal and in Hinglish regardless of the input language.`;

/**
 * Defensively extract JSON from a model response that may contain
 * extra prose, markdown code fences, or explanatory text.
 */
function extractJSON(raw) {
  // 1. Try direct parse first
  try { return JSON.parse(raw); } catch (_) {}

  // 2. Strip markdown code fences (```json ... ``` or ``` ... ```)
  const stripped = raw.replace(/```(?:json)?\s*/gi, '').replace(/```/g, '').trim();
  try { return JSON.parse(stripped); } catch (_) {}

  // 3. Find the first { ... } block in the text
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    try { return JSON.parse(raw.slice(start, end + 1)); } catch (_) {}
  }

  return null;
}

const FALLBACK_RESPONSE = {
  understood: false,
  correct_parts: [],
  missing_or_wrong_part: 'Could not fully evaluate — please try again',
  encouragement_line: 'Koi baat nahi, dobara try karo — tum kar sakte ho!',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic, explanation, transcript, lang = 'en' } = req.body;

  if (!topic || !transcript) {
    return res.status(400).json({ error: 'topic and transcript are required' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }

  const promptContent = PROMPT_B({
    topic,
    explanation: explanation || '(explanation not provided)',
    transcript,
  });

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: promptContent }],
        temperature: 0.3,   // lower temp → more reliable JSON output
        max_tokens: 300,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq API error:', groqRes.status, errText);
      return res.status(200).json(FALLBACK_RESPONSE); // degrade gracefully
    }

    const data = await groqRes.json();
    const raw = data.choices?.[0]?.message?.content || '';

    const parsed = extractJSON(raw);
    if (!parsed || typeof parsed.understood !== 'boolean') {
      console.warn('evaluate: could not parse Groq JSON, raw:', raw);
      return res.status(200).json(FALLBACK_RESPONSE);
    }

    return res.status(200).json({
      understood: parsed.understood,
      correct_parts: Array.isArray(parsed.correct_parts) ? parsed.correct_parts : [],
      missing_or_wrong_part: parsed.missing_or_wrong_part || null,
      encouragement_line: parsed.encouragement_line || FALLBACK_RESPONSE.encouragement_line,
    });
  } catch (err) {
    console.error('evaluate handler error:', err);
    return res.status(200).json(FALLBACK_RESPONSE); // always return usable shape
  }
}
