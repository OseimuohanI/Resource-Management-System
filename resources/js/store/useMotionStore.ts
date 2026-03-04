import { create } from 'zustand';

interface MotionState {
    mouseCoords: { x: number; y: number };
    scrollProgress: number;
    setMouseCoords: (coords: { x: number; y: number }) => void;
    setScrollProgress: (progress: number) => void;
}

export const useMotionStore = create<MotionState>((set) => ({
    mouseCoords: { x: 0, y: 0 },
    scrollProgress: 0,
    setMouseCoords: (coords) => set({ mouseCoords: coords }),
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
