import { z } from 'zod'

const normalize = (v: string) => {
  const d = v.replace(/\D/g, '')
  return d.length === 11 && d[0] === '8' ? `7${d.slice(1)}` : d
}

export const phoneSchema = z.object({
  phone: z
    .string()
    .transform(normalize)
    .pipe(z.string().regex(/^\d{11,15}$/, 'Номер в международном формате, например 77001234567')),
})

export type PhoneInput = z.input<typeof phoneSchema>
export type PhoneOutput = z.output<typeof phoneSchema>
