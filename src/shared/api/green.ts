import axios, { isAxiosError } from 'axios'

export interface Credentials {
  idInstance: string
  apiTokenInstance: string
  apiUrl: string
}

export interface Notification {
  receiptId: number
  body: {
    typeWebhook: string
    timestamp: number
    idMessage: string
    senderData?: { chatId: string; chatName?: string; senderName?: string }
    messageData?: { typeMessage: string; textMessageData?: { textMessage: string } }
  }
}

export const defaultApiUrl = (id: string) =>
  id.length >= 10 ? `https://${id.slice(0, 4)}.api.green-api.com` : 'https://api.green-api.com'

const client = ({ apiUrl, idInstance }: Credentials) =>
  axios.create({ baseURL: `${apiUrl.replace(/\/$/, '')}/waInstance${idInstance}` })

export const getStateInstance = async (c: Credentials) =>
  (await client(c).get<{ stateInstance: string }>(`/getStateInstance/${c.apiTokenInstance}`)).data

export const checkWhatsapp = async (c: Credentials, chatId: string) =>
  (await client(c).post<{ existsWhatsapp: boolean }>(`/checkWhatsapp/${c.apiTokenInstance}`, { chatId })).data

export const sendMessage = async (c: Credentials, chatId: string, message: string) =>
  (
    await client(c).post<{ idMessage: string }>(`/sendMessage/${c.apiTokenInstance}`, {
      chatId,
      message,
    })
  ).data

// empty queue -> empty body -> null
export const receiveNotification = async (c: Credentials, signal: AbortSignal) =>
  (
    await client(c).get<Notification | null>(`/receiveNotification/${c.apiTokenInstance}`, {
      params: { receiveTimeout: 5 },
      timeout: 30_000,
      signal,
    })
  ).data || null

export const deleteNotification = (c: Credentials, receiptId: number) =>
  client(c).delete(`/deleteNotification/${c.apiTokenInstance}/${receiptId}`)

export const errorMessage = (e: unknown) =>
  isAxiosError(e)
    ? (e.response?.data?.message ?? e.response?.data?.reason ?? `${e.response?.status ?? ''} ${e.message}`)
    : e instanceof Error
      ? e.message
      : 'Неизвестная ошибка'
