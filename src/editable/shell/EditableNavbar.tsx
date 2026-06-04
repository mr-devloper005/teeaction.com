'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { LogIn, Menu, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'

export function EditableNavbar() {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const [open, setOpen] = useState(false)
  const navVars = {
    '--editable-nav-bg': preset.colors.background,
    '--editable-nav-text': preset.colors.foreground,
    '--editable-nav-active': preset.colors.accent,
    '--editable-nav-active-text': '#ffffff',
    '--editable-border': 'var(--slot4-line)',
    '--editable-container': '1280px',
  } as CSSProperties

  const taskLinks = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).slice(0, 3).map((task) => ({ label: task.label, href: task.route })),
    []
  )
  const sectionLinks: Array<{ label: string; href: string }> = [...globalContent.nav.sectionLinks]

  const primaryNav = [
    ...sectionLinks,
    ...taskLinks.filter((item) => !sectionLinks.some((link) => link.href === item.href)),
  ].slice(0, 5)

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-white/95 text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[88px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3">
          <img
            src="/favicon.png"
            alt={globalContent.site.name}
            className="h-12 w-auto max-w-[72px] object-contain sm:h-14 sm:max-w-[84px]"
          />
          <span className="min-w-0 flex flex-col">
            <span className="block truncate text-xl font-black leading-none tracking-[-0.06em] text-[var(--slot4-page-text)] sm:text-2xl">
              {globalContent.site.name}
            </span>
            {globalContent.nav.tagline ? (
              <span className="hidden truncate text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-muted-text)] md:block">
                {globalContent.nav.tagline}
              </span>
            ) : null}
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent-fill)]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <Link href="/login" className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-black hover:text-[var(--slot4-accent-fill)]">
            <LogIn className="h-4 w-4" /> Login
          </Link>
          <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(53,133,142,0.28)]">
            <UserPlus className="h-4 w-4" /> Get Started
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-[var(--editable-border)] bg-white p-2.5 lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...primaryNav, { label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }].map((item) => (
              <Link key={`${item.href}-${item.label}`} href={item.href} onClick={() => setOpen(false)} className="rounded-[1.25rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
