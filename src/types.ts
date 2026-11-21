export type Lang = 'uz' | 'en' | 'ru'

export interface Localized {
  uz: string
  en: string
  ru?: string
}

export type SkillGroup = 'frontend' | 'backend' | 'language'

export interface Skill {
  name: string
  level: number
  group: SkillGroup
  note?: Localized
}

export type ProjectStatus = 'done' | 'wip'
export type ProjectCategory = 'web' | 'app' | 'game' | 'study'

export interface Project {
  id: string
  title: string
  subtitle: Localized
  description: Localized
  longDescription: Localized
  tech: string[]
  category: ProjectCategory
  status: ProjectStatus
  accent: string
  github?: string
  demo?: string
  icon: string
  year: string
  role: Localized
  features: Localized[]
  /** Loyihaning o'z ichki sahifasi bo'lsa (masalan blog yoki taom detali). */
  source?: string
}

export interface TimelineItem {
  year: string
  title: Localized
  text: Localized
}

export interface Stat {
  value: number
  suffix: string
  label: Localized
}

export type RoadmapStatus = 'done' | 'current' | 'next'

export interface RoadmapStep {
  status: RoadmapStatus
  title: Localized
  text: Localized
}
