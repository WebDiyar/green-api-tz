import { z } from 'zod'

export const loginSchema = z.object({
  idInstance: z.string().regex(/^\d+$/, 'Только цифры'),
  apiTokenInstance: z.string().min(1, 'Обязательное поле'),
  apiUrl: z.string(),
})

export type LoginForm = z.infer<typeof loginSchema>
