'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, LogOut, Menu, PenSquare, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { globalContent } from '@/editable/content/global.content'

export function EditableNavbar() {
  const { session, logout } = useEditableLocalAuthSession()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      ...SITE_CONFIG.tasks.filter((t) => t.enabled).slice(0, 3).map((t) => ({ label: t.label, href: t.route })),
      { label: 'Contact', href: '/contact' },
    ],
    []
  )

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 bg-[#121b34]">
      <nav className="mx-auto flex h-[72px] max-w-[1280px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <img src="/favicon.png" alt={globalContent.site.name} className="h-9 w-9 object-contain" />
          <span className="text-lg font-black tracking-[-0.04em] text-white">{globalContent.site.name}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3.5 py-2 text-[13px] font-semibold transition ${isActive(item.href) ? 'bg-white/12 text-white' : 'text-white/65 hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <Link href="/search" className="rounded-lg p-2.5 text-white/50 transition hover:bg-white/8 hover:text-white" aria-label="Search">
            <Search className="h-4 w-4" />
          </Link>
          {session ? (
            <>
              <Link href="/create" className="inline-flex items-center gap-2 rounded-lg bg-[#35858E] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[#2d737b]">
                <PenSquare className="h-3.5 w-3.5" /> Create
              </Link>
              <button type="button" onClick={logout} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-white/60 transition hover:text-white">
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-white/60 transition hover:text-white">
                <LogIn className="h-3.5 w-3.5" /> Login
              </Link>
              <Link href="/signup" className="inline-flex items-center gap-1.5 rounded-lg bg-[#35858E] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[#2d737b]">
                <UserPlus className="h-3.5 w-3.5" /> Sign up
              </Link>
            </>
          )}
        </div>

        <button type="button" onClick={() => setOpen((v) => !v)} className="ml-auto rounded-lg border border-white/12 p-2 text-white/70 lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/8 bg-[#121b34] px-4 pb-5 pt-3 lg:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${isActive(item.href) ? 'bg-white/10 text-white' : 'text-white/65'}`}>
                {item.label}
              </Link>
            ))}
            <Link href="/search" onClick={() => setOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white/65">Search</Link>
          </div>
          <div className="mt-3 flex gap-2 border-t border-white/8 pt-3">
            {session ? (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="flex-1 rounded-lg bg-[#35858E] px-4 py-2.5 text-center text-sm font-bold text-white">Create</Link>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-lg border border-white/12 px-4 py-2.5 text-sm font-semibold text-white/65">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-white/12 px-4 py-2.5 text-center text-sm font-semibold text-white/65">Login</Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="flex-1 rounded-lg bg-[#35858E] px-4 py-2.5 text-center text-sm font-bold text-white">Sign up</Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
