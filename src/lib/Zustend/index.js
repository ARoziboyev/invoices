import { create } from "zustand";

const useAppStore = create((set) => ({
  filter: "",
  invoices: [],
  items: [],
  setInvoices: (invoices) =>
    set((state) => ({ invoices: [...state.invoices, ...invoices] })),
  setFilter: (value) => set(() => ({ filter: value })),
  setItems: (items) => set(() => ({ items })),
  setEditedData: (editedData) => set(() => ({ editedData })),
}));

export default useAppStore;
