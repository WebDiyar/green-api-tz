import { useChats } from '@/entities/chat'
import type { Notification } from '@/shared/api'

export function handleNotification({ body }: Notification) {
  const text = body.messageData?.textMessageData?.textMessage
  if (body.typeWebhook !== 'incomingMessageReceived' || !text || !body.senderData) return false

  const { chatId, chatName, senderName } = body.senderData
  useChats.getState().addMessage(chatId, chatName || senderName || chatId, {
    id: body.idMessage,
    text,
    out: false,
    ts: body.timestamp * 1000,
  })
  return true
}
