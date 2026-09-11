const VAPI_BASE = 'https://api.vapi.ai';
const VAPI_API_KEY = process.env.VAPI_API_KEY;

interface MentorAssistantConfig {
  name: string;
  subject: string;
  topic: string;
  difficulty: string;
  teachingStyle: string;
  systemPrompt?: string;
}

async function vapiFetch(path: string, init?: RequestInit) {
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

export function buildVapiAssistantPayload(m: MentorAssistantConfig) {
  const systemPrompt =
    m.systemPrompt ||
    `You are ${m.name}, an expert tutor for ${m.subject}. Your focus: ${m.topic}.`;

  return {
    name: m.name,
    transcriber: { provider: 'vapi' },
    model: {
      provider: 'groq',
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content: `${systemPrompt}\n\nTeaching style: ${m.teachingStyle}. Difficulty: ${m.difficulty}. Keep responses conversational and audio-first.`,
        },
      ],
    },
    voice: { provider: 'vapi', voiceId: 'Clara' },
    firstMessage: `Hi, I'm ${m.name}. Ready to explore ${m.topic}?`,
    firstMessageMode: 'assistant-speaks-first',
    clientMessages: ['conversation-update', 'transcript', 'model-output', 'speech-update', 'status-update', 'user-interrupted'],
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