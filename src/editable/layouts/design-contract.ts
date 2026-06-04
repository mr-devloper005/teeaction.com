import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f5f8f2',
  '--slot4-page-text': '#121b34',
  '--slot4-panel-bg': '#ffffff',
  '--slot4-surface-bg': '#f9fbf7',
  '--slot4-muted-text': '#55627f',
  '--slot4-soft-muted-text': '#738097',
  '--slot4-accent': '#35858E',
  '--slot4-accent-fill': '#35858E',
  '--slot4-accent-soft': '#E6EEC9',
  '--slot4-accent-alt': '#7DA78C',
  '--slot4-accent-wash': '#C2D099',
  '--slot4-dark-bg': '#121b34',
  '--slot4-dark-panel': '#182341',
  '--slot4-dark-text': '#f8fbf8',
  '--slot4-media-bg': '#dfe9d6',
  '--slot4-line': 'rgba(18, 27, 52, 0.10)',
  '--slot4-line-strong': 'rgba(18, 27, 52, 0.18)',
  '--slot4-glow': 'rgba(53, 133, 142, 0.18)',
  '--slot4-body-gradient': 'radial-gradient(circle at top left, rgba(230, 238, 201, 0.88), transparent 34%), radial-gradient(circle at top right, rgba(194, 208, 153, 0.34), transparent 30%), linear-gradient(180deg, #fdfefe 0%, #f5f8f2 38%, #edf3ea 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentAltBg: 'bg-[var(--slot4-accent-alt)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentWashBg: 'bg-[var(--slot4-accent-wash)]',
  accentSoftText: 'text-[var(--slot4-accent-wash)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkPanel: 'bg-[var(--slot4-dark-panel)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  border: 'border-[var(--slot4-line)]',
  borderStrong: 'border-[var(--slot4-line-strong)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_22px_70px_rgba(18,27,52,0.08)]',
  shadowStrong: 'shadow-[0_28px_90px_rgba(18,27,52,0.16)]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-18 lg:py-24',
  },
  layout: {
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[250px] shrink-0 snap-start sm:w-[280px]',
    grid3: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    grid4: 'grid gap-6 md:grid-cols-2 xl:grid-cols-4',
    featureSplit: 'grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.34em]',
    heroTitle: 'text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-6xl lg:text-[5.2rem]',
    sectionTitle: 'text-4xl font-black leading-[0.96] tracking-[-0.07em] sm:text-5xl',
    cardTitle: 'text-2xl font-black leading-tight tracking-[-0.05em]',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.border} bg-white ${editablePalette.shadow}`,
    soft: `rounded-[2rem] border ${editablePalette.border} bg-white/80 backdrop-blur-sm`,
    dark: `rounded-[2rem] border border-white/10 ${editablePalette.darkPanel} text-[var(--slot4-dark-text)] ${editablePalette.shadowStrong}`,
    glass: 'rounded-[2rem] border border-white/30 bg-white/82 backdrop-blur-xl shadow-[0_18px_60px_rgba(18,27,52,0.12)]',
  },
  button: {
    primary: 'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-black text-white shadow-[0_18px_34px_rgba(53,133,142,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(53,133,142,0.32)]',
    secondary: 'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--slot4-line)] bg-white px-7 py-3.5 text-sm font-black text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-soft)]',
    dark: 'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5',
  },
  media: {
    frame: 'relative overflow-hidden rounded-[1.6rem] bg-[var(--slot4-media-bg)]',
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_72px_rgba(18,27,52,0.16)]',
    fade: 'transition duration-300 hover:opacity-90',
  },
} as const

export const aiLayoutRules = [
  'Keep the dark-and-light premium contrast consistent across nav, hero, stats, and footer.',
  'Use the provided green-teal palette for highlights, buttons, chips, and data accents.',
  'Preserve the existing data flow and route wrappers while redesigning the editable presentation layer.',
  'Mix featured, compact, horizontal, editorial, and image-first cards instead of reusing one pattern.',
  'Handle missing image, summary, category, website, and metadata safely with fallbacks.',
  'Favor generous spacing, rounded panels, clipped hero shapes, and clean mobile stacking.',
] as const
