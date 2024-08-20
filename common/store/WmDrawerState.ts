'use client';
import { create } from 'zustand';


const DRAWER_WIDTH = 200

type WmDrawerState = {
  width: number;
  opened: boolean;
  toggle: () => void;
};

const useWmDrawerState = create<WmDrawerState>((set) => {
  return {
    width: DRAWER_WIDTH,
    opened: false,
    toggle: () => set((state) => ({ opened: !state.opened })),
  };
});

export default useWmDrawerState;
