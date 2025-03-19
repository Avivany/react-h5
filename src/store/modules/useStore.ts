import { create } from 'zustand'

interface AppState {
  user: string | null
  setUser: (user: string | null) => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
})) 