import Link from 'next/link'
import { ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const aboutSignals = [
  { value: '01', label: 'Clear discovery paths' },
  { value: '02', label: 'Cleaner reading rhythm' },
  { value: '03', label: 'Stronger public presence' },
]

const aboutPillars = [
  { icon: Compass, title: 'Discovery first', body: 'Navigation, homepage sections, and archive flows are built to encourage better browsing decisions.' },
  { icon: Sparkles, title: 'Premium presentation', body: 'The interface leans on stronger contrast, cleaner cards, and more intentional spacing across every route.' },
  { icon: ShieldCheck, title: 'Reliable structure', body: 'Content still comes from the existing routes and data, only the presentation has been elevated.' },
]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fcfefd_0%,#f3f8f2_100%)]">
          <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-[var(--slot4-accent-soft)]/55 blur-3xl" />
          <div className="absolute right-[-5rem] top-0 h-96 w-96 rounded-full bg-[var(--slot4-accent-wash)]/30 blur-3xl" />
          <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[var(--slot4-accent-fill)]">{pagesContent.about.badge}</p>
                <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-6xl lg:text-7xl">{pagesContent.about.title}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/search" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(53,133,142,0.28)]">
                    Explore the archive <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="rounded-full border border-[var(--slot4-line)] bg-white px-6 py-3 text-sm font-black shadow-sm">
                    Contact us
                  </Link>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {aboutSignals.map((signal) => (
                    <div key={signal.label} className="rounded-[1.6rem] border border-[var(--slot4-line)] bg-white/82 p-5 shadow-[0_14px_38px_rgba(18,27,52,0.06)] backdrop-blur">
                      <p className="text-3xl font-black tracking-[-0.06em] text-[var(--slot4-page-text)]">{signal.value}</p>
                      <p className="mt-2 text-sm font-bold leading-6 text-[var(--slot4-muted-text)]">{signal.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 lg:pt-6">
                <div className="rounded-[2rem] border border-[var(--slot4-line)] bg-[var(--slot4-dark-bg)] p-7 text-white shadow-[0_26px_80px_rgba(18,27,52,0.20)]">
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-wash)]">What this page stands for</p>
                  <p className="mt-5 text-2xl font-black leading-tight tracking-[-0.05em]">
                    {SITE_CONFIG.name} is designed to feel curated, confident, and easier to browse from the first screen to the last detail page.
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {aboutPillars.slice(0, 2).map((item) => (
                    <article key={item.title} className="rounded-[1.8rem] border border-[var(--slot4-line)] bg-white p-6 shadow-[0_18px_48px_rgba(18,27,52,0.08)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent-fill)]">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h2 className="mt-5 text-2xl font-black tracking-[-0.05em]">{item.title}</h2>
                      <p className="mt-3 text-base leading-8 text-[var(--slot4-muted-text)]">{item.body}</p>
                    </article>
                  ))}
                </div>
                <article className="rounded-[1.8rem] border border-[var(--slot4-line)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_16px_40px_rgba(18,27,52,0.06)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent-fill)]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-2xl font-black tracking-[-0.05em]">{aboutPillars[2].title}</h2>
                  <p className="mt-3 text-base leading-8 text-[var(--slot4-muted-text)]">{aboutPillars[2].body}</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="rounded-[2rem] border border-[var(--slot4-line)] bg-white p-8 shadow-[0_18px_54px_rgba(18,27,52,0.08)] lg:p-12">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--slot4-accent-fill)]">Why it feels different</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.06em]">The redesign focuses on flow, not noise.</h2>
              <div className="mt-8 space-y-5 text-base leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>

            <aside className="grid gap-4">
              {pagesContent.about.values.map((value, index) => (
                <div key={value.title} className={`rounded-[1.8rem] border border-[var(--slot4-line)] p-6 shadow-[0_16px_40px_rgba(18,27,52,0.06)] ${index === 1 ? 'bg-[var(--slot4-dark-bg)] text-white' : 'bg-[var(--slot4-surface-bg)]'}`}>
                  <p className={`text-[11px] font-black uppercase tracking-[0.28em] ${index === 1 ? 'text-[var(--slot4-accent-wash)]' : 'text-[var(--slot4-accent-fill)]'}`}>Core value</p>
                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">{value.title}</h2>
                  <p className={`mt-3 text-base leading-8 ${index === 1 ? 'text-white/72' : 'text-[var(--slot4-muted-text)]'}`}>{value.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
