import { useEffect, useRef, useState, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Element ko'rinchiga kirganda yumshoq animatsiya bilan paydo bo'ladi.
 * Xavfsizlik uchun: agar IntersectionObserver ishlamasa yoki kechiksa,
 * kontent har doim ma'lum vaqt o'tib ko'rsatiladi (hech qachon yashirin qolmaydi).
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) {
      setVisible(true)
      return
    }

    const show = () => setVisible(true)

    if (typeof IntersectionObserver === 'undefined') {
      show()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect()
          show()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    )
    observer.observe(element)

    // Zaxira: element ko'rinchiga kelishi kutilayotgan bo'lsa,
    // 2.5 soniyadan keyin ko'rsatamiz (kontent hech qachon yashirin qolmaydi).
    const fallback = window.setTimeout(() => {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) show()
    }, 2500)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-5 opacity-0 blur-[1px]'
      } ${className}`}
    >
      {children}
    </div>
  )
}
