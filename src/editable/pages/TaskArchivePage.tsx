import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Bookmark, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; badge: string; intro: string }> = {
  article: { icon: FileText, badge: 'Editorial archive', intro: 'Longer reads and clean summaries with a premium magazine rhythm.' },
  listing: { icon: Building2, badge: 'Business archive', intro: 'Structured business pages with quick access to location, contact, and overview details.' },
  classified: { icon: Megaphone, badge: 'Offer archive', intro: 'Clear offer cards designed for quick scanning and fast action.' },
  image: { icon: Camera, badge: 'Visual archive', intro: 'Image-led posts arranged for discovery with stronger visual pacing.' },
  sbm: { icon: Bookmark, badge: 'Bookmark archive', intro: 'Saved links, quick references, and resource-first cards for faster browsing.' },
  pdf: { icon: Download, badge: 'Document archive', intro: 'Readable document cards that keep files discoverable and easy to reopen.' },
  profile: { icon: UserRound, badge: 'Profile archive', intro: 'Identity-led cards for people, creators, and profile-style pages.' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = {
    '--archive-bg': preset.colors.background,
    '--archive-text': preset.colors.foreground,
    '--archive-surface': preset.colors.surface,
    '--archive-accent': preset.colors.accent,
  } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const lead = posts[0]
  const secondary = posts.slice(1, 5)

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="relative overflow-hidden bg-[#fcfefd]">
          <div className="absolute inset-y-0 right-0 hidden w-[44%] bg-[var(--slot4-dark-bg)] lg:block" style={{ clipPath: 'polygon(24% 0, 100% 0, 100% 100%, 0 100%)' }} />
          <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-line)] bg-[var(--slot4-accent-soft)]/50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">
                <Icon className="h-4 w-4" /> {deck.badge}
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-6xl lg:text-7xl">{voice?.headline || `Browse ${label}`}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-[var(--slot4-muted-text)]">{voice?.description || SITE_CONFIG.description}</p>
              <div className="mt-7 rounded-[1.5rem] border border-[var(--slot4-line)] bg-white/80 p-5 text-sm font-bold leading-7 text-[var(--slot4-muted-text)]">
                {deck.intro}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                
                <Link href="/search" className="rounded-full border border-[var(--slot4-line)] bg-white px-6 py-3 text-sm font-black">Search posts</Link>
              </div>
            </div>

            <div className="grid gap-5 lg:pl-10">
              <form action={basePath} className="rounded-[1.8rem] border border-[var(--slot4-line)] bg-white/88 p-5 shadow-[0_18px_48px_rgba(18,27,52,0.1)] backdrop-blur">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)]"><Filter className="h-4 w-4" /> Filter archive</div>
                <select name="category" defaultValue={category} className="mt-4 h-14 w-full rounded-[1rem] border border-[var(--slot4-line)] bg-[var(--slot4-surface-bg)] px-4 text-sm font-bold outline-none">
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
                <button className="mt-3 h-12 w-full rounded-[1rem] bg-[var(--slot4-dark-bg)] text-sm font-black text-white">Apply filters</button>
                <p className="mt-3 text-xs font-bold text-[var(--slot4-muted-text)]">Showing: {categoryLabel}</p>
              </form>

              {lead ? (
                <Link href={`${basePath}/${lead.slug}` || buildPostUrl(task, lead.slug)} className="group overflow-hidden rounded-[1.9rem] border border-white/10 bg-[var(--slot4-dark-panel)] text-white shadow-[0_24px_72px_rgba(18,27,52,0.24)]">
                  <div className="grid md:grid-cols-[0.95fr_1.05fr]">
                    <div className="p-6">
                      <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent-wash)]">Lead story</p>
                      <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.06em]">{lead.title}</h2>
                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/74">{getEditableExcerpt(lead, 150)}</p>
                    </div>
                    <div className="relative min-h-[220px] bg-[var(--slot4-media-bg)]">
                      <img src={getEditablePostImage(lead)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8">
          {secondary.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {secondary.map((post, index) => (
                <ArchiveMiniCard key={post.id || post.slug} post={post} href={`${basePath}/${post.slug}` || buildPostUrl(task, post.slug)} index={index} />
              ))}
            </div>
          ) : null}

          {posts.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[var(--slot4-line)] bg-white/70 p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[var(--slot4-accent-fill)]" />
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[var(--slot4-line)] bg-white px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="rounded-full bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[var(--slot4-line)] bg-white px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchiveMiniCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group rounded-[1.7rem] border border-[var(--slot4-line)] bg-white p-5 shadow-[0_16px_40px_rgba(18,27,52,0.06)] transition duration-300 hover:-translate-y-1">
      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-fill)]">Top pick {String(index + 1).padStart(2, '0')}</p>
      <h3 className="mt-3 line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
    </Link>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return index % 3 === 0 ? <ArticleFeatureArchiveCard post={post} href={href} /> : <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleFeatureArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group md:col-span-2 overflow-hidden rounded-[2rem] border border-[var(--slot4-line)] bg-white shadow-[0_20px_60px_rgba(18,27,52,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-7">
          <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)]">Featured read</p>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.06em]">{post.title}</h2>
          <p className="mt-5 text-base leading-8 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 170)}</p>
        </div>
        <div className="relative min-h-[260px] bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
      </div>
    </Link>
  )
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[1.8rem] border border-[var(--slot4-line)] bg-white shadow-[0_16px_44px_rgba(18,27,52,0.06)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">{getEditableCategory(post, )}</span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-fill)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 120)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 rounded-[2rem] border border-[var(--slot4-line)] bg-white p-5 shadow-[0_18px_46px_rgba(18,27,52,0.08)] transition duration-300 hover:-translate-y-1 sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[var(--slot4-accent-soft)]">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--slot4-dark-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-full border border-[var(--slot4-line)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 125)}</p>
        <div className="mt-4 grid gap-2 text-xs font-bold text-[var(--slot4-muted-text)] sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[var(--slot4-line)] bg-white shadow-[0_18px_52px_rgba(18,27,52,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="grid min-h-64 sm:grid-cols-[0.74fr_1fr]">
        <div className="relative bg-[var(--slot4-dark-bg)] p-5 text-white">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Classified</span>
          <h2 className="mt-10 text-3xl font-black leading-[1] tracking-[-0.07em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold text-white/75">{location || condition || 'Details inside'}</p>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 150)}</p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group overflow-hidden rounded-[1.9rem] border border-[var(--slot4-line)] bg-white shadow-[0_16px_44px_rgba(18,27,52,0.08)] transition duration-300 hover:-translate-y-1 ${index % 5 === 0 ? 'md:col-span-2' : ''}`}>
      <div className={index % 3 === 0 ? 'aspect-[16/8]' : 'aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]'}>
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-[1.75rem] border border-[var(--slot4-line)] bg-white p-6 shadow-[0_14px_40px_rgba(18,27,52,0.06)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--slot4-dark-bg)] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-75">{getEditableExcerpt(post, 145)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.16em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group rounded-[2rem] border border-[var(--slot4-line)] bg-white p-6 shadow-[0_16px_44px_rgba(18,27,52,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[var(--slot4-dark-bg)] p-5 text-white"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</span>
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 145)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-[2rem] border border-[var(--slot4-line)] bg-white p-6 text-center shadow-[0_16px_44px_rgba(18,27,52,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[var(--slot4-accent-soft)]">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" />
      </div>
      <h2 className="mt-5 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
    </Link>
  )
}
