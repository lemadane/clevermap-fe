'use client';
import { create } from 'zustand';

type PageControl = {
  offset: number;
  setOffset: (offset: number) => void;
  size: number;
  setSize: (size: number) => void;
  sizeOptions: number[];
};

const usePageControl = create<PageControl>((set) => ({
  offset: 1,
  setOffset: (offset) => set({ offset }),
  size: 10,
  setSize: (size) => set({ size }),
  sizeOptions: [5, 10, 20, 50, 100],
}));

export default usePageControl;
