'use client';
import { create } from 'zustand';
import { Province, City, Locality } from '@/common/types';

type ProvinceState = {
  province: Province | null;
  setProvince: (province: Province | null) => void;

  city: City | null;
  setCity: (city: City | null) => void;

  locality: Locality | null;
  setLocality: (locality: Locality | null) => void;

  provinceListChanged: boolean;
  setProvinceListChanged: (provinceListChanged: boolean) => void;

  cityListChanged: boolean;
  setCityListChanged: (cityListChanged: boolean) => void;

  localityListChanged: boolean;
  setLocalityListChanged: (localityListChanged: boolean) => void;
};

const useProvinceState = create<ProvinceState>((set) => {
  return {
    province: null,
    setProvince: (province) => set({ province }),

    city: null,
    setCity: (city) => set({ city }),

    locality: null,
    setLocality: (locality) => set({ locality }),

    provinceListChanged: true,
    setProvinceListChanged: (provinceListChanged) =>
      set({ provinceListChanged }),

    cityListChanged: true,
    setCityListChanged: (cityListChanged) => set({ cityListChanged }),

    localityListChanged: true,
    setLocalityListChanged: (localityListChanged) =>
      set({ localityListChanged }),
  };
});

export default useProvinceState;
