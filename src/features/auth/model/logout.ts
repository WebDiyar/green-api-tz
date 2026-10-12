import { useChats } from '@/entities/chat'
import { useSession } from '@/entities/session'

export const logout = () => {
  useSession.getState().clear()
  useChats.getState().clear()
}
