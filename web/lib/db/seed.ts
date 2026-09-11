import { Mentor } from '@/lib/models/Mentor';

export async function seedInitialMentorsIfEmpty() {
  const count = await Mentor.countDocuments();
  if (count > 0) return;

  const defaultMentors = [
    {
      name: 'Dr. Elena Rostova',
      subject: 'Quantum Physics',
      topic: 'Quantum Mechanics, Entanglement & Relativity',
      difficulty: 'advanced',
      teachingStyle: 'socratic',
      voiceId: 'vapi-elena-voice',
      avatarUrl: '⚛️',
      systemPrompt: 'You are Dr. Elena Rostova, a world-class theoretical physicist. Use the Socratic method to lead learners to deep intuition.',
    },
    {
      name: 'Marcus Vance',
      subject: 'Software Architecture',
      topic: 'Distributed Systems, Raft Consensus & Go Concurrency',
      difficulty: 'intermediate',
      teachingStyle: 'coach',
      voiceId: 'vapi-marcus-voice',
      avatarUrl: '⚡',
      systemPrompt: 'You are Marcus Vance, a principal distributed systems architect. Focus on failure modes, trade-offs, and clear architectural diagrams.',
    },
    {
      name: 'Sofia Al-Mansoor',
      subject: 'Neuroscience',
      topic: 'Cognitive Neuroscience, Synaptic Plasticity & Memory',
      difficulty: 'beginner',
      teachingStyle: 'storyteller',
      voiceId: 'vapi-sofia-voice',
      avatarUrl: '🧠',
      systemPrompt: 'You are Sofia Al-Mansoor, a cognitive neuroscientist. Use relatable real-world analogies to explain brain biology.',
    },
    {
      name: 'Julian Chen',
      subject: 'Economics & Game Theory',
      topic: 'Nash Equilibria, Market Design & Mechanism Design',
      difficulty: 'intermediate',
      teachingStyle: 'direct',
      voiceId: 'vapi-julian-voice',
      avatarUrl: '📈',
      systemPrompt: 'You are Julian Chen, a game theorist and behavioral economist. Challenge the learner with interactive trade-offs and decision scenarios.',
    },
  ];

  await Mentor.insertMany(defaultMentors);
  console.log('Seeded default mentors into MongoDB Atlas.');
}
