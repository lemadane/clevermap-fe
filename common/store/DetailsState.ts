'use client';
import { create } from 'zustand';

export interface DetailsState {
  itemId: string | null;
  setItemId: (id: string | null) => void;
  dialogOpened: boolean;
  openDialog: (opened: boolean) => void;
  isNew: false;
  setNew: (isNew: boolean) => void;
  changed: boolean;
  toggleChanged: () => void;
}

export interface IdentificationsState extends DetailsState {}
export interface ContactDetailsState extends DetailsState {}
export interface AddressListState extends DetailsState {}

export const InitialDetailsState = (set: any) =>
  ({
    itemId: null,
    setItemId: (itemId) => set({ itemId }),
    dialogOpened: false,
    openDialog: (dialogOpened) => set({ dialogOpened }),
    isNew: false,
    setNew: (isNew) => set({ isNew }),
    changed: false,
    toggleChanged: () =>
      set((state: DetailsState) => ({ changed: !state.changed })),
  } as DetailsState);

export const useIdentificationsState =
  create<IdentificationsState>(InitialDetailsState);

export const useContactDetailsState =
  create<ContactDetailsState>(InitialDetailsState);

export const useAddressListState =
  create<AddressListState>(InitialDetailsState);