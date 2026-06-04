import Link from 'next/link'
import { ArrowRight, BarChart3, BookOpen, Bookmark, Compass, Rocket, Search, Send, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function safePosts(posts: SitePost[]) {
  return posts.filter(Boolean).slice(0, 24)
}

function formatMetric(index: number) {
  return ['45K+', '850+', '98%', '3.5x'][index] || `${(index + 1) * 10}+`
}

function metricLabel(index: number) {
  return ['Saved pages indexed', 'Collections explored', 'Reader return rate', 'Discovery momentum'][index] || 'Active readers'
}

function featureCopy(post?: SitePost, fallback = 'Freshly curated resources appear here every time the feed updates.') {
  return post ? getEditableExcerpt(post, 148) || fallback : fallback
}

function serviceFromPost(post: SitePost, index: number) {
  const icons = [BarChart3, Bookmark, Compass, Rocket, Search, ShieldCheck]
  return {
    icon: icons[index % icons.length],
    title: getEditableCategory(post) || `Service ${index + 1}`,
    body: getEditableExcerpt(post, 120) || 'Useful highlights stay easy to scan, revisit, and share.',
  }
}

function FeaturedStoryCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group relative overflow-hidden rounded-[2rem] border border-[var(--slot4-line)] bg-white shadow-[0_22px_72px_rgba(18,27,52,0.12)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[1.7rem] m-3 bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="px-6 pb-6">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-fill)]">Featured story</p>
        <h3 className="mt-3 text-[1.9rem] font-black leading-tight tracking-[-0.05em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{featureCopy(post)}</p>
      </div>
    </Link>
  )
}

function CompactStoryCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group rounded-[1.75rem] border border-[var(--slot4-line)] bg-white p-5 shadow-[0_18px_48px_rgba(18,27,52,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--slot4-accent-soft)]/40">
      <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)]">Pick {String(index + 1).padStart(2, '0')}</p>
      <h3 className="mt-3 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{featureCopy(post)}</p>
    </Link>
  )
}

function HorizontalStoryCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid overflow-hidden rounded-[1.9rem] border border-[var(--slot4-line)] bg-white shadow-[0_18px_50px_rgba(18,27,52,0.08)] transition duration-300 hover:-translate-y-1 md:grid-cols-[220px_1fr]">
      <div className="relative min-h-[200px] bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)]">Editorial lane {index + 1}</p>
        <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{featureCopy(post)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">Open story <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

function EditorialListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex items-start gap-4 rounded-[1.5rem] border border-[var(--slot4-line)] bg-white/80 p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-white">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-dark-bg)] text-sm font-black text-white">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]">{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-lg font-black leading-tight tracking-[-0.03em]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{featureCopy(post, 'A concise introduction to this saved page appears here.')}</p>
      </div>
    </Link>
  )
}

