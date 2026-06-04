import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'premium-discovery'
  | 'quiet-library'
  | 'modern-ledger'
  | 'visual-studio'
  | 'midnight-editorial'
  | 'green-atelier'
  | 'clean-index'

export const visualPresets = {
  'premium-discovery': {
    label: 'Premium Discovery',
    mood: 'refined, modern, confident',
    fontDirection: 'bold display headings with clean supporting sans',
    colors: {
      background: '#f5f8f2',
      foreground: '#121b34',
      muted: '#5b6881',
      primary: '#121b34',
      accent: '#35858E',
      surface: '#ffffff',
    },
    shape: 'large rounded cards, clipped hero angles, soft depth',
  },
  'quiet-library': {
    label: 'Quiet Library',
    mood: 'soft, thoughtful, calm',
    fontDirection: 'measured serif feel with gentle labels',
    colors: {
      background: '#f8f7f2',
      foreground: '#1d2330',
      muted: '#6f7688',
      primary: '#1d2330',
      accent: '#7DA78C',
      surface: '#ffffff',
    },
    shape: 'paper-like cards and open spacing',
  },
  'modern-ledger': {
    label: 'Modern Ledger',
    mood: 'structured and useful',
    fontDirection: 'heavy sans with crisp metadata',
    colors: {
      background: '#f4f7fb',
      foreground: '#10203d',
      muted: '#66758b',
      primary: '#10203d',
      accent: '#35858E',
      surface: '#ffffff',
    },
    shape: 'grid-forward, balanced, precise',
  },
  'visual-studio': {
    label: 'Visual Studio',
    mood: 'cinematic and sharp',
    fontDirection: 'oversized headlines with compact notes',
    colors: {
      background: '#11192f',
      foreground: '#f8fbf8',
      muted: '#b6c0d2',
      primary: '#f8fbf8',
      accent: '#C2D099',
      surface: '#182341',
    },
    shape: 'dark frames and luminous accents',
  },
  'midnight-editorial': {
    label: 'Midnight Editorial',
    mood: 'premium and story-led',
    fontDirection: 'high-contrast heading rhythm',
    colors: {
      background: '#121b34',
      foreground: '#f7faf8',
      muted: '#b9c4d8',
      primary: '#f7faf8',
      accent: '#35858E',
      surface: '#1a2847',
    },
    shape: 'dark mastheads with editorial space',
  },
  'green-atelier': {
    label: 'Green Atelier',
    mood: 'natural, premium, friendly',
    fontDirection: 'broad sans headlines with airy support text',
    colors: {
      background: '#edf3ea',
      foreground: '#17303a',
      muted: '#60707a',
      primary: '#17303a',
      accent: '#7DA78C',
      surface: '#ffffff',
    },
    shape: 'soft panels and organic gradients',
  },
  'clean-index': {
    label: 'Clean Index',
    mood: 'fast and polished',
    fontDirection: 'modern sans with sharp hierarchy',
    colors: {
      background: '#f8fbfb',
      foreground: '#0f1d38',
      muted: '#66748a',
      primary: '#0f1d38',
      accent: '#35858E',
      surface: '#ffffff',
    },
    shape: 'minimal cards and clear filters',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'premium-discovery',
  radius: {
    sm: '0.875rem',
    md: '1.4rem',
    lg: '2rem',
    xl: '2.8rem',
  },
  motion: {
    pageLoad: 'animate-in editable-fade-up',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-90',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.32em]',
    heroTitle: 'text-5xl font-black tracking-[-0.08em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-4xl font-black tracking-[-0.07em] sm:text-5xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-black uppercase tracking-[0.18em]',
  },
  surfaces: {
    glass: 'border border-white/20 bg-white/78 backdrop-blur-xl',
    paper: 'border border-black/10 bg-white shadow-[0_24px_70px_rgba(18,27,52,0.08)]',
    quiet: 'border border-black/8 bg-black/[0.03]',
    dark: 'border border-white/10 bg-[var(--slot4-dark-panel)] shadow-[0_24px_70px_rgba(0,0,0,0.28)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl max-w-[1280px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
