import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useChats } from '@/entities/chat'
import { useSession } from '@/entities/session'
import { checkWhatsapp, errorMessage } from '@/shared/api'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { phoneSchema, type PhoneInput, type PhoneOutput } from '../model/schema'

export function CreateChatForm() {
  const creds = useSession((s) => s.creds)!
  const ensureChat = useChats((s) => s.ensureChat)
  const { register, handleSubmit, reset, formState } = useForm<PhoneInput, unknown, PhoneOutput>({
    resolver: zodResolver(phoneSchema),
  })

  const create = useMutation({
    mutationFn: async (phone: string) => ({ phone, res: await checkWhatsapp(creds, `${phone}@c.us`) }),
    onSuccess: ({ phone, res }) => {
      if (!res.existsWhatsapp) return toast.error('У этого номера нет аккаунта в WhatsApp')
      ensureChat(`${phone}@c.us`, `+${phone}`)
      reset()
    },
    onError: (e) => toast.error(errorMessage(e)),
  })

  return (
    <form onSubmit={handleSubmit(({ phone }) => create.mutate(phone))} className="space-y-1 border-b p-3">
      <div className="flex gap-2">
        <Input
          type="tel"
          placeholder="Номер телефона получателя"
          aria-label="Номер телефона получателя"
          {...register('phone')}
        />
        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? '…' : 'Чат'}
        </Button>
      </div>
      {formState.errors.phone ? (
        <p className="text-xs text-destructive">{formState.errors.phone.message}</p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Номер с кодом страны, без «+» и пробелов, например 77001234567. У получателя должен быть WhatsApp.
        </p>
      )}
    </form>
  )
}
