import { IMentorVoice, MentorDifficulty, MentorTeachingStyle, MentorPace, MentorDepth } from '@atlas/types';

const VAPI_BASE = 'https://api.vapi.ai';
const VAPI_API_KEY = process.env.VAPI_API_KEY;

export const CURATED_VOICES: IMentorVoice[] = [
  {
    provider: 'openai',
    voiceId: 'alloy',
    name: 'Alloy (Balanced & Clear)',
    accent: 'US Neutral',
    description: 'Versatile, neutral, and easy to understand for technical explanations.',
  },
  {
    provider: 'openai',
    voiceId: 'echo',
    name: 'Echo (Warm & Articulate)',
    accent: 'US Clear',
    description: 'Crisp, articulate delivery with balanced resonance.',
  },
  {
    provider: 'openai',
    voiceId: 'fable',
    name: 'Fable (British & Academic - Feynman / Turing)',
    accent: 'British Academic',
    description: 'Formal, thoughtful cadence ideal for science, literature, history, and theory.',
  },
  {
    provider: 'openai',
    voiceId: 'onyx',
    name: 'Onyx (Deep & Authoritative - Marcus Aurelius / Sagan)',
    accent: 'US Baritone',
    description: 'Deep, calm, and commanding voice suited for philosophy, physics, and leadership.',
  },
  {
    provider: 'openai',
    voiceId: 'shimmer',
    name: 'Shimmer (Gentle & Wise - Mahatma Gandhi / Hypatia)',
    accent: 'US Gentle',
    description: 'Gentle, meditative, patient tone ideal for ethics, peace, deep wisdom, and beginners.',
  },
  {
    provider: 'openai',
    voiceId: 'nova',
    name: 'Nova (Energetic & Dynamic - Ada Lovelace)',
    accent: 'US Dynamic',
    description: 'Upbeat and encouraging, great for fast drills, motivation, and interactive coding.',
  },
  {
    provider: 'openai',
    voiceId: 'coral',
    name: 'Coral (Natural & Conversational - Marie Curie)',
    accent: 'US Standard',
    description: 'Ultra-low latency conversational tutor with natural cadence.',
  },
];

export interface IPersonaPreset {
  id: string;
  name: string;
  avatarUrl: string;
  subject: string;
  topic: string;
  voiceId: string;
  teachingStyle: MentorTeachingStyle;
  pace: MentorPace;
  depth: MentorDepth;
  difficulty: MentorDifficulty;
  roleplayPrompt: string;
  tagline: string;
}

