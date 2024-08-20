'use client';
import { create } from 'zustand';
import { Lookup, LookupReference } from '@/common/types';

type LookupState = {
  reference: LookupReference | null;
  setReference: (reference: LookupReference | null) => void;

  lookup: Lookup | null;
  setLookup: (lookup: Lookup | null) => void;

  referenceListChanged: boolean;
  setReferenceListChanged: (referenceListChanged: boolean) => void;

  lookupListChanged: boolean;
  setLookupListChanged: (lookupListChanged: boolean) => void;
};

const useLookupState = create<LookupState>((set) => {
  return {
    reference: null,
    setReference: (reference) => set({ reference }),

    lookup: null,
    setLookup: (lookup) => set({ lookup }),

    referenceListChanged: true,
    setReferenceListChanged: (referenceListChanged) =>
      set({ referenceListChanged }),

    lookupListChanged: true,
    setLookupListChanged: (lookupListChanged) => set({ lookupListChanged }),
  };
});

export default useLookupState;
