import { create } from 'zustand';

const useUIStore = create((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  isHeaderSolid: false,
  setHeaderSolid: (value) => set({ isHeaderSolid: value })
}));

export default useUIStore;

