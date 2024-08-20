'use client';
import { create } from 'zustand';

export type WmToastSeverity = 'error' | 'warning' | 'info' | 'success';

export type WmToastState = {
  message: string;
  severity: WmToastSeverity;
  visibility: boolean;
  duration: number;
  setState: (toastState: WmToastState) => void;
};

const useWmToastState = create<WmToastState>((set) => {
  return {
    message: '',
    severity: 'info',
    visibility: false,
    duration: 6000,
    setState: (toastState: WmToastState) => set(toastState),
  };
});

export default useWmToastState;
