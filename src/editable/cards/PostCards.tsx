import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  const single = ['image', 'featuredImage', 'thumbnail', 'avatar'].map((key) => typeof content[key] === 'string' ? String(content[key]) : '').find(Boolean)
  return mediaUrl || contentImage || logo || single || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[2rem] border border-[var(--slot4-line)] bg-[var(--slot4-dark-bg)] text-white shadow-[0_24px_80px_rgba(18,27,52,0.24)] transition duration-300 hover:-translate-y-1">
      <div className="relative min-h-[520px] p-6 sm:p-8 lg:min-h-[620px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-58 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,27,52,0.08),rgba(18,27,52,0.88))]" />
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-end lg:min-h-[560px]">
          <span className="text-[11px] font-black uppercase tracking-[0.32em] text-[var(--slot4-accent-wash)]">{label}</span>
          <h3 className="mt-5 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.07em] sm:text-5xl lg:text-6xl">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/78 sm:text-base">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[var(--slot4-page-text)]">
            Read story <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`${dc.layout.minRailCard} group block overflow-hidden rounded-[1.8rem] border border-[var(--slot4-line)] bg-white shadow-[0_16px_44px_rgba(18,27,52,0.08)] transition duration-300 hover:-translate-y-1`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-[var(--slot4-dark-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</p>
        <h3 className="mt-3 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 135)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block rounded-[1.6rem] border border-[var(--slot4-line)] bg-white p-5 shadow-[0_12px_34px_rgba(18,27,52,0.06)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--slot4-accent-soft)]/35">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-dark-bg)] text-xs font-black text-white">{index + 1}</span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-5 overflow-hidden rounded-[1.9rem] border border-[var(--slot4-line)] bg-white p-4 shadow-[0_16px_42px_rgba(18,27,52,0.08)] transition duration-300 hover:-translate-y-1 sm:grid-cols-[220px_minmax(0,1fr)]">
      <div className="relative aspect-[16/12] overflow-hidden rounded-[1.4rem] bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[190px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-fill)]">Read {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-page-text)] sm:text-3xl">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">Open article <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}
