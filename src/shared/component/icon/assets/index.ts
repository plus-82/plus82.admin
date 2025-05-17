import ArrowBack from './arrow-back.svg?react'
import Bell from './bell.svg?react'
import BookMarkOff from './bookmark-off.svg?react'
import BookMarkOn from './bookmark-on.svg?react'
import Business from './business.svg?react'
import CheckIndeterminate from './check-indeterminate.svg?react'
import CheckOutline from './check-outline.svg?react'
import Check from './check.svg?react'
import ChevronDown from './chevron-down.svg?react'
import ChevronLeft from './chevron-left.svg?react'
import ChevronRight from './chevron-right.svg?react'
import ChevronUp from './chevron-up.svg?react'
import Clear from './clear.svg?react'
import Close from './close.svg?react'
import Copy from './copy.svg?react'
import Date from './date.svg?react'
import Delete from './delete.svg?react'
import DocumentSearch from './document-search.svg?react'
import Dot from './dot.svg?react'
import Download from './download.svg?react'
import Earth from './earth.svg?react'
import ExclamationMark from './exclamation-mark.svg?react'
import EyesOff from './eyes-off.svg?react'
import EyesOn from './eyes-on.svg?react'
import Filter from './filter.svg?react'
import Language from './language.svg?react'
import LocationFilled from './location-filled.svg?react'
import Message from './message.svg?react'
import Money from './money.svg?react'
import Pen from './pen.svg?react'
import Plus from './plus.svg?react'
import Queen from './queen.svg?react'
import Reset from './reset.svg?react'
import Search from './search.svg?react'
import StarFill from './star-fill.svg?react'
import Upload from './upload.svg?react'
import User from './user.svg?react'

export const IconComponent = {
  ArrowBack,
  Bell,
  BookMarkOff,
  BookMarkOn,
  Business,
  Check,
  CheckIndeterminate,
  CheckOutline,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clear,
  Close,
  Copy,
  Date,
  Delete,
  DocumentSearch,
  Dot,
  Download,
  Earth,
  ExclamationMark,
  EyesOff,
  EyesOn,
  Filter,
  Language,
  LocationFilled,
  Message,
  Money,
  Pen,
  Plus,
  Queen,
  Reset,
  Search,
  StarFill,
  Upload,
  User,
} as const

export type IconType = keyof typeof IconComponent
