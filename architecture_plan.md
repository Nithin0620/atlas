# Atlas: Contextual Voice AI & LiveKit Architecture Plan

## 1. Executive Summary & Vision
Atlas is an intelligent, full-duplex conversational voice learning platform designed for both Web and Mobile. It supports **Walk Mode** (hands-free, background audio-first tutoring with instant sub-150ms barge-in interruption) and multi-mentor persona customization with persistent MongoDB Atlas storage.

---

## 2. Core Concepts

### 2.1 Walk Mode (Contextual Voice Tutoring)
- **Hands-Free Audio**: Optimized for headphones, lock-screen background playback, and earphone controls.
- **Natural Barge-In Interruption**: Voice Activity Detection (Silero VAD) instantly stops the AI’s audio playback when the learner speaks (e.g., *"Wait, why do we need a load balancer?"*).
- **Adaptive Audio Pacing**: Socratic questions, intuitive mental models, and verbal confirmation check-ins.
- **Background Data Sync**: Transcripts and concept extractions stream silently over WebRTC data channels so the post-session debrief and flashcards are ready on return.

### 2.2 Multi-Mentor Management & Custom Settings
- **Unlimited Custom AI Mentors**: Create, edit, configure, and delete mentor personas.
- **Configurable Settings**:
  - Persona Name & Subject Domain
  - Teaching Style (Socratic, Direct, Storyteller, Coach)
  - Difficulty Level (Beginner, Intermediate, Advanced)
  - Voice Profile ID & Accent
  - Custom System Prompts, Syllabus Guidelines, and Course Context
- **Full Database Persistence**: Saved in MongoDB Atlas (`mentors` collection), immediately queryable and re-accessible across sessions.

---

## 3. High-Level Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Atlas Client (Web / Mobile)                     │
│  - LiveKit Client SDK (@livekit/components-react, livekit-client)       │
│  - Microphone WebRTC audio track + LiveKit DataChannel listener        │
│  - Walk Mode UI: Waveform, VU Meter, Interruption indicator            │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ WebRTC Room Connection
┌──────────────────────────────────▼─────────────────────────────────────┐
│                       LiveKit Cloud / Server Engine                    │
│  - Ultra-low latency WebRTC audio bridging                             │
│  - Data packet broadcast (transcripts, visual sync, status)           │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ Agent Worker / Dispatch
┌──────────────────────────────────▼─────────────────────────────────────┐
│                    Atlas LiveKit Voice AI Agent Pipeline               │
│  1. VAD: Silero VAD (Sub-50ms voice detection & interruption)          │
│  2. STT: Deepgram Nova-2 (Streaming real-time speech-to-text)          │
│  3. LLM: Gemini 2.0 Flash / OpenAI (Context-aware tutoring prompt)     │
│  4. TTS: Cartesia / ElevenLabs (Ultra-fast streaming conversational)   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ Post-Call Processing
┌──────────────────────────────────▼─────────────────────────────────────┐
│                       MongoDB Atlas Persistent Store                   │
│  - Users, Mentors, Sessions, Transcripts, Spaced-Repetition Decks      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Phased Implementation Roadmap

### Phase 1: LiveKit WebRTC Token & Room Infrastructure
- [ ] Install LiveKit Server SDK (`livekit-server-sdk`) in Next.js web.
- [ ] Configure environment variables: `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `LIVEKIT_URL`.
- [ ] Build `/api/voice/livekit-token` route handler:
  - Validates authenticated user.
  - Grants room join permissions.
  - Embeds participant metadata (`mentorId`, `mode: "walk" | "visual"`, `userId`).

### Phase 2: LiveKit Voice Agent Pipeline & Multi-Mentor Routing
- [ ] Build the LiveKit Python/Node.js Agent worker with:
  - **STT**: Deepgram Nova-2.
  - **LLM**: Contextual prompt loader pulling mentor-specific system prompts from MongoDB Atlas.
  - **TTS**: Cartesia ultra-low latency voice streaming.
  - **VAD**: Silero VAD for sub-150ms barge-in interruption.
- [ ] Configure Walk Mode prompt modifiers (audio-first descriptions, verbal checkpoints).

### Phase 3: Web & Mobile Call Room (`/call/[mentorId]`)
- [ ] Connect `@livekit/components-react` and `livekit-client`.
- [ ] Implement **Walk Mode UI**:
  - LiveKit Audio Track playback & live VU meter equalizer.
  - Real-time interruption visual indicator (*"Listening to you..."*).
  - Speaker, Mute, Walk Mode toggle, and End Call controls.
- [ ] Live Data Channel listener for companion code/LaTeX sync when screen is active.

### Phase 4: Mentor Studio & Settings Suite
- [ ] CRUD API for Mentors (`GET`, `POST`, `PUT /api/mentors/[id]`, `DELETE /api/mentors/[id]`).
- [ ] Mentor Settings Drawer / Modal:
  - Edit system prompt, syllabus notes, teaching style, and voice profile.
  - Re-accessible across dashboard and voice call launcher.

### Phase 5: Post-Session Data Sync & Spaced Repetition
- [ ] Auto-generate session debrief on call termination.
- [ ] Extract key takeaways and populate user's `Flashcard` deck for daily Anki SM-2 review.
- [ ] Increment user's `totalCallMinutes` and `learningStreak` in MongoDB Atlas.
