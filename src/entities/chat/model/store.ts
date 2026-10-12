import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Chat, Message } from './types'

interface ChatState {
  chats: Chat[]
  activeId: string | null
  openChat: (id: string | null) => void
  ensureChat: (chatId: string, title: string) => void
  addMessage: (chatId: string, title: string, m: Message) => void
  clear: () => void
}

export const useChats = create<ChatState>()(
  persist(
    (set) => ({
      chats: [],
      activeId: null,
      openChat: (activeId) => set({ activeId }),
      ensureChat: (chatId, title) =>
        set((s) =>
          s.chats.some((c) => c.chatId === chatId)
            ? { activeId: chatId }
            : { chats: [{ chatId, title, messages: [] }, ...s.chats], activeId: chatId },
        ),
      addMessage: (chatId, title, m) =>
        set((s) => {
          const chat = s.chats.find((c) => c.chatId === chatId) ?? { chatId, title, messages: [] }
          if (chat.messages.some((x) => x.id === m.id)) return s
          const updated = { ...chat, messages: [...chat.messages, m] }
          return { chats: [updated, ...s.chats.filter((c) => c.chatId !== chatId)] }
        }),
      clear: () => set({ chats: [], activeId: null }),
    }),
    { name: 'wa-chat:chats' },
  ),
)
