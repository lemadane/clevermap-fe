'use client';
import { create } from 'zustand';
import { LoggedUser } from '../types';

type LoginState = {
  user: LoggedUser | null;
  setUser: (value: LoggedUser | null) => void;
  restoreUser: () => void;
  loggedIn: boolean;
  logout: () => void;
};

const useLoginState = create<LoginState>((set, get) => {
  return {
    user: null,
    setUser: (value) => {
      set((state) => ({ ...state, user: value, loggedIn: !!value }));
      if (value) {
        localStorage.setItem('wm-logged-user', JSON.stringify(value));
      } else {
        localStorage.removeItem('wm-logged-user');
      }
    },
    loggedIn: false,
    logout: () => {
      set((state) => ({ ...state, user: null, loggedIn: false }));
      localStorage.removeItem('wm-logged-user');
    },
    restoreUser: () => {
      const user = get().user;
      if (!user) {
        const restored = localStorage.getItem('wm-logged-user');
        if (restored) {
          const parsed = JSON.parse(restored);
          set((state) => ({
            ...state,
            user: parsed,
            loggedIn: !!parsed,
          }));
        }
      }
    },
  };
});

export default useLoginState;
