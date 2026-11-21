import { useMemo, useState } from 'react'
import {
  Download,
  Pin,
  PinOff,
  Plus,
  Search,
  Tag,
  Trash2,
  Upload,
} from 'lucide-react'
import { AppShell } from '../AppShell'
import { getMiniApp } from '../../data/apps'
import { useLang } from '../../context/LangContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import { localize } from '../../lib/locale'
import { useLocalStorage } from '../useLocalStorage'

interface Note {
  id: string
  title: string
  body: string
  tags: string[]
  pinned: boolean
  createdAt: number
  updatedAt: number
}

const copy = {
  newNote: { uz: 'Yangi eslatma', en: 'New note', ru: 'Новая заметка' },
  search: { uz: 'Eslatmalarda qidirish...', en: 'Search notes...', ru: 'Поиск по заметкам...' },
  titlePlaceholder: { uz: 'Sarlavha', en: 'Title', ru: 'Заголовок' },
  bodyPlaceholder: {
    uz: 'Nima yozmoqchisiz? Klaviatura bilan ishlash oson...',
    en: 'What do you want to write? The keyboard works fine...',
    ru: 'Что хотите написать? Клавиатура работает отлично...',
  },
  tagsPlaceholder: { uz: 'teg1, teg2', en: 'tag1, tag2', ru: 'тег1, тег2' },
  empty: {
    uz: 'Hali eslatma yo‘q. Yuqoridagi tugma bilan birinchi eslatmani yarating.',
    en: 'No notes yet. Create your first note with the button above.',
    ru: 'Заметок пока нет. Создайте первую заметку кнопкой выше.',
  },
  noResults: {
    uz: 'Qidiruvga mos eslatma topilmadi.',
    en: 'No notes match your search.',
    ru: 'По вашему запросу ничего не найдено.',
  },
  words: { uz: 'so‘z', en: 'words', ru: 'слов' },
  chars: { uz: 'belgi', en: 'characters', ru: 'символов' },
  pin: { uz: 'Mahsiylash', en: 'Pin', ru: 'Закрепить' },
  unpin: { uz: 'Mahsiydan olish', en: 'Unpin', ru: 'Открепить' },
  delete: { uz: 'O‘chirish', en: 'Delete', ru: 'Удалить' },
  export: { uz: 'Eksport', en: 'Export', ru: 'Экспорт' },
  import: { uz: 'Import', en: 'Import', ru: 'Импорт' },
  pinned: { uz: 'Mahsiylangan', en: 'Pinned', ru: 'Закреплённые' },
  others: { uz: 'Boshqalar', en: 'Others', ru: 'Другие' },
  updated: { uz: 'Yangilangan', en: 'Updated', ru: 'Обновлено' },
} as const

const STORAGE_KEY = 'eslatmalar-notes'