function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[1.9rem] border border-[var(--slot4-line)] bg-white shadow-[0_16px_50px_rgba(18,27,52,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-fill)]">Image-first</p>
        <h3 className="mt-3 line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h3>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = safePosts(posts)[0]
  const side = safePosts(posts)[1]

  return (
    <section className="relative overflow-hidden bg-[#fcfefd]">
      <div className="absolute inset-y-0 right-0 hidden w-[47%] bg-[var(--slot4-dark-bg)] lg:block" style={{ clipPath: 'polygon(28% 0, 100% 0, 100% 100%, 0 100%)' }} />
      <div className={`${dc.shell.section} relative grid gap-12 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-20`}>
        <div className="max-w-xl">
          <h1 className={dc.type.heroTitle}>
            Find your next
            <br />
            favorite page with
            <br />
            <span className="text-[var(--slot4-accent-fill)]">curated precision.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={primaryRoute} className={dc.button.primary}>Launch as Explorer <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/search" className={dc.button.secondary}>Search the archive</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-8 text-sm font-bold text-[var(--slot4-muted-text)]">
            <span className="inline-flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--slot4-accent-fill)] text-[10px] text-[var(--slot4-accent-fill)]">✓</span> Curated discovery flow</span>
            <span className="inline-flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--slot4-accent-fill)] text-[10px] text-[var(--slot4-accent-fill)]">✓</span> Clean browsing rhythm</span>
          </div>
        </div>

        <div className="relative min-h-[380px] lg:min-h-[520px]">
          <div className="absolute bottom-0 left-[8%] right-0 top-[18%] overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--slot4-dark-panel)] shadow-[0_24px_90px_rgba(18,27,52,0.28)]">
            <img src={getEditablePostImage(lead)} alt="" className="h-full w-full object-cover opacity-88" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,27,52,0.55)] to-transparent" />
          </div>
          <div className="absolute right-2 top-[10%] rounded-[1.2rem] bg-white px-5 py-4 shadow-[0_18px_38px_rgba(18,27,52,0.18)] sm:right-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="h-10 w-10 rounded-full border-2 border-white bg-[var(--slot4-accent-fill)]" />
                <span className="h-10 w-10 rounded-full border-2 border-white bg-[var(--slot4-accent-alt)]" />
                <span className="h-10 w-10 rounded-full border-2 border-white bg-[var(--slot4-accent-wash)]" />
              </div>
              <div>
                <p className="text-sm font-black text-[var(--slot4-page-text)]">500+ saved inspirations</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[6%] left-0 rounded-[1.2rem] bg-white px-6 py-5 shadow-[0_18px_38px_rgba(18,27,52,0.18)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[0.9rem] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent-fill)]">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">Discovery rate</p>
                <p className="text-3xl font-black tracking-[-0.05em] text-[var(--slot4-page-text)]">+124%</p>
              </div>
            </div>
          </div>
          {side ? (
            <div className="absolute left-[12%] top-[4%] hidden max-w-[240px] rounded-[1.2rem] border border-white/30 bg-white/82 p-4 shadow-[0_14px_34px_rgba(18,27,52,0.14)] backdrop-blur md:block">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]">Fresh pick</p>
              <p className="mt-2 text-sm font-bold leading-6 text-[var(--slot4-page-text)]">{side.title}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const items = safePosts(posts)
  const servicePosts = items.slice(0, 6)

  return (
    <section id="services" className="bg-white">
      <div className={`${dc.shell.section} py-20`}>
        <div className="mx-auto max-w-4xl text-center">
          <p className={dc.type.eyebrow + ' text-[var(--slot4-accent-fill)]'}>Our expertise</p>
          <h2 className={dc.type.sectionTitle + ' mt-4'}>Comprehensive discovery tools for modern bookmarking.</h2>
          <p className="mt-6 text-lg leading-9 text-[var(--slot4-muted-text)]">
            The experience brings together structured sections, visual curation, and fast scanning so every visit feels more useful.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {servicePosts.map((post, index) => {
            const service = serviceFromPost(post, index)
            return (
              <Link key={post.id || post.slug} href="/sbm" className="block rounded-[1.9rem] border border-[var(--slot4-line)] bg-[var(--slot4-surface-bg)] p-8 shadow-[0_18px_46px_rgba(18,27,52,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(18,27,52,0.12)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent-fill)]">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-8 text-[1.85rem] font-black leading-tight tracking-[-0.05em] text-[var(--slot4-page-text)]">{service.title}</h3>
                <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">{service.body}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const items = safePosts(posts)
  const feature = items[0]
  const compact = items.slice(1, 5)

  return (
    <>
      <section className="bg-[var(--slot4-dark-bg)] text-white">
        <div className={`${dc.shell.section} grid gap-8 py-12 md:grid-cols-2 xl:grid-cols-4`}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="text-center">
              <p className="text-6xl font-black leading-none tracking-[-0.06em]">{formatMetric(index)}</p>
              <p className="mt-3 text-sm font-black uppercase tracking-[0.26em] text-[var(--slot4-accent-fill)]">{metricLabel(index)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="bg-[#f7faf5]">
        <div className={`${dc.shell.section} py-20`}>
          <div className="mx-auto max-w-4xl text-center">
            <p className={dc.type.eyebrow + ' text-[var(--slot4-accent-fill)]'}>Our methodology</p>
            <h2 className={dc.type.sectionTitle + ' mt-4'}>A proven framework for predictable discovery.</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: BookOpen, title: 'Discover & audit', body: 'We start by mapping the strongest content, categories, and visual opportunities already on the site.' },
              { icon: Sparkles, title: 'Shape the flow', body: 'Sections, cards, and reading paths are organized so people can move between formats naturally.' },
              { icon: Rocket, title: 'Launch the layout', body: 'The interface balances bold hero moments with compact scanning lanes and clean post detail pages.' },
              { icon: TrendingUp, title: 'Refine & scale', body: 'Related posts, archive filters, and reusable visual patterns keep discovery working as the library grows.' },
            ].map((step, index) => (
              <article key={step.title} className="text-center">
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-white shadow-[0_18px_44px_rgba(18,27,52,0.08)]">
                  <step.icon className="h-10 w-10 text-[var(--slot4-accent-fill)]" />
                  <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-sm font-black text-[var(--slot4-accent-fill)]">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-8 text-[1.9rem] font-black tracking-[-0.05em] text-[var(--slot4-page-text)]">{step.title}</h3>
                <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${dc.shell.section} py-20`}>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {feature ? <FeaturedStoryCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} /> : null}
            <div className="grid gap-5">
              {compact.map((post, index) => <CompactStoryCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = safePosts(timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts)
  const horizontal = items.slice(0, 3)
  const imageFirst = items.slice(3, 5)
  const listItems = items.slice(5, 9)

  return (
    <>
      <section id="results" className="bg-[#fbfdf9]">
        <div className={`${dc.shell.section} py-20`}>
          <div className="mx-auto max-w-4xl text-center">
            <p className={dc.type.eyebrow + ' text-[var(--slot4-accent-fill)]'}>Client success</p>
            <h2 className={dc.type.sectionTitle + ' mt-4'}>Trusted by readers who love keeping good pages close.</h2>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {horizontal.map((post, index) => (
              <article key={post.id || post.slug} className="rounded-[1.9rem] border border-[var(--slot4-line)] bg-[var(--slot4-surface-bg)] p-8 shadow-[0_18px_46px_rgba(18,27,52,0.06)]">
                <div className="flex items-center gap-1 text-[var(--slot4-accent-fill)]">
                  {Array.from({ length: 5 }).map((_, star) => <span key={star}>★</span>)}
                </div>
                <p className="mt-6 text-xl italic leading-9 text-[var(--slot4-page-text)]">"{featureCopy(post, 'This collection feels clean, focused, and easy to revisit.')}"</p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-sm font-black text-[var(--slot4-accent-fill)]">R{index + 1}</div>
                  <div>
                    <p className="font-black text-[var(--slot4-page-text)]">Reader note {String(index + 1).padStart(2, '0')}</p>
                    <p className="text-sm text-[var(--slot4-muted-text)]">Community highlight from {getEditableCategory(post)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${dc.shell.section} py-20`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={dc.type.eyebrow + ' text-[var(--slot4-accent-fill)]'}>Latest discoveries</p>
              <h2 className="mt-4 text-4xl font-black leading-[0.96] tracking-[-0.06em] text-[var(--slot4-page-text)]">Fresh layouts for fresh finds.</h2>
            </div>
            <Link href={primaryRoute} className={dc.button.secondary}>Browse all {taskLabel(primaryTask).toLowerCase()}</Link>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-6">
              {horizontal.map((post, index) => <HorizontalStoryCard key={`${post.id || post.slug}-h`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
            <div className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {imageFirst.map((post) => <ImageFirstCard key={`${post.id || post.slug}-i`} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
              </div>
              <div className="grid gap-4">
                {listItems.map((post, index) => <EditorialListCard key={`${post.id || post.slug}-l`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="contact-panel" className="bg-[#fbfefb]">
      <div className={`${dc.shell.section} py-20`}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-xl">
            <p className={dc.type.eyebrow + ' text-[var(--slot4-accent-fill)]'}>Get in touch</p>
            <h2 className={dc.type.sectionTitle + ' mt-4'}>Ready to scale your next collection? Let's talk.</h2>
            <p className="mt-6 text-lg leading-9 text-[var(--slot4-muted-text)]">
              Whether you are exploring a new content lane or polishing an existing archive, we are here to help make the experience clearer.
            </p>
            <div className="mt-10 rounded-[1.8rem] border border-[var(--slot4-line)] bg-white/82 p-6 shadow-[0_16px_44px_rgba(18,27,52,0.06)]">
              <div className="flex items-center gap-3 text-[var(--slot4-accent-fill)]">
                <Sparkles className="h-5 w-5" />
                <p className="text-sm font-black uppercase tracking-[0.22em]">Straightforward support</p>
              </div>
              <p className="mt-3 text-base leading-8 text-[var(--slot4-muted-text)]">
                Use the form to ask about posts, collections, listings, or publishing. Everything routes through one clean contact flow.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[var(--slot4-dark-bg)] p-6 shadow-[0_28px_80px_rgba(18,27,52,0.22)] sm:p-8">
            <div className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-[var(--slot4-accent-wash)]">
              <Send className="h-4 w-4" /> Send message
            </div>
            <EditableContactLeadForm />
          </div>
        </div>
      </div>
    </section>
  )
}
