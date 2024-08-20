'use client';
import { create } from 'zustand';
import { AdminEntity } from '@/common/types';

type WmEntityState = {
  entity: AdminEntity | null;
  setEntity: (entity: AdminEntity | null) => void;

  listChanged: boolean;
  setListChanged: (listChanged: boolean) => void;
};

const useWmEntityState = create<WmEntityState>((set) => {
  return {
    entity: null,
    setEntity: (entity) => set({ entity }),

    listChanged: true,
    setListChanged: (listChanged) => set({ listChanged }),
  };
});

export default useWmEntityState;
