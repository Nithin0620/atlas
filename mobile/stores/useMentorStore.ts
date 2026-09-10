import { create } from 'zustand';
import { IMentor } from '@atlas/types';

interface MobileMentorStoreState {
  mentors: IMentor[];
  selectedMentor: IMentor | null;
  selectedSubject: string;
  setMentors: (mentors: IMentor[]) => void;
  setSelectedMentor: (mentor: IMentor | null) => void;
  setSelectedSubject: (subject: string) => void;
}

export const useMentorStore = create<MobileMentorStoreState>((set) => ({
  mentors: [],
  selectedMentor: null,
  selectedSubject: 'all',
  setMentors: (mentors) => set({ mentors }),
  setSelectedMentor: (selectedMentor) => set({ selectedMentor }),
  setSelectedSubject: (selectedSubject) => set({ selectedSubject }),
}));
