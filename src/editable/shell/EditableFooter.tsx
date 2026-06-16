import Link from 'next/link'
import type { CSSProperties } from 'react'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const footerVars = {
    '--editable-footer-bg': 'var(--slot4-dark-bg)',
    '--editable-footer-text': 'var(--slot4-dark-text)',
  } as CSSProperties
  const year = new Date().getFullYear()

  return (
    <footer style={footerVars} className="mt-0 bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src="/favicon.png"
                alt={globalContent.site.name}
                className="h-14 w-auto max-w-[84px] object-contain"
              />
              <span className="flex flex-col">
                <span className="text-[2rem] font-black leading-none tracking-[-0.08em] text-white">
                  {globalContent.site.name}
                </span>
                
              </span>
            </Link>
            <p className="mt-6 max-w-md text-base leading-8 text-white/70">{globalContent.footer.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-black tracking-[-0.04em]">Company</h3>
            <div className="mt-6 grid gap-3">
              <Link href="/about" className="text-base font-bold text-white/68 transition hover:text-white">About</Link>
              <Link href="/contact" className="text-base font-bold text-white/68 transition hover:text-white">Contact</Link>
              <Link href="/search" className="text-base font-bold text-white/68 transition hover:text-white">Search</Link>
              <Link href="/login" className="text-base font-bold text-white/68 transition hover:text-white">Login</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm font-bold text-white/60">
          <p>© {year} {globalContent.site.name}. {globalContent.footer.bottomNote}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/login" className="hover:text-white">Login</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
