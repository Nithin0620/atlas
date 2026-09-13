# 🗺️ Atlas: Master Engineering & Feature Roadmap (`plan.md`)

> **Atlas** is an ultra-low latency, full-duplex conversational voice learning platform built with Next.js 15, Vapi / Daily WebRTC, KaTeX LaTeX math rendering, SuperMemo SM-2 spaced repetition, and MongoDB.

---

## 📑 Roadmap Matrix: 11 Core Pillars & Mobile Support

| # | Feature Module | Core Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **1** | **End-to-End Testing** | Playwright WebRTC mocking, Vitest/Jest SM-2, API & Middleware coverage | ⏳ Planned |
| **2** | **Flashcard Generation** | Automatic takeaway extraction, KaTeX math cards, Anki SM-2 queue | ⏳ Planned |
| **3** | **Voice & Call Msg Persisting** | Real-time transcript logs, timestamps, turn latency, MongoDB sync | ⏳ Planned |
| **4** | **Mentor Calls & Own Voice Playback** | Dual-track stereo recording (AI + User Mic), waveform scrubber | ⏳ Planned |
| **5** | **Test & Quiz Generation** | Dynamic 3-5 question adaptive multiple choice quiz post-call | ⏳ Planned |
| **6** | **UI / UX Overhaul** | Glassmorphism, 3D flip cards, KaTeX formula feeds, visual sound orbs | ⏳ Planned |
| **7** | **Public & Private Mentor Visibility** | Privacy toggle, Community Mentor Marketplace, 1-Click Forking | ⏳ Planned |
| **8** | **Sharing Mentor Call Functionality** | Public share URLs (`/share/[id]`), dynamic OG Twitter/LinkedIn cards | ⏳ Planned |
| **9** | **Export Audio & Video Functionality** | MP3 podcast download + MP4 animated video with KaTeX overlay | ⏳ Planned |
| **10** | **Public & Private User Profiles** | `@handle` profiles, GitHub-style learning heatmaps, badges, streaks | ⏳ Planned |
| **11** | **Historical & Great Thinker Personas** | Gandhi, Feynman, Socrates, Einstein, Turing, Ada Lovelace | ⏳ Planned |
| **📱** | **Mobile-First Responsive UI (All Features)** | PWA, touch gestures, swipeable tabs, Lock-Screen Walk Mode | ⏳ Planned |

---

## 🚀 Deep-Dive Technical Specifications

### 1. 🧪 End-to-End & Integration Testing Suite
* **Playwright E2E (`/e2e`):**
  * Automated testing of full auth, custom mentor creation, WebRTC room connection, real-time KaTeX extraction, and post-call save flow.
  * Fake WebRTC media stream injection (`--use-fake-ui-for-media-stream`, `--use-fake-device-for-media-stream`).
* **Unit & Algorithm Tests (Vitest / Jest):**
  * SuperMemo SM-2 calculation engine (`web/lib/anki.ts`): interval calculation, ease factor bounds ($EF \ge 1.3$).
  * System prompt and Vapi assistant compiler validation (`web/lib/vapi.ts`).
  * Session debriefing and takeaway parsing (`/api/sessions`).

---

### 2. 📇 Intelligent Flashcard Auto-Generation
* **Auto-Extraction Pipeline:**
  * Post-call NLP parser parses dialogue turns on session finish.
  * Automatically generates **Formula Cards** (rendered with KaTeX) and **Concept Cards** (definitions & mental models).
* **SuperMemo SM-2 Integration:**
  * Direct synchronization with the user's Spaced Repetition queue.
  * 3D Card Flip Review Deck with 4-button grading (`Again [1]`, `Hard [2]`, `Good [3]`, `Easy [4]`).

---

### 3. 💬 Voice & Call Message Persistence
* **Turn-by-Turn Structured Logs:**
  * Persists user and assistant messages, raw transcripts, recognized intent, and timestamps in MongoDB (`Session` collection).
  * Stores companion events tied to the exact turn and second in the conversation.
* **Resilience:** Auto-saves transcript fragments incrementally so dropped connections never lose conversation history.

---

