export interface Message {
  id: string
  text: string
  out: boolean
  ts: number
}

export interface Chat {
  chatId: string
  title: string
  messages: Message[]
}
