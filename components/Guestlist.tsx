'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import AnimatedSection from './AnimatedSection'
import eventsData from '@/data/events.json'

const schema = z.object({
  name:      z.string().min(2, 'Please enter your name'),
  email:     z.string().email('Please enter a valid email'),
  eventDate: z.string().min(1, 'Please select an event'),
})

type FormValues = z.infer<typeof schema>

const inputClass =
  'w-full bg-kai-card border border-kai-gold/15 focus:border-kai-gold/50 px-4 py-3 text-kai-white placeholder-kai-white/20 outline-none transition-colors duration-300 text-sm'

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-red-400/90 text-xs mt-1">{msg}</p>
}

export default function Guestlist() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormValues) => {
    setLoading(true)

    // ── TODO: plug in real lead-capture service ───────────────────────────────
    // Option A — email via Resend / Mailchimp:
    //   await fetch('/api/guestlist', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   })
    //
    // Option B — write directly to a Mailchimp list / HubSpot contact.
    // ─────────────────────────────────────────────────────────────────────────

    console.log('Guestlist sign-up:', data)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      id="guestlist"
      className="relative py-24 lg:py-32 bg-kai-black overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 ambient-glow pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <AnimatedSection>
          <p className="text-kai-gold text-xs tracking-[0.4em] uppercase mb-4">Free Entry</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-kai-white mb-5">
            Join the Guestlist
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-kai-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-kai-gold" />
            <div className="h-px w-12 bg-kai-gold/30" />
          </div>
          <p className="text-kai-white/50 leading-relaxed mb-10">
            Secure complimentary entry for you and your friends. Guestlist spots are
            limited — sign up early and arrive before midnight.
          </p>
        </AnimatedSection>

        {submitted ? (
          <AnimatedSection>
            <div className="glass-card border border-kai-gold/20 p-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-kai-gold mb-6">
                <svg className="w-6 h-6 text-kai-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-kai-white mb-3">
                You&apos;re on the list!
              </h3>
              <p className="text-kai-white/50 text-sm mb-6">
                Check your inbox — we&apos;ll confirm your spot before the event.
              </p>
              <button
                onClick={() => { setSubmitted(false); reset() }}
                className="text-kai-gold/60 text-xs tracking-[0.2em] uppercase hover:text-kai-gold transition-colors"
              >
                Sign up for another night →
              </button>
            </div>
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={100}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="glass-card border border-kai-gold/15 p-8 text-left space-y-5"
            >
              {/* Name */}
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-kai-white/40 mb-2">
                  Full Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Your full name"
                  className={inputClass}
                />
                <FieldError msg={errors.name?.message} />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-kai-white/40 mb-2">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="your@email.com"
                  className={inputClass}
                />
                <FieldError msg={errors.email?.message} />
              </div>

              {/* Event date select */}
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-kai-white/40 mb-2">
                  Select Night *
                </label>
                <select {...register('eventDate')} className={`${inputClass} cursor-pointer`}>
                  <option value="">Choose an event</option>
                  {eventsData.map((e) => (
                    <option key={e.id} value={e.date}>
                      {e.title} — {e.day}, {e.date}
                    </option>
                  ))}
                </select>
                <FieldError msg={errors.eventDate?.message} />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-kai-gold text-kai-black font-semibold text-xs tracking-[0.25em] uppercase hover:bg-kai-gold-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding you…' : 'Join the Guestlist'}
              </button>

              <p className="text-kai-white/20 text-xs text-center">
                By joining you agree to receive event updates. Unsubscribe anytime.
              </p>
            </form>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}
