import { cn } from '@/shared/lib/utils'
import type { Message } from '../model/types'

const time = (ts: number) => new Date(ts).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })

export function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={cn('flex', message.out ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-3.5 py-2 break-words whitespace-pre-wrap sm:max-w-[65%]',
          message.out ? 'rounded-br-md bg-primary text-white' : 'rounded-bl-md bg-card',
        )}
      >
        {message.text}
        <span className="ml-2 inline-block translate-y-0.5 text-[11px] opacity-60">{time(message.ts)}</span>
      </div>
    </div>
  )
}
