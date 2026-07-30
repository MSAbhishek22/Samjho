<div align="center">

# 🧠 Samjho — Voice-First AI Tutor

### _"Until you truly understand, Samjho won't stop."_

<br>

[![Built with Groq](https://img.shields.io/badge/LLM-Groq%20%7C%20Llama%203.3%2070B-FF6B35?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkw0IDdWMTdMMTIgMjJMMjAgMTdWN0wxMiAyWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+)](https://groq.com)
[![Voice First](https://img.shields.io/badge/Voice-Web%20Speech%20API-4CAF50?style=for-the-badge&logo=google-chrome&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20HI%20%7C%20TA%20%7C%20BN%20%7C%20MR-E8A87C?style=for-the-badge&logo=translate&logoColor=white)](#-multilingual-support)
[![Three.js](https://img.shields.io/badge/3D-Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

<br>

**Samjho** is an AI tutor that doesn't just explain concepts — it explains them using analogies from **your world** (cricket, farming, gaming, Bollywood), then makes you **teach it back** to verify you actually understood. Not memorized. _Understood._

<br>

---

</div>

## 🎯 The Problem

> **India's education system rewards rote memorization over conceptual understanding.**

- Students _"yaad karte hain"_ exam ke liye — they don't truly _"samajhte"_.
- Personal tutors cost ₹500–2000/hr — inaccessible to Tier-2/3 India.
- Existing AI tools (ChatGPT, etc.) are **one-directional**: student asks → AI explains → done. Nobody checks if the student _actually_ understood.
- **Result:** The illusion of learning. It _sounded_ clear, but ask the student to explain it? Silence.

---

## 💡 The Solution — The Teach-Back Loop

Samjho's entire product is a **6-step learning loop** that no other AI tutor implements:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   1. Student picks a topic  ──→  "Newton's Third Law"       │
│                                                             │
│   2. Picks an interest world ──→  🏏 Cricket                │
│                                                             │
│   3. Samjho explains using    ──→  "Jab bat ball pe force   │
│      a vivid analogy               lagata hai, ball bhi     │
│      from THAT world               utni hi force wapas..."  │
│                                                             │
│   4. Student teaches it back  ──→  Voice or text input      │
│      in their OWN words                                     │
│                                                             │
│   5. AI evaluates the          ──→  ✅ Mastery unlocked     │
│      teach-back attempt             ❌ Gap detected →       │
│                                        re-teach with NEW    │
│                                        angle automatically  │
│                                                             │
│   6. Progress tracked         ──→  Concepts: Mastered /     │
│                                     In Progress              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

> **That loop is the entire differentiation.** 90% of hackathon "AI tutor" submissions are chatbots that explain stuff. Almost none _verify_ understanding with a teach-back loop.

---

## ✨ Key Features

### 🎤 Voice-First Interface
Real browser-native speech input and output — no external APIs, no latency. Students speak naturally, just like talking to a tutor. Graceful text-input fallback when voice isn't available.

### 🌍 Interest-Personalized Analogies
The same concept explained differently based on what the student cares about:

| Interest | Newton's Third Law Analogy |
|---|---|
| 🏏 Cricket | _"Jab bat ball pe force lagata hai, ball bhi bat pe utni hi force wapas lagata hai..."_ |
| 🌾 Farming | _"Jab hal mitti mein ghusta hai, mitti bhi hal pe utna hi resistance deti hai..."_ |
| 🎮 Gaming | _"Jab character punch marta hai, recoil animation character ko bhi peeche dhakelta hai..."_ |
| 🎬 Bollywood | _"Hero fight scene mein punch marta hai — punch asli lagane ke liye hero ka body bhi jolt hona chahiye..."_ |

### 🧪 AI-Powered Gap Detection
Not keyword matching — real LLM evaluation that understands _what_ the student got right, _what_ they missed, and generates targeted feedback:

```json
{
  "understood": false,
  "correct_parts": ["opposite direction"],
  "missing_or_wrong_part": "equal force — student didn't mention that the reaction force is equal in magnitude",
  "encouragement_line": "Bahut achha try kiya! Bas ek part reh gaya..."
}
```

### 🔄 Adaptive Re-Teaching
When a gap is detected, Samjho doesn't repeat the same explanation — it generates a **completely different analogy** from a fresh angle, targeting specifically the part the student missed.

### 🌐 Multilingual Support
Full interface and AI responses in **5 languages**, each in its native script:

| Language | Script | Example |
|---|---|---|
| 🇬🇧 English | Hinglish (Roman) | _"Arre yaar, Newton's Third Law toh simple hai..."_ |
| 🇮🇳 Hindi | देवनागरी | _"जब बल्ला गेंद पर बल लगाता है..."_ |
| 🇮🇳 Tamil | தமிழ் | _"மட்டை பந்தை அடிக்கும்போது..."_ |
| 🇮🇳 Bengali | বাংলা | _"ব্যাট যখন বলে আঘাত করে..."_ |
| 🇮🇳 Marathi | देवनागरी | _"बॅट जेव्हा चेंडूला मारतो..."_ |

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Vanilla HTML/CSS/JS | Single self-contained file, no build step |
| **3D Visuals** | Three.js (r128) | Interactive wireframe orb with particles |
| **Animation** | GSAP + ScrollTrigger | Scroll reveals, magnetic buttons, tilt cards, custom cursor |
| **LLM Brain** | Groq API (Llama 3.3 70B) | Explanation generation + teach-back evaluation |
| **Voice Input** | Web Speech API (STT) | Browser-native, zero-cost speech recognition |
| **Voice Output** | Web Speech API (TTS) | Browser-native text-to-speech |
| **Backend** | Vercel Serverless Functions | Thin API proxy to keep Groq key server-side |
| **i18n** | Custom translation system | 5-language support with per-language font stacks |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- A **Groq API key** → [Get one free at console.groq.com](https://console.groq.com)
- **Chrome or Edge** (for voice features — other browsers use text fallback)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/MSAbhishek22/Samjho.git
cd Samjho

# 2. Create your environment file
echo "GROQ_API_KEY=your_key_here" > .env

# 3. Start the local dev server
npx vercel dev --local

# 4. Open in Chrome
# → http://localhost:3000
```

> ⚠️ **Important:** Don't open `index.html` directly from disk (`file://`) — mic permissions require a real local server. Use `vercel dev` or `npx serve`.

### Deploy to Vercel

```bash
# One-command deploy
npx vercel --prod

# Then set your API key in the Vercel dashboard:
# Project Settings → Environment Variables → GROQ_API_KEY
```

---

## 📁 Project Structure

```
samjho/
├── index.html              # Complete frontend — HTML + CSS + JS + Three.js
│                            #   (translations, state machine, STT/TTS, animations)
├── api/
│   ├── explain.js           # Serverless: Prompt A (explain) + Prompt C (re-teach)
│   └── evaluate.js          # Serverless: Prompt B (teach-back evaluation)
├── vercel.json              # Routes /api/* to serverless functions
├── .env                     # GROQ_API_KEY (server-side only, never committed)
├── .gitignore               # Excludes .env, node_modules, audit/
└── README.md                # You are here
```

---

## 🔬 How the AI Works

Samjho uses **three specialized prompts**, each with a distinct job:

### Prompt A — Explanation Generator
Generates a 3-4 sentence analogy-based explanation from the student's chosen interest world. Receives `{topic, interest, lang}` and outputs warm, conversational text in the target language's native script.

### Prompt B — Teach-Back Evaluator
Receives the original explanation + the student's teach-back attempt and returns a structured JSON verdict identifying exactly which parts were understood and which were missed. Features defensive JSON parsing to handle LLM output variations.

### Prompt C — Adaptive Re-Teacher
When a gap is detected, generates a **completely different analogy** (not the same domain twist) targeting specifically the missed concept. Capped at 2 re-teach attempts to avoid infinite loops.

---

## 🏆 Why This Wins

| Judging Criteria | How Samjho Delivers |
|---|---|
| **Educational Impact** | Targets the real gap — memorization vs. understanding. The teach-back loop catches the _illusion of learning_ before it becomes a failed exam. Works in 5 Indian languages for accessibility. |
| **Creative Use of AI/ML** | AI isn't a wrapper — it's the core mechanism _twice_: once for personalized analogies, again for free-form evaluation with specific gap detection, then adaptive re-teaching. |
| **Technical Execution** | Browser-native voice APIs (zero added cost), Groq for near-instant LLM responses, clean state machine architecture, defensive error handling with user-friendly loading states. |
| **Pitch & Demo** | The demo shows a real "catch" moment live — the AI identifies an incomplete understanding, making the core value proposition immediately visible, not just claimed. |

---

## 🔒 Security

- API keys are **never** exposed in client-side code
- All LLM calls route through server-side Vercel functions
- `.env` is in `.gitignore` — keys are set via Vercel's environment variable dashboard in production
- No user data is stored or transmitted beyond the active session

---

## ⚠️ Known Limitations

- **Voice input requires Chrome/Edge** — other browsers gracefully fall back to text input
- **TTS voice quality** depends on the OS's installed voices for each language
- **Groq rate limits** apply under heavy usage — the app shows clear error states rather than silently failing
- **Single topic in live demo** — Newton's Third Law (progress section shows static example cards for additional topics)

---

## 👨‍💻 Built By

**M S Abhishek** — Solo build  
BTech CSE (AI/ML)

---

<div align="center">

_This isn't just a tool. It's a **promise** — that next time you understand something, you'll **truly** understand it._

<br>

**[🚀 Try the Live Demo](#)** · **[📹 Watch the Video](#)**

</div>
