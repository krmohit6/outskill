import { create } from 'zustand'

interface AppState {
  demoMode: boolean
  toggleDemoMode: () => void
}

export const useAppStore = create<AppState>((set) => ({
  demoMode: true,
  toggleDemoMode: () => set((state) => ({ demoMode: !state.demoMode })),
}))
