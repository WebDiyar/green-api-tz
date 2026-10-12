import { useChats } from '@/entities/chat'
import { useReceiveMessages } from '@/features/receive-messages'
import { cn } from '@/shared/lib/utils'
import { ChatList } from '@/widgets/chat-list'
import { ChatWindow } from '@/widgets/chat-window'

export function ChatPage() {
  const activeId = useChats((s) => s.activeId)
  useReceiveMessages()

  return (
    <div className="mx-auto flex h-dvh max-w-6xl border-x bg-background">
      <aside className={cn('w-full border-r md:block md:w-80 md:shrink-0', activeId ? 'hidden' : 'block')}>
        <ChatList />
      </aside>
      <main className={cn('min-w-0 flex-1 md:block', activeId ? 'block' : 'hidden')}>
        <ChatWindow />
      </main>
    </div>
  )
}
