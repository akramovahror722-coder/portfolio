import {
  Atom,
  BookOpen,
  ChefHat,
  Clock,
  CloudSun,
  Dumbbell,
  FileText,
  FlaskConical,
  Gamepad2,
  GraduationCap,
  Home,
  Layers,
  MessageCircle,
  Rocket,
  StickyNote,
  Ticket,
  Trophy,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  pdf: FileText,
  ticket: Ticket,
  game: Gamepad2,
  quiz: Trophy,
  wallet: Wallet,
  flask: FlaskConical,
  roof: Home,
  clock: Clock,
  kanban: Layers,
  chat: MessageCircle,
  book: BookOpen,
  file: FileText,
  react: Atom,
  cloud: CloudSun,
  chef: ChefHat,
  note: StickyNote,
  dumbbell: Dumbbell,
  graduation: GraduationCap,
  rocket: Rocket,
}

export function ProjectIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = icons[icon] ?? FileText
  return <Icon className={className} />
}
