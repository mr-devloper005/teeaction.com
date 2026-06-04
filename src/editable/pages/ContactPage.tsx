'use client'

import { Send, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[var(--slot4-accent-fill)]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-6xl">{pagesContent.contact.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>

              <div className="mt-10 rounded-[1.8rem] border border-[var(--slot4-line)] bg-white/82 p-6 shadow-[0_16px_44px_rgba(18,27,52,0.06)]">
                <div className="flex items-center gap-3 text-[var(--slot4-accent-fill)]">
                  <Sparkles className="h-5 w-5" />
                  <p className="text-sm font-black uppercase tracking-[0.22em]">Fast routing</p>
                </div>
                <p className="mt-3 text-base leading-8 text-[var(--slot4-muted-text)]">Questions about posts, collections, listings, or publishing can all come through the same form. We keep the message flow simple.</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[var(--slot4-dark-bg)] p-6 shadow-[0_28px_80px_rgba(18,27,52,0.22)] sm:p-8">
              <div className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-[var(--slot4-accent-wash)]">
                <Send className="h-4 w-4" /> Send message
              </div>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
