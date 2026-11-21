import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  CloudDrizzle,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudSun,
  Compass,
  Droplets,
  MapPin,
  Navigation,
  Search,
  Sun,
  Trash2,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { AppShell } from '../AppShell'
import { getMiniApp } from '../../data/apps'
import { useLang } from '../../context/LangContext'
import { usePageTitle } from '../../hooks/usePageTitle'
import { localize } from '../../lib/locale'
import { useLocalStorage } from '../useLocalStorage'
import { weatherCodes, weatherCopy } from './copy'
import type { Lang } from '../../types'

interface GeoPlace {
  id: number
  name: string
  country: string
  admin1?: string
  latitude: number
  longitude: number
}

interface WeatherData {
  latitude: number
  longitude: number
  timezone: string
  current: {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    precipitation: number
    weather_code: number
    wind_speed_10m: number
    surface_pressure: number
    is_day: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    weather_code: number[]
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    sunrise: string[]
    sunset: string[]
  }
}

const WEEKDAYS: Record<Lang, string[]> = {
  uz: ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
}

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search'

function describe(code: number, lang: Lang) {
  const entry = weatherCodes[code] ?? weatherCodes[0]
  return { text: entry[lang], icon: entry.icon }
}

function WeatherGlyph({ code, className = 'size-6' }: { code: number; className?: string }) {
  const { icon } = describe(code, 'uz')
  const props = { className, strokeWidth: 1.7 }
  switch (icon) {
    case 'sun':
      return <Sun {...props} />
    case 'cloud-sun':
      return <CloudSun {...props} />
    case 'cloud':
      return <CloudSun {...props} />
    case 'fog':
      return <CloudFog {...props} />
    case 'drizzle':
      return <CloudDrizzle {...props} />
    case 'rain':
      return <CloudRain {...props} />
    case 'sleet':
      return <CloudSnow {...props} />
    case 'snow':
      return <CloudSnow {...props} />
    case 'thunder':
      return <Zap {...props} />
    default:
      return <Sun {...props} />
  }
}