export const HISTORICAL_PERSONAS: IPersonaPreset[] = [
  {
    id: 'gandhi',
    name: 'Mahatma Gandhi',
    avatarUrl: '🕊️',
    subject: 'Philosophy & Ethics',
    topic: 'Satyagraha, Non-Violent Resistance & Moral Leadership',
    voiceId: 'shimmer',
    teachingStyle: 'socratic',
    pace: 'slow',
    depth: 'deep_dive',
    difficulty: 'intermediate',
    tagline: 'Moral clarity, truth, and peaceful conviction',
    roleplayPrompt:
      'Adopt the humble, peaceful, and profoundly principled persona of Mahatma Gandhi. Speak with immense kindness, patience, and moral clarity. Use analogies of simple living, self-discipline (Swaraj), truth (Satya), and non-violence (Ahimsa) to answer every question.',
  },
  {
    id: 'feynman',
    name: 'Richard Feynman',
    avatarUrl: '⚛️',
    subject: 'Physics & Intuition',
    topic: 'Quantum Mechanics, First-Principles Thinking & The Feynman Technique',
    voiceId: 'fable',
    teachingStyle: 'storyteller',
    pace: 'brisk',
    depth: 'deep_dive',
    difficulty: 'intermediate',
    tagline: 'First-principles intuition and vibrant enthusiasm',
    roleplayPrompt:
      'Adopt the energetic, curious, and irreverent persona of Nobel laureate Richard Feynman. Break down abstract physics concepts into vivid, intuitive real-world visual models without jargon. Express boundless excitement for the beauty of nature and mathematics.',
  },
  {
    id: 'socrates',
    name: 'Socrates of Athens',
    avatarUrl: '🏛️',
    subject: 'Philosophy & Dialectic',
    topic: 'Epistemology, Ethics & Socratic Interrogation',
    voiceId: 'onyx',
    teachingStyle: 'socratic',
    pace: 'natural',
    depth: 'deep_dive',
    difficulty: 'advanced',
    tagline: 'Relentless Socratic questioning to uncover truth',
    roleplayPrompt:
      'Adopt the classical dialectical persona of Socrates. Answer questions by asking illuminating, thought-provoking questions. Challenge the learner to examine unstated assumptions, define terms rigorously, and arrive at truth through their own reasoning.',
  },
  {
    id: 'einstein',
    name: 'Albert Einstein',
    avatarUrl: '🌌',
    subject: 'Theoretical Physics',
    topic: 'Special & General Relativity, Thought Experiments (Gedankenexperiment)',
    voiceId: 'fable',
    teachingStyle: 'storyteller',
    pace: 'natural',
    depth: 'deep_dive',
    difficulty: 'advanced',
    tagline: 'Thought experiments, curved spacetime, and cosmic curiosity',
    roleplayPrompt:
      'Adopt the gentle, deeply contemplative persona of Albert Einstein. Use famous thought experiments (e.g. riding a beam of light, elevators in free fall) and emphasize that imagination is more important than mere knowledge. Format all equations in LaTeX ($...$).',
  },
  {
    id: 'turing',
    name: 'Alan Turing',
    avatarUrl: '💻',
    subject: 'Computer Science & Logic',
    topic: 'Computability Theory, Turing Machines & Artificial Intelligence',
    voiceId: 'echo',
    teachingStyle: 'direct',
    pace: 'natural',
    depth: 'deep_dive',
    difficulty: 'advanced',
    tagline: 'Algorithmic rigor, state machines, and mathematical beauty',
    roleplayPrompt:
      'Adopt the brilliant, analytical, and structured persona of Alan Turing. Explain problems in terms of finite automata, formal logic, algorithmic complexity, and information theory. Provide clean code snippets and mathematical proofs.',
  },
  {
    id: 'ada',
    name: 'Ada Lovelace',
    avatarUrl: '✨',
    subject: 'Algorithms & Mathematics',
    topic: 'Poetical Science & The Analytical Engine',
    voiceId: 'nova',
    teachingStyle: 'storyteller',
    pace: 'brisk',
    depth: 'deep_dive',
    difficulty: 'intermediate',
    tagline: 'The poetry of computation and analytical elegance',
    roleplayPrompt:
      'Adopt the visionary persona of Ada Lovelace, blending mathematical precision with "poetical science". Highlight how abstract computational loops and algorithms weave patterns just like the Jacquard loom.',
  },
];

export interface MentorAssistantConfig {
  name: string;
  subject: string;
  topic: string;
  difficulty: MentorDifficulty;
  teachingStyle: MentorTeachingStyle;
  pace?: MentorPace;
  depth?: MentorDepth;
  voiceProvider?: string;
  voiceId?: string;
  systemPrompt?: string;
}

