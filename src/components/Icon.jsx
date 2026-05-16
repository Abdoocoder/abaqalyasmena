import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  MapPin,
  Clock,
  Headphones,
  Phone,
  ArrowLeft,
  ChevronLeft,
  FolderX,
  Package,
  Heart,
  MessageCircle,
  Map,
  Home,
  SearchX,
  ArrowRight,
  ExternalLink,
  CircleAlert,
} from 'lucide-react'

const iconMap = {
  search: Search,
  dark_mode: Moon,
  light_mode: Sun,
  menu: Menu,
  close: X,
  location_on: MapPin,
  schedule: Clock,
  support_agent: Headphones,
  phone: Phone,
  arrow_back: ArrowLeft,
  arrow_left_alt: ArrowLeft,
  chevron_left: ChevronLeft,
  folder_off: FolderX,
  inventory_2: Package,
  favorite: Heart,
  chat: MessageCircle,
  map: Map,
  home: Home,
  search_off: SearchX,
  arrow_right_alt: ArrowRight,
  facebook: ExternalLink,
  error: CircleAlert,
}

const Icon = ({ name, className = '' }) => {
  const LucideIcon = iconMap[name]
  if (!LucideIcon) return null
  return <LucideIcon className={className} />
}

export default Icon
