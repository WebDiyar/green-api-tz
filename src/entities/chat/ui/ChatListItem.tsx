import { cn } from '@/shared/lib/utils'
import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import type { Chat } from '../model/types'

interface Props {
  chat: Chat
  active: boolean
  onClick: () => void
}

export function ChatListItem({ chat, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted', active && 'bg-primary/10 hover:bg-primary/10')}
    >
      <Avatar className="size-12">
        <AvatarFallback className="bg-linear-to-br from-sky-400 to-violet-500 text-base font-medium text-white">{chat.title.replace('+', '').slice(0, 2)}</AvatarFallback>
      </Avatar>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">{chat.title}</span>
        <span className="block truncate text-sm text-muted-foreground">
          {chat.messages.at(-1)?.text ?? 'Нет сообщений'}
        </span>
      </span>
    </button>
  )
}
