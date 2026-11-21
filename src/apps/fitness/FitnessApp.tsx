import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  Check,
  Dumbbell,
  Flame,
  Pause,
  Play,
  RotateCcw,
  Timer as TimerIcon,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { AppShell } from '../AppShell'
import { getMiniApp } from '../../data/apps'
import { useLang } from '../../context/LangContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import { localize } from '../../lib/locale'
import { useLocalStorage } from '../useLocalStorage'
import { fitnessCopy, programs, type Program } from './data'

interface LogEntry {
  date: string
  programId: string
  minutes: number
  calories: number
}

const CALORIES_PER_MINUTE = 8

function beep() {
  try {
    const AudioCtx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const context = new AudioCtx()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.frequency.value = 660
    oscillator.type = 'sine'
    gain.gain.setValueAtTime(0.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.2, context.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.5)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.55)
    oscillator.onended = () => void context.close()
  } catch {
    /* audio qollab-quvvatlanmagan */
  }
}

function todayKeyFrom(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function todayKey() {
  return todayKeyFrom(new Date())
}

export function FitnessApp() {
  const { lang } = useLang()
  const app = getMiniApp('fittrack')!
  usePageTitle(`${app.title} — ${localize(app.tagline, lang)}`)

  const [program, setProgram] = useState<Program | null>(null)
  const [logs, setLogs] = useLocalStorage<LogEntry[]>('fittrack-logs', [])
  const [today] = useState(() => new Date())

  const stats = useMemo(() => {
    const minutes = logs.reduce((sum, item) => sum + item.minutes, 0)
    const uniqueDays = new Set(logs.map((item) => item.date)).size
    return { count: logs.length, minutes, streak: uniqueDays }
  }, [logs])

  const week = useMemo(() => {
    const days: { key: string; label: string; minutes: number }[] = []
    for (let index = 6; index >= 0; index -= 1) {
      const date = new Date(today)
      date.setDate(date.getDate() - index)
      const key = todayKeyFrom(date)
      const minutes = logs
        .filter((item) => item.date === key)
        .reduce((sum, item) => sum + item.minutes, 0)
      days.push({
        key,
        label: date.toLocaleDateString([], { weekday: 'short' }),
        minutes,
      })
    }
    return days
  }, [logs, today])

  const maxMinutes = Math.max(30, ...week.map((day) => day.minutes))

  const finishProgram = (selected: Program, minutes: number) => {
    setLogs((current) => [
      ...current,
      {
        date: todayKey(),
        programId: selected.id,
        minutes,
        calories: Math.round(minutes * CALORIES_PER_MINUTE),
      },
    ])
  }

  if (program) {
    return (
      <WorkoutSession
        program={program}
        onExit={() => setProgram(null)}
        onFinish={(minutes) => {
          finishProgram(program, minutes)
          setProgram(null)
        }}
      />
    )
  }

  return (
    <AppShell app={app} title={app.title}>
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={Dumbbell}
            value={String(stats.count)}
            label={localize(fitnessCopy.total, lang)}
          />
          <StatCard
            icon={Flame}
            value={String(stats.minutes)}
            label={localize(fitnessCopy.minutes, lang)}
          />
          <StatCard
            icon={TrendingUp}
            value={String(stats.streak)}
            label={localize(fitnessCopy.streak, lang)}
          />
        </div>

        <section>
          <h2 className="text-lg font-bold">{localize(fitnessCopy.chooseProgram, lang)}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {programs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setProgram(item)}
                className="card-surface card-hover flex h-full flex-col p-6 text-left"
              >
                <span className="text-3xl">{item.emoji}</span>
                <h3 className="mt-4 text-base font-bold">{localize(item.title, lang)}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{localize(item.level, lang)}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <TimerIcon className="size-3.5" />
                    {item.minutes} {localize(fitnessCopy.minutes, lang)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Dumbbell className="size-3.5" />
                    {item.exercises.length} {localize(fitnessCopy.exercises, lang).toLowerCase()}
                  </span>
                </div>
                <span
                  className={`mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${item.color} px-4 py-2 text-sm font-semibold text-white shadow-lg`}
                >
                  <Play className="size-4" />
                  {localize(fitnessCopy.start, lang)}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="card-surface p-6">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <TrendingUp className="size-4 text-lime-500" />
              {localize(fitnessCopy.week, lang)}
            </h2>
            <div className="mt-6 flex h-40 items-end gap-2 sm:gap-3">
              {week.map((day) => (
                <div key={day.key} className="flex flex-1 flex-col items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400">
                    {day.minutes > 0 ? day.minutes : ''}
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-lime-500 to-emerald-400 transition-all duration-500"
                    style={{ height: `${Math.round((day.minutes / maxMinutes) * 100)}%`, minHeight: 4 }}
                  />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{day.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <Dumbbell className="size-4 text-lime-500" />
              {localize(fitnessCopy.log, lang)}
            </h2>
            {logs.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                {localize(fitnessCopy.noLogs, lang)}
              </p>
            ) : (
              <ul className="mt-4 max-h-64 space-y-2 overflow-y-auto">
                {[...logs].reverse().map((log, index) => {
                  const item = programs.find((entry) => entry.id === log.programId)
                  return (
                    <li
                      key={`${log.date}-${index}`}
                      className="flex items-center gap-3 rounded-xl border border-slate-200/70 px-3 py-2 text-sm dark:border-white/10"
                    >
                      <span className="text-lg">{item?.emoji ?? '💪'}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">
                          {item ? localize(item.title, lang) : log.programId}
                        </p>
                        <p className="text-xs text-slate-400">{log.date}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs font-bold text-lime-600 dark:text-lime-300">
                        {log.minutes} min · {log.calories} kcal
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon
  value: string
  label: string
}) {
  return (
    <div className="card-surface flex items-center gap-4 p-5">
      <span className="grid size-11 place-items-center rounded-xl bg-lime-500/10 text-lime-600 dark:text-lime-300">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xl font-extrabold">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  )
}

function WorkoutSession({
  program,
  onExit,
  onFinish,
}: {
  program: Program
  onExit: () => void
  onFinish: (minutes: number) => void
}) {
  const { lang } = useLang()
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'work' | 'rest'>('work')
  const [remaining, setRemaining] = useState(program.exercises[0].seconds)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const remainingRef = useRef(remaining)

  const exercise = program.exercises[index]

  const advance = useCallback(() => {
    beep()
    if (phase === 'work') {
      const rest = exercise.rest
      if (rest > 0) {
        setPhase('rest')
        setRemaining(rest)
        return
      }
    }
    if (index + 1 < program.exercises.length) {
      const nextIndex = index + 1
      setIndex(nextIndex)
      setPhase('work')
      setRemaining(program.exercises[nextIndex].seconds)
      return
    }
    setRunning(false)
    setFinished(true)
  }, [phase, exercise.rest, index, program.exercises])

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => {
      if (remainingRef.current <= 1) {
        remainingRef.current = 0
        setRemaining(0)
        advance()
        return
      }
      remainingRef.current -= 1
      setRemaining(remainingRef.current)
    }, 1000)
    return () => window.clearInterval(timer)
  }, [running, advance])

  useEffect(() => {
    remainingRef.current = remaining
  }, [remaining])

  const progress = Math.round(
    ((index + (phase === 'rest' ? 1 : 0)) / program.exercises.length) * 100,
  )

  return (
    <AppShell
      app={getMiniApp('fittrack')!}
      title={localize(program.title, lang)}
      subtitle={localize(program.level, lang)}
      actions={
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-lime-400 hover:text-lime-600 dark:border-white/15 dark:text-slate-300"
        >
          <ArrowLeft className="size-4" />
          {localize(fitnessCopy.backToPrograms, lang)}
        </button>
      }
    >
      {finished ? (
        <div className="card-surface grid place-items-center px-6 py-20 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-lime-500/15 text-lime-600 dark:text-lime-300">
            <Check className="size-8" />
          </span>
          <h2 className="mt-5 text-2xl font-extrabold">{localize(fitnessCopy.done, lang)}</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {localize(program.title, lang)} · {program.minutes} {localize(fitnessCopy.minutes, lang)}
          </p>
          <button
            type="button"
            onClick={() => onFinish(program.minutes)}
            className="btn-primary mt-7"
          >
            {localize(fitnessCopy.markDone, lang)}
          </button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="card-surface p-6 text-center sm:p-10">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-lime-600 uppercase dark:text-lime-300">
              {phase === 'work'
                ? localize(fitnessCopy.work, lang)
                : localize(fitnessCopy.rest, lang)}
            </span>

            <p className="mt-6 font-mono text-7xl font-extrabold tracking-tight tabular-nums">
              {String(Math.floor(remaining / 60)).padStart(2, '0')}:
              {String(remaining % 60).padStart(2, '0')}
            </p>

            <h2 className="mt-6 text-xl font-bold">{localize(exercise.name, lang)}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {exercise.reps > 1
                ? `${exercise.reps} ${localize(fitnessCopy.repeats, lang)}`
                : `${exercise.seconds} ${localize(fitnessCopy.minutes, lang)}`}
              {' · '}
              {localize(fitnessCopy.next, lang)}:{' '}
              {program.exercises[index + 1] ? localize(program.exercises[index + 1].name, lang) : '—'}
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setRunning((value) => !value)}
                className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-lime-500 to-emerald-500 text-white shadow-lg shadow-lime-500/30 transition-transform hover:scale-105"
                aria-label={
                  running ? localize(fitnessCopy.pause, lang) : localize(fitnessCopy.start, lang)
                }
              >
                {running ? <Pause className="size-6" /> : <Play className="size-6" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setRemaining(exercise.seconds)
                  setPhase('work')
                  setRunning(false)
                }}
                aria-label={localize(fitnessCopy.reset, lang)}
                className="grid size-12 place-items-center rounded-full border border-slate-300 text-slate-500 transition-colors hover:border-lime-400 hover:text-lime-600 dark:border-white/15 dark:text-slate-300"
              >
                <RotateCcw className="size-5" />
              </button>
              <button
                type="button"
                onClick={advance}
                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-500 transition-colors hover:border-lime-400 hover:text-lime-600 dark:border-white/15 dark:text-slate-300"
              >
                {localize(fitnessCopy.next, lang)}
              </button>
            </div>
          </div>

          <aside className="card-surface p-6">
            <h2 className="text-sm font-bold">{localize(fitnessCopy.exercises, lang)}</h2>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-lime-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <ol className="mt-4 space-y-2">
              {program.exercises.map((item, itemIndex) => (
                <li
                  key={item.name.en}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                    itemIndex === index
                      ? 'bg-lime-500/10 font-semibold text-lime-700 dark:text-lime-300'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-slate-500/10 font-mono text-[11px]">
                    {itemIndex + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{localize(item.name, lang)}</span>
                  <span className="shrink-0 font-mono text-xs">
                    {item.reps > 1 ? `${item.reps}x` : `${item.seconds}s`}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      )}
    </AppShell>
  )
}
