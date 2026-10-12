import { MessageSquarePlus } from 'lucide-react'
import { ChatListItem, useChats } from '@/entities/chat'
import { useSession } from '@/entities/session'
import { LogoutButton } from '@/features/auth'
import { CreateChatForm } from '@/features/create-chat'
import { ScrollArea } from '@/shared/ui/scroll-area'

export function ChatList() {
  const { chats, activeId, openChat } = useChats()
  const idInstance = useSession((s) => s.creds?.idInstance)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-3">
        <span className="font-semibold">WhatsApp · {idInstance}</span>
        <LogoutButton />
      </div>
      <CreateChatForm />
      <ScrollArea className="min-h-0 flex-1">
        {chats.length === 0 && (
          <div className="flex flex-col items-center gap-2 p-8 text-center text-sm text-muted-foreground">
            <MessageSquarePlus className="size-8" />
            <p>Чатов пока нет. Введите номер получателя в поле выше и нажмите «Чат».</p>
          </div>
        )}
        {chats.map((c) => (
          <ChatListItem key={c.chatId} chat={c} active={c.chatId === activeId} onClick={() => openChat(c.chatId)} />
        ))}
      </ScrollArea>
    </div>
  )
}
