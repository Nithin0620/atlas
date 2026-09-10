import { create } from 'zustand';
import { IMentor } from '@atlas/types';

interface MentorStoreState {
  mentors: IMentor[];
  selectedMentor: IMentor | null;
  selectedCategory: string;
  searchQuery: string;
  isLoading: boolean;
  setMentors: (mentors: IMentor[]) => void;
  setSelectedMentor: (mentor: IMentor | null) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useMentorStore = create<MentorStoreState>((set) => ({
  mentors: [],
  selectedMentor: null,
  selectedCategory: 'all',
  searchQuery: '',
  isLoading: false,
  setMentors: (mentors) => set({ mentors }),
  setSelectedMentor: (selectedMentor) => set({ selectedMentor }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
