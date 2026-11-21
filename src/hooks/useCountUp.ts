import { useEffect, useRef, useState } from 'react'

/**
 * Element ko'rinchiga kelganda soniyani animatsiya bilan oshiradi.
 * Qaytariladigan qiymat: [joriy soniya, elementga ulanadigan ref].
 *
 * Zaxira choralar:
 * - rAF fon rejimida to'xtasa, 1.5 soniyadan keyin to'g'ri qiymat ko'rsatiladi;
 * - ko'rinmay qolish (opacity-0) holati hech qachon saqlanib qolmaydi.
 */
export function useCountUp(
  target: number,
  duration = 1200,
): [number, React.RefObject<HTMLDivElement | null>] {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const frame = useRef(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let finished = false
    let started = false

    const finish = () => {
      if (finished) return
      finished = true
      setValue(target)
    }

    const start = () => {
      if (started || finished) return
      started = true
      const begin = performance.now()
      const tick = (now: number) => {
        if (finished) return
        const ratio = Math.min((now - begin) / duration, 1)
        const eased = 1 - Math.pow(1 - ratio, 3)
        setValue(Math.round(target * eased))
        if (ratio < 1) frame.current = requestAnimationFrame(tick)
        else finish()
      }
      frame.current = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started) return
        observer.disconnect()
        start()
      },
      { threshold: 0.2 },
    )
    observer.observe(element)

    // Fon rejimida rAF to'xtaydi — bu holda ko'rinayotgan qiymatni darhol ko'rsatamiz.
    const fallback = window.setTimeout(() => {
      const rect = element.getBoundingClientRect()
      const visible = rect.top < window.innerHeight && rect.bottom > 0
      if (visible) finish()
    }, 1500)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame.current)
      window.clearTimeout(fallback)
    }
  }, [target, duration])

  return [value, ref]
}
