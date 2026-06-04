import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-dark-bg)] text-white">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1280px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1fr] lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur sm:p-8">
            <h1 className="text-3xl font-black tracking-[-0.05em]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-white/65">Already have an account? <Link href="/login" className="font-black text-white underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[var(--slot4-accent-wash)]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-lg leading-9 text-white/72">{pagesContent.auth.signup.description}</p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-[var(--slot4-accent-wash)]">
              Start publishing <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
