import { create } from 'zustand';

interface UIState {
    isContactOpen: boolean;
    contactInquiry: string;
    openContact: (inquiry?: string) => void;
    closeContact: () => void;
    toggleContact: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isContactOpen: false,
    contactInquiry: '',
    openContact: (inquiry?: string) => set({ isContactOpen: true, contactInquiry: inquiry || '' }),
    closeContact: () => set({ isContactOpen: false, contactInquiry: '' }),
    toggleContact: () => set((state) => ({ isContactOpen: !state.isContactOpen, contactInquiry: '' })),
}));
