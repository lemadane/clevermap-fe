'use client';
import { create } from 'zustand';
import { Account } from '@/common/types';

type AccountState = {
  selected: Account | null;
  setSelected: (account: Account | null) => void;

  list: Account[];
  setList: (list: Account[]) => void;

  listChanged: boolean;
  toggleListChanged: () => void;
};

const useAccountState = create<AccountState>((set) => {
  return {
    selected: null,
    setSelected: (selected) => set({ selected }),

    list: [],
    setList: (list) => set({ list }),

    listChanged: false,
    toggleListChanged: () => set((state) => ({ listChanged: !state.listChanged })),
  };
});

export default useAccountState;
