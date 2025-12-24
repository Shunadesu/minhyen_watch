import { create } from 'zustand';

const useQuickOrderStore = create((set) => ({
  isOpen: false,
  productName: '',
  open: (productName = '') => set({ isOpen: true, productName }),
  close: () => set({ isOpen: false, productName: '' })
}));

export default useQuickOrderStore;