export function WeatherApp() {
  const { lang } = useLang()
  const app = getMiniApp('havo')!
  usePageTitle(`${app.title} — ${localize(app.tagline, lang)}`)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeoPlace[]>([])
  const [place, setPlace] = useState<GeoPlace | null>(null)
  const [data, setData] = useState<WeatherData | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [unit, setUnit] = useLocalStorage<'c' | 'f'>('havo-unit', 'c')
  const [saved, setSaved] = useLocalStorage<GeoPlace[]>('havo-cities', [])

  const toTemp = useCallback(
    (value: number) => (unit === 'c' ? value : (value * 9) / 5 + 32),
    [unit],
  )

  const loadWeather = useCallback(async (target: GeoPlace) => {
    setStatus('loading')
    try {
      const params = new URLSearchParams({
        latitude: String(target.latitude),
        longitude: String(target.longitude),
        current:
          'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure,is_day',
        hourly: 'temperature_2m,weather_code',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
        timezone: 'auto',
        forecast_days: '7',
      })
      const response = await fetch(`${FORECAST_URL}?${params.toString()}`)
      if (!response.ok) throw new Error('request failed')
      const json = (await response.json()) as WeatherData
      setData(json)
      setPlace(target)
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      const term = query.trim()
      if (term.length < 2) {
        setResults([])
        return
      }
      try {
        const params = new URLSearchParams({ name: term, count: '6', language: lang, format: 'json' })
        const response = await fetch(`${GEOCODE_URL}?${params.toString()}`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('request failed')
        const json = (await response.json()) as { results?: GeoPlace[] }
        setResults(json.results ?? [])
      } catch (error) {
        if ((error as Error).name !== 'AbortError') setResults([])
      }
    }, 320)

    return () => {
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [query, lang])

  useEffect(() => {
    if (place) return
    const initial = saved[0]
    if (initial) {
      void loadWeather(initial)
    } else {
      void loadWeather({
        id: 0,
        name: 'Tashkent',
        country: 'Uzbekistan',
        latitude: 41.2995,
        longitude: 69.2401,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleSave = (target: GeoPlace) => {
    setSaved((current) =>
      current.some((item) => item.id === target.id)
        ? current.filter((item) => item.id !== target.id)
        : [...current, target],
    )
  }

  const detectLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const target: GeoPlace = {
          id: -1,
          name: 'Mening joyim',
          country: '',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        void loadWeather(target)
      },
      () => setStatus('error'),
    )
  }

  const current = data?.current
  const description = current ? describe(current.weather_code, lang) : null
  const today = data?.daily

  const hours = useMemo(() => {
    if (!data) return []
    const start = new Date(data.current.time).getHours()
    return data.hourly.time
      .map((time, index) => ({ time, index }))
      .filter(({ index }) => {
        const hour = new Date(data.hourly.time[index]).getHours()
        return hour >= start && hour < start + 24
      })
      .slice(0, 24)
      .map(({ time, index }) => ({
        time,
        code: data.hourly.weather_code[index],
        temperature: data.hourly.temperature_2m[index],
      }))
  }, [data])

  return (
    <AppShell
      app={app}
      title={app.title}
      subtitle={place ? `${place.name}${place.country ? `, ${place.country}` : ''}` : undefined}
      actions={
        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 p-1 dark:border-white/15 dark:bg-white/5">
          {(['c', 'f'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setUnit(value)}
              aria-pressed={unit === value}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                unit === value
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              °{value.toUpperCase()}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
          <div className="card-surface relative overflow-hidden p-6 sm:p-8">
            <div
              className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/10"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    {localize(weatherCopy.now, lang)}
                  </p>
                  <p className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl">
                    {current ? `${Math.round(toTemp(current.temperature_2m))}°` : '—'}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {description ? description.text : ''}
                  </p>
                </div>
                {current && (
                  <div className="text-sky-500 dark:text-sky-300">
                    <WeatherGlyph code={current.weather_code} className="size-16" />
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Metric
                  icon={Thermometer}
                  label={localize(weatherCopy.feelsLike, lang)}
                  value={current ? `${Math.round(toTemp(current.apparent_temperature))}°` : '—'}
                />
                <Metric
                  icon={Droplets}
                  label={localize(weatherCopy.humidity, lang)}
                  value={current ? `${current.relative_humidity_2m}%` : '—'}
                />
                <Metric
                  icon={Wind}
                  label={localize(weatherCopy.wind, lang)}
                  value={current ? `${Math.round(current.wind_speed_10m)} km/h` : '—'}
                />
                <Metric
                  icon={Compass}
                  label={localize(weatherCopy.pressure, lang)}
                  value={current ? `${Math.round(current.surface_pressure)} hPa` : '—'}
                />
              </div>

              {today && (
                <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-200/70 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Sunrise className="size-4 text-amber-500" />
                    {localize(weatherCopy.sunrise, lang)}: {formatTime(today.sunrise[0])}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Sunset className="size-4 text-rose-400" />
                    {localize(weatherCopy.sunset, lang)}: {formatTime(today.sunset[0])}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="card-surface p-6">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <CloudSun className="size-4 text-sky-500" />
              {localize(weatherCopy.hourly, lang)}
            </h2>
            {status === 'loading' && (
              <p className="mt-4 text-sm text-slate-500">{localize(weatherCopy.loading, lang)}</p>
            )}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {hours.map(({ time, code, temperature }) => (
                <div
                  key={time}
                  className="flex min-w-16 shrink-0 flex-col items-center gap-1.5 rounded-xl border border-slate-200/70 bg-slate-50/60 px-2 py-3 text-center dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <span className="text-[11px] font-medium text-slate-400">
                    {formatTime(time)}
                  </span>
                  <span className="text-sky-500 dark:text-sky-300">
                    <WeatherGlyph code={code} className="size-5" />
                  </span>
                  <span className="text-sm font-bold">{Math.round(toTemp(temperature))}°</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <Compass className="size-4 text-sky-500" />
              {localize(weatherCopy.daily, lang)}
            </h2>
            <ul className="mt-4 space-y-2">
              {today?.time.map((day, index) => {
                const info = describe(today.weather_code[index], lang)
                const weekday = WEEKDAYS[lang][new Date(day).getDay()]
                return (
                  <li
                    key={day}
                    className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-slate-100/70 dark:hover:bg-white/5"
                  >
                    <span className="w-12 shrink-0 text-sm font-semibold">{weekday}</span>
                    <span className="text-sky-500 dark:text-sky-300">
                      <WeatherGlyph code={today.weather_code[index]} className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm text-slate-500 dark:text-slate-400">
                      {info.text}
                    </span>
                    <span className="shrink-0 text-sm font-bold">
                      {Math.round(toTemp(today.temperature_2m_max[index]))}°
                    </span>
                    <span className="shrink-0 text-sm text-slate-400">
                      {Math.round(toTemp(today.temperature_2m_min[index]))}°
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <aside className="min-w-0 space-y-6">
          <div className="card-surface p-5">
            <label className="relative block">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={localize(weatherCopy.searchPlaceholder, lang)}
                aria-label={localize(weatherCopy.search, lang)}
                className="w-full rounded-xl border border-slate-300 bg-white/70 py-2.5 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-white/15 dark:bg-white/5 dark:text-slate-200"
              />
            </label>

            <button
              type="button"
              onClick={detectLocation}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-sky-400 hover:text-sky-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-sky-400/60"
            >
              <Navigation className="size-3.5" />
              {localize(weatherCopy.useMyLocation, lang)}
            </button>

            {results.length > 0 && (
              <ul className="mt-3 space-y-1">
                {results.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        void loadWeather(item)
                        setQuery('')
                        setResults([])
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
                    >
                      <MapPin className="size-3.5 shrink-0 text-sky-500" />
                      <span className="min-w-0 flex-1 truncate font-medium">{item.name}</span>
                      <span className="shrink-0 text-[11px] text-slate-400">{item.country}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {status === 'error' && (
              <p className="mt-3 rounded-xl bg-rose-500/10 px-3 py-2 text-xs leading-relaxed text-rose-600 dark:text-rose-300">
                {localize(weatherCopy.error, lang)}
              </p>
            )}
          </div>

          <div className="card-surface p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <MapPin className="size-4 text-sky-500" />
              {localize(weatherCopy.saved, lang)}
            </h2>
            {saved.length === 0 ? (
              <p className="mt-3 text-xs text-slate-400">{localize(weatherCopy.emptySaved, lang)}</p>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {saved.map((item) => (
                  <li key={item.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void loadWeather(item)}
                      className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
                    >
                      <MapPin className="size-3.5 shrink-0 text-sky-500" />
                      <span className="min-w-0 flex-1 truncate font-medium">{item.name}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleSave(item)}
                      aria-label={localize(weatherCopy.remove, lang)}
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:text-rose-500"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {place && !saved.some((item) => item.id === place.id) && (
              <button
                type="button"
                onClick={() => toggleSave(place)}
                className="mt-3 w-full rounded-xl bg-sky-500/10 py-2 text-xs font-semibold text-sky-600 transition-colors hover:bg-sky-500/20 dark:text-sky-300"
              >
                + {place.name}
              </button>
            )}
          </div>

          <p className="px-1 text-[11px] text-slate-400">{localize(weatherCopy.source, lang)}</p>
        </aside>
      </div>
    </AppShell>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-slate-50/60 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.02]">
      <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
        <Icon className="size-3.5" />
        {label}
      </p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  )
}

function formatTime(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
