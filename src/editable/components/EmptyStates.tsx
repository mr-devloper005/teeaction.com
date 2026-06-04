import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing is published here yet',
  description = 'Fresh posts will appear here automatically once this section has published content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded-[2rem] border border-[var(--slot4-line)] bg-white/80 p-10 text-center shadow-[0_18px_48px_rgba(18,27,52,0.06)]', className)}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent-fill)]">
        <SearchX className="h-7 w-7" />
      </div>
      <h2 className="mt-6 text-3xl font-black tracking-[-0.05em] text-[var(--slot4-page-text)]">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{description}</p>
      <Link href={actionHref} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(53,133,142,0.28)]">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} will appear here automatically as new content is added to the site.`}
      actionLabel="Explore the homepage"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been saved and routed through the contact workflow."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
