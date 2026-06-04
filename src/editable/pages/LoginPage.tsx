import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1280px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[var(--slot4-accent-fill)]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 max-w-xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-lg text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.auth.login.description}</p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--slot4-line)] bg-white px-4 py-2 text-sm font-black">
              Premium access enabled <ArrowRight className="h-4 w-4 text-[var(--slot4-accent-fill)]" />
            </div>
          </div>
          <div className="rounded-[2rem] border border-[var(--slot4-line)] bg-white p-6 shadow-[0_24px_70px_rgba(18,27,52,0.10)] sm:p-8">
            <h2 className="text-2xl font-black tracking-[-0.04em]">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-black text-[var(--slot4-page-text)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
