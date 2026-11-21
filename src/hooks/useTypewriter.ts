import { useEffect, useState } from 'react'

interface TypewriterState {
  index: number
  text: string
  deleting: boolean
}

/**
 * Matnni bosqichma-bosqich yozadi va o'chiradi.
 * Til yoki ro'yxat o'zgarganda yozish qaytadan boshlanadi.
 */
export function useTypewriter(
  words: string[],
  typeSpeed = 65,
  deleteSpeed = 35,
  pause = 1700,
): string {
  const [state, setState] = useState<TypewriterState>({ index: 0, text: '', deleting: false })
  const [lastWords, setLastWords] = useState(words)

  // Ro'yxat o'zgarganda holatni render paytida to'g'rilash (qo'shimcha render o'rniga).
  if (lastWords !== words) {
    setLastWords(words)
    setState({ index: 0, text: '', deleting: false })
  }

  const { index, text, deleting } = state
  const word = words.length > 0 ? words[index % words.length] : ''

  // Matn to'liq o'chirilgan bo'lsa, keyingi so'zga o'tish render paytida bajariladi.
  if (deleting && text === '' && words.length > 0) {
    setState((current) => ({
      ...current,
      deleting: false,
      index: (current.index + 1) % words.length,
    }))
  }

  useEffect(() => {
    if (words.length === 0) return

    if (!deleting && text === word) {
      const timeout = window.setTimeout(() => {
        setState((current) => ({ ...current, deleting: true }))
      }, pause)
      return () => window.clearTimeout(timeout)
    }

    if (deleting && text === '') return

    const timeout = window.setTimeout(() => {
      setState((current) => ({
        ...current,
        text: current.deleting
          ? word.slice(0, Math.max(current.text.length - 1, 0))
          : word.slice(0, current.text.length + 1),
      }))
    }, deleting ? deleteSpeed : typeSpeed)

    return () => window.clearTimeout(timeout)
  }, [text, deleting, index, word, words.length, typeSpeed, deleteSpeed, pause])

  return text
}
