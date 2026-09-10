import { create } from 'zustand';

export type MobileCallStatus = 'idle' | 'connecting' | 'connected' | 'speaking' | 'listening' | 'error';

interface MobileVoiceStoreState {
  status: MobileCallStatus;
  isMuted: boolean;
  activeMentorId: string | null;
  volumeLevel: number;
  setStatus: (status: MobileCallStatus) => void;
  setMuted: (isMuted: boolean) => void;
  setActiveMentorId: (id: string | null) => void;
  setVolumeLevel: (level: number) => void;
  resetCall: () => void;
}

export const useVoiceStore = create<MobileVoiceStoreState>((set) => ({
  status: 'idle',
  isMuted: false,
  activeMentorId: null,
  volumeLevel: 0,
  setStatus: (status) => set({ status }),
  setMuted: (isMuted) => set({ isMuted }),
  setActiveMentorId: (activeMentorId) => set({ activeMentorId }),
  setVolumeLevel: (volumeLevel) => set({ volumeLevel }),
  resetCall: () =>
    set({
      status: 'idle',
      isMuted: false,
      activeMentorId: null,
      volumeLevel: 0,
    }),
}));
