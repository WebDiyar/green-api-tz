import { AxiosError } from 'axios'
import { describe, expect, it } from 'vitest'
import { defaultApiUrl, errorMessage } from './green'

describe('defaultApiUrl', () => {
  it('builds the host from the first 4 digits of idInstance', () => {
    expect(defaultApiUrl('720122761091')).toBe('https://7201.api.green-api.com')
  })

  it('falls back to the common host for short ids', () => {
    expect(defaultApiUrl('123')).toBe('https://api.green-api.com')
  })
})

describe('errorMessage', () => {
  it('prefers the API message', () => {
    const e = new AxiosError('fail', '400', undefined, undefined, {
      status: 400,
      data: { message: 'bad phone' },
    } as never)
    expect(errorMessage(e)).toBe('bad phone')
  })

  it('handles plain errors and unknown values', () => {
    expect(errorMessage(new Error('boom'))).toBe('boom')
    expect(errorMessage(null)).toBe('Неизвестная ошибка')
  })
})
