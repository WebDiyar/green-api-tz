import { useSession } from '@/entities/session'
import { ChatPage } from '@/pages/chat'
import { LoginPage } from '@/pages/login'

export function App() {
  const authorized = useSession((s) => !!s.creds)
  return authorized ? <ChatPage /> : <LoginPage />
}
