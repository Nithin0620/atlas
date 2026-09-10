# Atlas 🪐

> Cross-platform, voice-powered AI learning platform for **Web**, **iOS**, and **Android**.

Atlas connects learners with personalized, real-time AI mentors tailored to any subject, topic, or learning style. It pairs full-duplex voice conversations with live visual synchronization, automated post-session debriefs, and spaced-repetition flashcards.

---

## 🚀 Features

- **🎙️ Real-Time Voice Conversations:** Sub-second voice latency powered by Vapi AI.
- **📱 True Cross-Platform:** High-performance Next.js Web dashboard and native iOS/Android Expo apps.
- **🧠 Personalized AI Mentors:** Configure persona, subject, teaching method, and voice.
- **📊 Live Visual Companion:** Real-time formula, code, and note streaming alongside speech.
- **📝 Automatic Debriefs & Flashcards:** Post-session summaries and spaced repetition cards.
- **🔒 Secure Authentication:** Unified auth across web and mobile with Clerk.
- **💳 Cross-Platform Subscriptions:** Stripe (Web) + Apple/Google In-App Purchases (via RevenueCat).

---

## 🗺️ Roadmap & Architecture

See [`plan.md`](./plan.md) for the complete architecture and step-by-step implementation plan.

---

## 🛠️ Tech Stack

- **Monorepo:** [Turborepo](https://turbo.build/)
- **Web App:** [Next.js](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **Mobile App:** [Expo](https://expo.dev/) (React Native)
- **Voice Engine:** [Vapi AI](https://vapi.ai/)
- **Database & Vector Memory:** [Supabase PostgreSQL](https://supabase.com/)
- **Auth:** [Clerk](https://clerk.com/)
