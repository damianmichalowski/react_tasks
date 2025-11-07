import { describe, test, expect } from 'vitest'
import { validatePesel } from './validatePesel'

describe('validatePesel', () => {
  test('poprawny PESEL (44051401458)', () => {
    const result = validatePesel('44051401458')
    expect(result.valid).toBe(true)
    expect(result.error).toBe('')
  })

  test('poprawny PESEL z 2000 roku (02293012346)', () => {
    const result = validatePesel('02293012346')
    expect(result.valid).toBe(true)
  })

  test('za krótki numer (10 cyfr)', () => {
    const result = validatePesel('1234567890')
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/11 cyfr/i)
  })

  test('błędne znaki (litery)', () => {
    const result = validatePesel('abcdefghijk')
    expect(result.valid).toBe(false)
  })

  test('zła suma kontrolna', () => {
    const result = validatePesel('44051401459')
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/suma kontrolna/i)
  })

  test('niepoprawny kod miesiąca (00)', () => {
    const result = validatePesel('99001312345')
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/kod miesiąca/i)
  })

  test('nieistniejąca data (31 kwietnia)', () => {
    const result = validatePesel('00243100004')
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/data/i)
  })
})
