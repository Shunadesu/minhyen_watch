import { create } from 'zustand';

const useAuthModalStore = create((set) => ({
  isOpen: false,
  mode: 'login', // 'login' | 'register'
  openAuthModal: (mode = 'login') => set({ isOpen: true, mode }),
  closeAuthModal: () => set({ isOpen: false }),
}));

export default useAuthModalStore;

