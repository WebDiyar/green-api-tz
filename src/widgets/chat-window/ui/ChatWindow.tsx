import { ArrowLeft, MessagesSquare } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { MessageBubble, useChats } from '@/entities/chat'
import { SendMessageForm } from '@/features/send-message'
import { Button } from '@/shared/ui/button'

export function ChatWindow() {
  const { chats, activeId, openChat } = useChats()
  const chat = chats.find((c) => c.chatId === activeId)
  const bottom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: 'end' })
  }, [chat?.messages.length, activeId])

  if (!chat) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <MessagesSquare className="size-12 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Выберите чат или создайте новый</h2>
        <ol className="max-w-sm list-decimal space-y-1.5 pl-5 text-left text-sm text-muted-foreground">
          <li>Введите номер получателя слева и нажмите «Чат».</li>
          <li>Напишите сообщение и нажмите Enter или кнопку отправки.</li>
          <li>Попросите получателя ответить в WhatsApp. Ответ появится здесь сам, обновлять страницу не нужно.</li>
        </ol>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-2 border-b p-3">
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Назад" onClick={() => openChat(null)}>
          <ArrowLeft />
        </Button>
        <div className="min-w-0">
          <h2 className="truncate font-semibold">{chat.title}</h2>
          <p className="text-xs text-muted-foreground">Ответы появляются автоматически</p>
        </div>
      </header>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-muted/40 p-3">
        {chat.messages.length === 0 && (
          <p className="pt-8 text-center text-sm text-muted-foreground">Напишите первое сообщение внизу и нажмите Enter</p>
        )}
        {chat.messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <div ref={bottom} />
      </div>
      <SendMessageForm chat={chat} />
    </div>
  )
}
