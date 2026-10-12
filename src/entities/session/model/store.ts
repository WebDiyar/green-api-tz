import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Credentials } from '@/shared/api'

interface SessionState {
  creds: Credentials | null
  setCreds: (c: Credentials) => void
  clear: () => void
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      creds: null,
      setCreds: (creds) => set({ creds }),
      clear: () => set({ creds: null }),
    }),
    { name: 'wa-chat:session' },
  ),
)
