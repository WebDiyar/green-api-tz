import { beforeEach, describe, expect, it } from 'vitest'
import { useChats } from '@/entities/chat'
import type { Notification } from '@/shared/api'
import { handleNotification } from './handleNotification'

const incoming = (over: Partial<Notification['body']> = {}): Notification => ({
  receiptId: 1,
  body: {
    typeWebhook: 'incomingMessageReceived',
    timestamp: 1700000000,
    idMessage: 'm1',
    senderData: { chatId: '77001234567@c.us', chatName: 'Иван' },
    messageData: { typeMessage: 'textMessage', textMessageData: { textMessage: 'Привет' } },
    ...over,
  },
})

describe('handleNotification', () => {
  beforeEach(() => useChats.getState().clear())

  it('adds an incoming text message to its chat', () => {
    expect(handleNotification(incoming())).toBe(true)
    const [chat] = useChats.getState().chats
    expect(chat.chatId).toBe('77001234567@c.us')
    expect(chat.title).toBe('Иван')
    expect(chat.messages).toEqual([{ id: 'm1', text: 'Привет', out: false, ts: 1700000000_000 }])
  })

  it('ignores duplicates by idMessage', () => {
    handleNotification(incoming())
    handleNotification(incoming())
    expect(useChats.getState().chats[0].messages).toHaveLength(1)
  })

  it('ignores non-incoming and non-text notifications', () => {
    expect(handleNotification(incoming({ typeWebhook: 'outgoingMessageStatus' }))).toBe(false)
    expect(handleNotification(incoming({ messageData: { typeMessage: 'imageMessage' } }))).toBe(false)
    expect(useChats.getState().chats).toHaveLength(0)
  })
})
