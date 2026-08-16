import { create } from 'zustand';

interface TransitionState {
    isTransitioning: boolean;
    pendingRoute: string | null;
    startTransition: (route: string) => void;
    endTransition: () => void;
}

export const useTransitionStore = create<TransitionState>((set) => ({
    isTransitioning: false,
    pendingRoute: null,
    startTransition: (route) => set({ isTransitioning: true, pendingRoute: route }),
    endTransition: () => set({ isTransitioning: false, pendingRoute: null })
}));
