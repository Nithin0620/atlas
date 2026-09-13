import { create } from 'zustand';

export interface VisualCompanionItem {
  id: string;
  type: 'code' | 'formula' | 'bullet' | 'text' | 'concept';
  content: string;
  language?: string;
  timestamp: number;
}

export type CallStatus = 'idle' | 'connecting' | 'connected' | 'speaking' | 'listening' | 'error';

interface VoiceStoreState {
  status: CallStatus;
  isMuted: boolean;
  activeMentorId: string | null;
  companionFeed: VisualCompanionItem[];
  volumeLevel: number;
  setStatus: (status: CallStatus) => void;
  setMuted: (isMuted: boolean) => void;
  setActiveMentorId: (id: string | null) => void;
  addCompanionItem: (item: VisualCompanionItem) => void;
  clearCompanionFeed: () => void;
  setVolumeLevel: (level: number) => void;
  resetCall: () => void;
}

export const useVoiceStore = create<VoiceStoreState>((set) => ({
  status: 'idle',
  isMuted: false,
  activeMentorId: null,
  companionFeed: [],
  volumeLevel: 0,
  setStatus: (status) => set({ status }),
  setMuted: (isMuted) => set({ isMuted }),
  setActiveMentorId: (activeMentorId) => set({ activeMentorId }),
  addCompanionItem: (item) =>
    set((state) => ({ companionFeed: [item, ...state.companionFeed] })),
  clearCompanionFeed: () => set({ companionFeed: [] }),
  setVolumeLevel: (volumeLevel) => set({ volumeLevel }),
  resetCall: () =>
    set({
      status: 'idle',
      isMuted: false,
      activeMentorId: null,
      companionFeed: [],
      volumeLevel: 0,
    }),
}));
