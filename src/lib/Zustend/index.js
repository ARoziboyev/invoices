import { create } from "zustand";

const useAppStore = create((set) => ({
  filter: "",
  setFilter: (value) => set({ filter: value }),
}));

export default useAppStore;
