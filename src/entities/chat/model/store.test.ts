import { beforeEach, describe, expect, it } from 'vitest'
import { useChats } from './store'

const msg = (id: string) => ({ id, text: id, out: true, ts: 1 })

describe('useChats', () => {
  beforeEach(() => useChats.getState().clear())

  it('ensureChat creates a chat once and activates it', () => {
    const { ensureChat } = useChats.getState()
    ensureChat('a@c.us', '+1')
    ensureChat('a@c.us', '+1')
    expect(useChats.getState().chats).toHaveLength(1)
    expect(useChats.getState().activeId).toBe('a@c.us')
  })

  it('moves the chat with a new message to the top', () => {
    const { ensureChat, addMessage } = useChats.getState()
    ensureChat('a@c.us', 'A')
    ensureChat('b@c.us', 'B')
    addMessage('a@c.us', 'A', msg('1'))
    expect(useChats.getState().chats.map((c) => c.chatId)).toEqual(['a@c.us', 'b@c.us'])
  })

  it('creates an unknown chat on incoming message', () => {
    useChats.getState().addMessage('z@c.us', 'Z', msg('1'))
    expect(useChats.getState().chats[0].title).toBe('Z')
  })
})
