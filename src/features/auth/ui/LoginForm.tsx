import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { MessageCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSession } from '@/entities/session'
import { defaultApiUrl, errorMessage, getStateInstance } from '@/shared/api'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { loginSchema, type LoginForm as Fields } from '../model/schema'

export function LoginForm() {
  const setCreds = useSession((s) => s.setCreds)
  const { register, handleSubmit, formState } = useForm<Fields>({
    resolver: zodResolver(loginSchema),
    defaultValues: { apiUrl: '' },
  })

  const auth = useMutation({
    mutationFn: async (f: Fields) => {
      const creds = {
        idInstance: f.idInstance.trim(),
        apiTokenInstance: f.apiTokenInstance.trim(),
        apiUrl: f.apiUrl.trim() || defaultApiUrl(f.idInstance.trim()),
      }
      const { stateInstance } = await getStateInstance(creds)
      if (stateInstance !== 'authorized') throw new Error(`Инстанс не авторизован (${stateInstance}). Отсканируйте QR в консоли GREEN-API`)
      return creds
    },
    onSuccess: setCreds,
  })
  const { errors } = formState

  return (
    <form
      onSubmit={handleSubmit((f) => auth.mutate(f))}
      className="w-full max-w-sm space-y-4 rounded-2xl border bg-card p-6 shadow-sm"
    >
      <div className="space-y-3 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-violet-600 text-white shadow-md">
          <MessageCircle className="size-7" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Вход в чат</h1>
          <p className="text-sm text-muted-foreground">
            Введите данные вашего инстанса из{' '}
            <a
              href="https://console.green-api.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              консоли GREEN-API
            </a>
          </p>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="idInstance">idInstance</Label>
        <Input id="idInstance" inputMode="numeric" autoComplete="off" placeholder="1101000000" {...register('idInstance')} />
        <p className="text-xs text-muted-foreground">Число из 10–12 цифр. Находится на странице вашего инстанса в консоли.</p>
        {errors.idInstance && <p className="text-xs text-destructive">{errors.idInstance.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="apiTokenInstance">apiTokenInstance</Label>
        <Input id="apiTokenInstance" type="password" autoComplete="off" placeholder="Токен инстанса" {...register('apiTokenInstance')} />
        <p className="text-xs text-muted-foreground">Длинная строка там же. Хранится только в вашем браузере.</p>
        {errors.apiTokenInstance && <p className="text-xs text-destructive">{errors.apiTokenInstance.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="apiUrl">
          apiUrl <span className="font-normal text-muted-foreground">— необязательно</span>
        </Label>
        <Input id="apiUrl" placeholder="https://7201.api.green-api.com" {...register('apiUrl')} />
        <p className="text-xs text-muted-foreground">Если оставить пустым, адрес подставится сам по первым цифрам idInstance.</p>
      </div>
      {auth.error && <p className="text-sm text-destructive">{errorMessage(auth.error)}</p>}
      <Button type="submit" className="w-full" disabled={auth.isPending}>
        {auth.isPending ? 'Проверка…' : 'Войти'}
      </Button>
    </form>
  )
}
