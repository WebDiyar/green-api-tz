import { describe, expect, it } from 'vitest'
import { phoneSchema } from './schema'

const parse = (phone: string) => phoneSchema.safeParse({ phone })

describe('phoneSchema', () => {
  it('strips formatting', () => {
    expect(parse('+7 (700) 123-45-67').data?.phone).toBe('77001234567')
  })

  it('converts leading 8 to 7 for 11-digit numbers', () => {
    expect(parse('87001234567').data?.phone).toBe('77001234567')
  })

  it('rejects too short, too long and non-numeric input', () => {
    expect(parse('12345').success).toBe(false)
    expect(parse('1234567890123456').success).toBe(false)
    expect(parse('abc').success).toBe(false)
  })
})
