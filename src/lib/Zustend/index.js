import { create } from "zustand";

const useAppStore = create((set) => ({
  filter: "",
  invoices: [],
  items: [],
  editedData: null,

  setInvoices: (updater) =>
    set((state) => ({
      invoices:
        typeof updater === "function"
          ? updater(state.invoices)
          : [...state.invoices, ...updater],
    })),

  setFilter: (value) => set(() => ({ filter: value })),
  setItems: (items) => set(() => ({ items })),
  setEditedData: (editedData) => set(() => ({ editedData })),

  addNewInvoice: (invoice) =>
    set((state) => ({ invoices: [invoice, ...state.invoices] })),

  updateInvoice: (updatedInvoice) =>
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === updatedInvoice.id ? updatedInvoice : inv
      ),
    })),

  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((inv) => inv.id !== id),
    })),
}));

export default useAppStore;