async function vapiFetch(path: string, init?: RequestInit) {
  if (!VAPI_API_KEY) {
    console.warn('[vapi] VAPI_API_KEY is not set. Generating fallback assistant identifier.');
    return { id: `mock-assistant-${Date.now()}` };
  }

  const res = await fetch(`${VAPI_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${VAPI_API_KEY}`,
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Vapi API ${res.status}: ${body}`);
  }

  return res.json();
}

export function compileMentorSystemPrompt(m: MentorAssistantConfig): string {
  const paceInstructions = {
    slow: 'PACING: Speak slowly and deliberately. Break down complex steps. Pause verbally between key takeaways.',
    natural: 'PACING: Speak at a natural, balanced conversational speed.',
    brisk: 'PACING: Maintain a brisk, engaging pace. Keep momentum and transition smoothly between points.',
    fast: 'PACING: Speak fast and concisely. Ideal for rapid-fire drills and high-density reviews.',
  }[m.pace || 'natural'];

  const depthInstructions = {
    overview:
      'DEPTH: High-level intuitive overview. Focus on the big picture, relatable mental models, and real-world analogies rather than overwhelming technical proofs.',
    deep_dive:
      'DEPTH: Rigorous first-principles deep dive. Explain underlying mechanisms, mathematical proofs or formulas, architectural trade-offs, and failure modes.',
    exam_drill:
      'DEPTH: Rapid-fire exam and interview drill. Ask targeted Socratic questions, test edge cases, point out misconceptions immediately, and score answers.',
  }[m.depth || 'deep_dive'];

  const pedagogyInstructions = {
    socratic:
      'TEACHING STYLE: Socratic Method. Guide the learner by asking insightful questions rather than lecturing. Let them discover the answer with your scaffolding.',
    direct:
      'TEACHING STYLE: Direct & Structured. Give crisp, well-organized explanations with clear step-by-step logic.',
    storyteller:
      'TEACHING STYLE: Storyteller & Intuition. Ground every abstract concept in a memorable story, history, or real-life application.',
    coach:
      'TEACHING STYLE: Architectural Coach. Act as a senior practitioner providing direct feedback, engineering best practices, and pragmatic advice.',
  }[m.teachingStyle || 'socratic'];

  const difficultyInstructions = {
    beginner: 'DIFFICULTY: Beginner. Assume minimal background. Define key terms before using them.',
    intermediate: 'DIFFICULTY: Intermediate. Assume basic fundamentals; focus on practical applications and non-obvious nuances.',
    advanced: 'DIFFICULTY: Advanced. Assume strong prior mastery; discuss complex edge cases, theoretical limits, and advanced optimizations.',
  }[m.difficulty || 'intermediate'];

  const customGuidelines = m.systemPrompt ? `ADDITIONAL USER GUIDELINES:\n${m.systemPrompt}\n` : '';

  return `You are ${m.name}, an expert live voice AI mentor and tutor specializing in ${m.subject}, specifically focusing on "${m.topic}".

CORE LEARNING PARAMETERS:
- ${pedagogyInstructions}
- ${difficultyInstructions}
- ${depthInstructions}
- ${paceInstructions}

${customGuidelines}
VOICE-FIRST CONVERSATIONAL BEHAVIOR:
1. Speak in concise, digestible spoken turns (1-3 sentences per response). Never output huge monologues.
2. Pause and ask the learner short confirmation questions (e.g., "Does that make sense so far?", "What do you think happens next?").
3. LIVE VISUAL COMPANION SYNC (CRITICAL):
   - Whenever you explain a mathematical formula, equation, physical law, or complexity notation, ALWAYS output it in LaTeX ($...$ or $$...$$). E.g. $E = mc^2$, $f(x) = \sigma(Wx + b)$, $\mathcal{O}(n \log n)$, or $$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$.
   - Whenever you explain code snippets, algorithms, configuration, or commands, ALWAYS wrap them in Markdown code blocks (\`\`\`python ... \`\`\` or \`\`\`typescript ... \`\`\`).
   - Whenever you summarize a key principle or definition, preface it with "• Key Concept:" or bullet points so it is projected to the visual companion feed.
4. HANDLE INTERRUPTIONS: If the user interrupts you with a question, acknowledge their point directly and pivot without repeating everything from before.`;
}

export function buildVapiAssistantPayload(m: MentorAssistantConfig) {
  const systemPrompt = compileMentorSystemPrompt(m);
  const voiceProvider = m.voiceProvider || 'openai';
  const voiceId = m.voiceId || 'alloy';

  const voiceConfig: any =
    voiceProvider === '11labs'
      ? { provider: '11labs', voiceId: voiceId }
      : voiceProvider === 'cartesia'
        ? { provider: 'cartesia', voiceId: voiceId }
        : { provider: 'openai', voiceId: voiceId || 'alloy' };

  return {
    name: m.name,
    transcriber: {
      provider: 'deepgram',
      model: 'nova-2',
      language: 'en',
    },
    model: {
      provider: 'openai',
      model: 'gpt-4o-mini',
      temperature: 0.6,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
      ],
    },
    voice: voiceConfig,
    firstMessage: `Hi there, I'm ${m.name}. Ready to dive into ${m.topic}?`,
    firstMessageMode: 'assistant-speaks-first',
    // Extended session parameters: 30-minute max call duration, 120s silence tolerance
    maxDurationSeconds: 1800,
    silenceTimeoutSeconds: 120,
    responseDelaySeconds: 0.4,
    numWordsToInterruptAssistant: 2,
    clientMessages: [
      'conversation-update',
      'transcript',
      'model-output',
      'speech-update',
      'status-update',
      'user-interrupted',
    ],
  };
}

export async function createVapiAssistant(m: MentorAssistantConfig) {
  const assistant = await vapiFetch('/assistant', {
    method: 'POST',
    body: JSON.stringify(buildVapiAssistantPayload(m)),
  });
  return assistant.id as string;
}

export async function updateVapiAssistant(assistantId: string, m: MentorAssistantConfig) {
  await vapiFetch(`/assistant/${assistantId}`, {
    method: 'PATCH',
    body: JSON.stringify(buildVapiAssistantPayload(m)),
  });
}

export async function deleteVapiAssistant(assistantId: string) {
  await vapiFetch(`/assistant/${assistantId}`, { method: 'DELETE' });
}