'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const enabledTasks = SITE_CONFIG.tasks.filter((t) => t.enabled)

  return (
    <footer className="bg-[#121b34] text-white/85">
      <div className="mx-auto max-w-[1280px] px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <img src="/favicon.png" alt={globalContent.site.name} className="h-9 w-9 object-contain" />
              <span className="text-lg font-black tracking-[-0.04em] text-white">{globalContent.site.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">{globalContent.footer.description}</p>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Browse</h3>
            <div className="mt-4 grid gap-2.5">
              {enabledTasks.map((task) => (
                <Link key={task.key} href={task.route} className="group inline-flex items-center gap-1 text-sm font-medium text-white/60 transition hover:text-[#7DA78C]">
                  {task.label} <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
              <Link href="/search" className="group inline-flex items-center gap-1 text-sm font-medium text-white/60 transition hover:text-[#7DA78C]">
                Search <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Company</h3>
            <div className="mt-4 grid gap-2.5">
              <Link href="/about" className="text-sm font-medium text-white/60 transition hover:text-[#7DA78C]">About</Link>
              <Link href="/contact" className="text-sm font-medium text-white/60 transition hover:text-[#7DA78C]">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Account</h3>
            <div className="mt-4 grid gap-2.5">
              {session ? (
                <>
                  <Link href="/create" className="text-sm font-medium text-white/60 transition hover:text-[#7DA78C]">Create post</Link>
                  <button type="button" onClick={logout} className="text-left text-sm font-medium text-white/60 transition hover:text-[#7DA78C]">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-white/60 transition hover:text-[#7DA78C]">Login</Link>
                  <Link href="/signup" className="text-sm font-medium text-white/60 transition hover:text-[#7DA78C]">Create account</Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/8 py-6 text-xs text-white/35 sm:flex-row">
          <p>&copy; {year} {globalContent.site.name}</p>
          <p>{globalContent.footer.bottomNote}</p>
        </div>
      </div>
    </footer>
  )
}
