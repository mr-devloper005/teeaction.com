'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function EditableContactLeadForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data?.message || 'Unable to send your message.')
      setStatus('success')
      setMessage(data?.message || 'Thanks. Your message has been received.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your message.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.8rem] bg-[var(--slot4-dark-bg)] text-white">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" label="Full Name" placeholder="John Doe" required />
        <Field name="email" type="email" label="Email Address" placeholder="john@company.com" required />
      </div>
      <div className="mt-4">
        <Field name="subject" label="Service Interested In" placeholder="Search Engine Optimization" />
      </div>
      <label className="mt-4 grid gap-2 text-sm font-black text-white/88">
        Message
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us about your project..."
          className="rounded-[1.2rem] border border-white/12 bg-white/8 px-4 py-4 text-base font-medium text-white outline-none transition placeholder:text-white/45 focus:border-[var(--slot4-accent-fill)] focus:bg-white/10"
        />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {message ? (
        <div className={`mt-5 flex items-start gap-3 rounded-[1.2rem] px-4 py-3 text-sm font-bold ${status === 'success' ? 'bg-emerald-500/12 text-emerald-100' : 'bg-red-500/12 text-red-100'}`}>
          {status === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
          <span>{message}</span>
        </div>
      ) : null}
      <button type="submit" disabled={status === 'submitting'} className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-[1rem] bg-[var(--slot4-accent-fill)] px-6 text-base font-black text-white shadow-[0_16px_36px_rgba(53,133,142,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
        {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send Message
      </button>
    </form>
  )
}

function Field({ name, label, type = 'text', placeholder, required = false }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-black text-white/88">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-14 rounded-[1rem] border border-white/12 bg-white/8 px-4 text-base font-medium text-white outline-none transition placeholder:text-white/45 focus:border-[var(--slot4-accent-fill)] focus:bg-white/10"
      />
    </label>
  )
}
