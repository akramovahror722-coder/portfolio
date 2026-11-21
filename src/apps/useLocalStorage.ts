import { useCallback, useEffect, useState } from 'react'

/**
 * Mahalliy saqlash (localStorage) bilan ishlovchi hook.
 * Qiymat JSON sifatida yoziladi va JSON.parse xatosidan himoyalangan.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initialValue : (JSON.parse(raw) as T)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* kvota to'ldi yoki brauzer bloklagan bo'lishi mumkin */
    }
  }, [key, value])

  const reset = useCallback(() => setValue(initialValue), [initialValue])

  return [value, setValue, reset] as const
}
