import { useEffect } from 'react'
import { toast } from 'sonner'
import { useSession } from '@/entities/session'
import { deleteNotification, errorMessage, receiveNotification } from '@/shared/api'
import { handleNotification } from './handleNotification'

export function useReceiveMessages() {
  const creds = useSession((s) => s.creds)

  useEffect(() => {
    if (!creds) return
    const ctrl = new AbortController()

    ;(async () => {
      while (!ctrl.signal.aborted) {
        try {
          const n = await receiveNotification(creds, ctrl.signal)
          if (!n) continue
          handleNotification(n)
          await deleteNotification(creds, n.receiptId)
        } catch (e) {
          if (ctrl.signal.aborted) return
          toast.error(`Не удалось получить сообщения: ${errorMessage(e)}`, { id: 'poll' })
          await new Promise((r) => setTimeout(r, 5000))
        }
      }
    })()

    return () => ctrl.abort()
  }, [creds])
}