### 4. 🎙️ Mentor Calls & Own Voice Recording & Playback
* **Dual-Track Audio Capture:**
  * **User Stream:** Captured in the browser via `MediaRecorder` API (WebM/Opus).
  * **Mentor Stream:** Captured via WebRTC remote audio track or Vapi server-side recording API.
  * Stored in S3 / Cloudflare R2 / Supabase Storage with signed playback URLs.
* **Interactive Waveform Player:**
  * Visual amplitude scrub bar with clickable timestamps. Clicking any dialogue turn immediately jumps audio playback to that specific point in time.

---

### 5. 📝 Post-Call Test & Quiz Generation
* **Adaptive Knowledge Evaluation:**
  * Generates 3-5 multiple-choice questions based specifically on the mentor's explanations and user questions from the call.
  * Includes detailed explanations, citing the specific timestamp where the mentor explained the concept.
* **Progress Scoring:** Scores added to user mastery metrics and learning streak.

---

### 6. 🎨 Complete UI / UX Modernization
* **Visual Polish & Ergonomics:**
  * Refined dark/light glassmorphic surfaces with Tailwind CSS.
  * Fluid multi-frequency audio orb visualizer responding dynamically to assistant and user speech volume.
  * Smooth KaTeX LaTeX math animations and copy-friendly syntax-highlighted code blocks.

---

### 7. 🔒 Public vs. Private Mentors & Community Library
* **Privacy Toggle:**
  * `isPublic: boolean` switch on mentor creation and settings.
* **Community Marketplace:**
  * Explore curated mentors created by other learners.
  * **1-Click Fork:** Clone any public mentor into your private studio with custom tweaks.

---

### 8. 🔗 Sharing Mentor Call Functionality
* **Shareable Call URLs:**
  * Public web view (`/share/[sessionId]`) allowing others to read transcripts, view visual companion cards, and listen to the call audio.
* **Rich Social Previews (Open Graph / Twitter Cards):**
  * Dynamic social image generation showcasing Mentor Avatar, Topic, and highlighted KaTeX formula.

---

### 9. 🎬 Export Suite: Audio (MP3) & Video (MP4 + KaTeX Overlay)
* **Audio Exporter:**
  * Download combined stereo `.mp3` with embedded metadata and chapter timestamps.
* **Video Exporter:**
  * Generates animated MP4 video with:
    * Synchronized subtitle captions.
    * Live waveform visualizations.
    * KaTeX LaTeX formula callouts popping up on the right-hand split screen.

---

### 10. 👤 Public & Private User Profiles & Streaks
* **Profile System:**
  * Public `@handle` pages with bio, subjects mastered, total voice call hours, and public mentors.
  * Privacy toggle to keep stats anonymous if preferred.
* **Gamification & Heatmaps:**
  * GitHub-style daily learning activity heatmap.
  * Achievement badges (*"Socratic Pioneer"*, *"Relativity Scholar"*, *"30-Day Streak"*).

---

### 11. 🏛️ Historical & Great Thinker Personas
* **Pre-Engineered Voice & Character Presets:**
  * **Mahatma Gandhi:** Non-violence (Ahimsa), Truth (Satya), and moral philosophy.
  * **Richard Feynman:** First-principles physics intuition and visual analogies.
  * **Socrates:** Dialectic questioning and philosophical scrutiny.
  * **Albert Einstein:** Thought experiments (*Gedankenexperiment*) and relativity.
  * **Alan Turing:** Logic, computability theory, and automata.
  * **Ada Lovelace:** Poetical science and algorithmic elegance.

---

### 📱 Mobile-First Responsive Design (Across All 11 Modules)
* **Mobile Calling Stage:**
  * Bottom-sheet swipeable views for **Orb Stage** $\leftrightarrow$ **Live Companion KaTeX Feed**.
  * **Lock-Screen Walk Mode:** Integrated with `navigator.mediaSession` for headphone click controls (play/pause/skip) while walking with the phone in your pocket.
* **Touch Interactions & Haptics:**
  * Haptic vibration feedback on interruption, mic mute, and quiz answers.
  * Swipe gestures for flashcard reviews (`Swipe Left: Hard`, `Swipe Right: Easy`).
* **Progressive Web App (PWA):**
  * Full offline caching for reviewing flashcards and studying past transcripts on mobile devices.

---
*Roadmap finalized for Atlas.*