export function NotesApp() {
  const { lang } = useLang()
  const app = getMiniApp('eslatmalar')!
  usePageTitle(`${app.title} — ${localize(app.tagline, lang)}`)

  const [notes, setNotes] = useLocalStorage<Note[]>(STORAGE_KEY, [])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [tagFilter, setTagFilter] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const set = new Set<string>()
    notes.forEach((note) => note.tags.forEach((tag) => set.add(tag)))
    return [...set].sort()
  }, [notes])

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    return notes
      .filter((note) => {
        if (tagFilter && !note.tags.includes(tagFilter)) return false
        if (!term) return true
        return (
          note.title.toLowerCase().includes(term) ||
          note.body.toLowerCase().includes(term) ||
          note.tags.some((tag) => tag.toLowerCase().includes(term))
        )
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
        return b.updatedAt - a.updatedAt
      })
  }, [notes, query, tagFilter])

  const active = notes.find((note) => note.id === activeId) ?? visible[0] ?? null

  const createNote = () => {
    const note: Note = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: '',
      body: '',
      tags: [],
      pinned: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setNotes((current) => [note, ...current])
    setActiveId(note.id)
  }

  const updateNote = (id: string, patch: Partial<Note>) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === id ? { ...note, ...patch, updatedAt: Date.now() } : note,
      ),
    )
  }

  const removeNote = (id: string) => {
    setNotes((current) => current.filter((note) => note.id !== id))
    setActiveId(null)
  }

  const exportNotes = () => {
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'eslatmalar.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const importNotes = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Note[]
        if (!Array.isArray(parsed)) return
        setNotes((current) => {
          const map = new Map(current.map((note) => [note.id, note]))
          parsed.forEach((note) => map.set(note.id, note))
          return [...map.values()]
        })
      } catch {
        /* JSON formati noto‘g‘ri */
      }
    }
    reader.readAsText(file)
  }

  const stats = useMemo(() => {
    const text = active ? `${active.title} ${active.body}` : ''
    return {
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      chars: text.length,
    }
  }, [active])

  return (
    <AppShell
      app={app}
      title={app.title}
      actions={
        <>
          <button
            type="button"
            onClick={createNote}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-all hover:-translate-y-0.5"
          >
            <Plus className="size-4" />
            {localize(copy.newNote, lang)}
          </button>
          <button
            type="button"
            onClick={exportNotes}
            aria-label={localize(copy.export, lang)}
            title={localize(copy.export, lang)}
            className="grid size-9 place-items-center rounded-xl border border-slate-300 text-slate-500 transition-colors hover:border-fuchsia-400 hover:text-fuchsia-600 dark:border-white/15 dark:text-slate-300"
          >
            <Download className="size-4" />
          </button>
          <label
            className="grid size-9 cursor-pointer place-items-center rounded-xl border border-slate-300 text-slate-500 transition-colors hover:border-fuchsia-400 hover:text-fuchsia-600 dark:border-white/15 dark:text-slate-300"
            title={localize(copy.import, lang)}
          >
            <Upload className="size-4" />
            <input
              type="file"
              accept="application/json"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) importNotes(file)
                event.target.value = ''
              }}
            />
          </label>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-4">
          <label className="relative block">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={localize(copy.search, lang)}
              aria-label={localize(copy.search, lang)}
              className="w-full rounded-xl border border-slate-300 bg-white/70 py-2.5 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/20 focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-slate-200"
            />
          </label>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                  className={`chip text-[11px] ${
                    tagFilter === tag
                      ? 'bg-fuchsia-500 text-white ring-fuchsia-500'
                      : 'bg-fuchsia-500/10 text-fuchsia-600 ring-fuchsia-500/20 dark:text-fuchsia-300'
                  }`}
                >
                  <Tag className="size-2.5" />
                  {tag}
                </button>
              ))}
            </div>
          )}

          <div className="card-surface max-h-[60vh] overflow-y-auto p-2">
            {visible.length === 0 ? (
              <p className="px-3 py-6 text-center text-xs text-slate-400">
                {notes.length === 0 ? localize(copy.empty, lang) : localize(copy.noResults, lang)}
              </p>
            ) : (
              <ul className="space-y-1">
                {visible.map((note) => (
                  <li key={note.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(note.id)}
                      className={`w-full rounded-xl px-3 py-2.5 text-left transition-colors ${
                        active?.id === note.id
                          ? 'bg-fuchsia-500/10 ring-1 ring-fuchsia-500/30 ring-inset'
                          : 'hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {note.pinned && <Pin className="size-3 shrink-0 text-fuchsia-500" />}
                        <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                          {note.title || localize(copy.titlePlaceholder, lang)}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        {note.body || '—'}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {active ? (
          <div className="card-surface flex flex-col gap-4 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <input
                value={active.title}
                onChange={(event) => updateNote(active.id, { title: event.target.value })}
                placeholder={localize(copy.titlePlaceholder, lang)}
                className="min-w-0 flex-1 border-0 bg-transparent text-xl font-extrabold tracking-tight outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
              />
              <button
                type="button"
                onClick={() => updateNote(active.id, { pinned: !active.pinned })}
                aria-label={localize(active.pinned ? copy.unpin : copy.pin, lang)}
                title={localize(active.pinned ? copy.unpin : copy.pin, lang)}
                className={`rounded-lg p-2 transition-colors ${
                  active.pinned
                    ? 'text-fuchsia-500'
                    : 'text-slate-300 hover:text-fuchsia-500 dark:text-slate-600'
                }`}
              >
                {active.pinned ? <Pin className="size-4" /> : <PinOff className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => removeNote(active.id)}
                aria-label={localize(copy.delete, lang)}
                title={localize(copy.delete, lang)}
                className="rounded-lg p-2 text-slate-300 transition-colors hover:text-rose-500 dark:text-slate-600"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <textarea
              value={active.body}
              onChange={(event) => updateNote(active.id, { body: event.target.value })}
              placeholder={localize(copy.bodyPlaceholder, lang)}
              className="min-h-64 flex-1 resize-none border-0 bg-transparent text-sm leading-relaxed text-slate-600 outline-none placeholder:text-slate-300 dark:text-slate-300 dark:placeholder:text-slate-600"
            />

            <div className="flex flex-wrap items-center gap-3 border-t border-slate-200/70 pt-4 dark:border-white/10">
              <input
                value={active.tags.join(', ')}
                onChange={(event) =>
                  updateNote(active.id, {
                    tags: event.target.value
                      .split(',')
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  })
                }
                placeholder={localize(copy.tagsPlaceholder, lang)}
                aria-label={localize(copy.tagsPlaceholder, lang)}
                className="min-w-40 flex-1 rounded-lg border border-slate-300 bg-white/70 px-3 py-1.5 text-xs text-slate-600 placeholder:text-slate-400 focus:border-fuchsia-400 focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-slate-300"
              />
              <span className="text-[11px] text-slate-400">
                {stats.words} {localize(copy.words, lang)} · {stats.chars}{' '}
                {localize(copy.chars, lang)}
              </span>
            </div>
          </div>
        ) : (
          <div className="card-surface grid place-items-center px-6 py-20 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">{localize(copy.empty, lang)}</p>
          </div>
        )}
      </div>
    </AppShell>
  )
}
