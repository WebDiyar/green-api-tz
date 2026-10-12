import { useMutation } from '@tanstack/react-query'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useChats, type Chat } from '@/entities/chat'
import { useSession } from '@/entities/session'
import { errorMessage, sendMessage } from '@/shared/api'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

export function SendMessageForm({ chat }: { chat: Chat }) {
  const creds = useSession((s) => s.creds)!
  const addMessage = useChats((s) => s.addMessage)
  const [text, setText] = useState('')

  const send = useMutation({
    mutationFn: (message: string) => sendMessage(creds, chat.chatId, message),
    onSuccess: ({ idMessage }, message) => {
      addMessage(chat.chatId, chat.title, { id: idMessage, text: message, out: true, ts: Date.now() })
      setText('')
    },
    onError: (e) => toast.error(errorMessage(e)),
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = text.trim()
    if (value && !send.isPending) send.mutate(value)
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2 border-t px-4 py-3">
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Написать сообщение…" aria-label="Сообщение" maxLength={4000} autoFocus className="h-11 rounded-full border-0 bg-muted px-4" />
      <Button type="submit" size="icon" className="size-11 rounded-full" disabled={!text.trim() || send.isPending} aria-label="Отправить">
        <Send />
      </Button>
    </form>
  )
}
