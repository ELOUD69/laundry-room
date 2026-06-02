'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import AnimatedSection from './AnimatedSection'

// ─── Validation schema ────────────────────────────────────────────────────────
const schema = z.object({
  name:            z.string().min(2, 'Please enter your full name'),
  phone:           z.string().min(7, 'Please enter a valid phone number'),
  date:            z.string().min(1, 'Please select a date'),
  partySize:       z.string().min(1, 'Please select your party size'),
  tablePreference: z.string().min(1, 'Please select a preference'),
  notes:           z.string().optional(),
})

type FormValues = z.infer<typeof schema>

// ─── Feature bullets ──────────────────────────────────────────────────────────
const PERKS = [
  'Priority entry — skip the queue',
  'Dedicated VIP host all night',
  'Premium bottle & cocktail selection',
  'Personalised table setup',
  'Reserved section with dance-floor access',
]

// ─── Field component helpers ──────────────────────────────────────────────────
const inputClass =
  'w-full bg-kai-card border border-kai-gold/15 focus:border-kai-gold/50 px-4 py-3 text-kai-white placeholder-kai-white/20 outline-none transition-colors duration-300 text-sm'

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-red-400/90 text-xs mt-1">{msg}</p>
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] tracking-[0.25em] uppercase text-kai-white/40 mb-2">
      {children}
    </label>
  )
}

// ─── Success state ────────────────────────────────────────────────────────────
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <section id="vip" className="py-24 lg:py-32 bg-kai-dark">
      <div className="max-w-xl mx-auto px-5 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-kai-gold mb-8">
          <svg className="w-8 h-8 text-kai-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-4xl font-bold text-kai-white mb-4">
          Request Received
        </h2>
        <p className="text-kai-white/55 leading-relaxed mb-2">
          Thank you for your VIP table request.
        </p>
        <p className="text-kai-white/55 leading-relaxed mb-8">
          Our concierge team will reach out within 24 hours to confirm your reservation.
        </p>
        <a href="tel:+971543088649" className="inline-block text-kai-gold font-display text-xl hover:text-kai-gold-light transition-colors mb-10">
          +971 54 308 8649
        </a>
        <div>
          <button
            onClick={onReset}
            className="px-8 py-3 border border-kai-gold/30 text-kai-gold/50 text-xs tracking-[0.2em] uppercase hover:border-kai-gold hover:text-kai-gold transition-all duration-300"
          >
            Make Another Request
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function VIPBooking() {
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

    // ── TODO: plug in real booking / notification service ─────────────────────
    // Option A — email via Resend / SendGrid:
    //   await fetch('/api/booking', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   })
    //
    // Option B — WhatsApp notification via Twilio:
    //   await fetch('/api/booking-whatsapp', { method: 'POST', body: ... })
    //
    // Option C — write to a Google Sheet / Airtable row via their API.
    // ─────────────────────────────────────────────────────────────────────────

    console.log('VIP booking request:', data)
    await new Promise((r) => setTimeout(r, 1400)) // simulate network
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessState onReset={() => { setSubmitted(false); reset() }} />
  }

  return (
    <section id="vip" className="py-24 lg:py-32 bg-kai-dark">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* ── Left: pitch ────────────────────────────────────────────────── */}
          <AnimatedSection direction="left">
            <p className="text-kai-gold text-xs tracking-[0.4em] uppercase mb-4">Exclusive</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-kai-white leading-tight mb-5">
              VIP Table &amp;<br />Bottle Service
            </h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-kai-gold/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-kai-gold" />
            </div>

            <p className="text-kai-white/55 leading-relaxed mb-8">
              Elevate your night with a private VIP table. Our concierge team curates a
              bespoke experience — from premium bottle selection to dedicated service,
              every detail is tailored to you.
            </p>

            <ul className="space-y-3 mb-10">
              {PERKS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1 h-1 flex-shrink-0 bg-kai-gold rounded-full" />
                  <span className="text-kai-white/65 text-sm">{p}</span>
                </li>
              ))}
            </ul>

            {/* Contact card */}
            <div className="p-6 border border-kai-gold/15">
              <p className="text-kai-white/35 text-[10px] tracking-[0.25em] uppercase mb-2">
                Immediate enquiries
              </p>
              <a
                href="tel:+971543088649"
                className="font-display text-2xl text-kai-gold hover:text-kai-gold-light transition-colors"
              >
                +971 54 308 8649
              </a>
            </div>
          </AnimatedSection>

          {/* ── Right: form ────────────────────────────────────────────────── */}
          <AnimatedSection delay={150} direction="right">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

              {/* Name */}
              <div>
                <Label>Full Name *</Label>
                <input {...register('name')} type="text" placeholder="Your full name" className={inputClass} />
                <FieldError msg={errors.name?.message} />
              </div>

              {/* Phone */}
              <div>
                <Label>Phone Number *</Label>
                <input {...register('phone')} type="tel" placeholder="+971 XX XXX XXXX" className={inputClass} />
                <FieldError msg={errors.phone?.message} />
              </div>

              {/* Date + Party size */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date *</Label>
                  <input
                    {...register('date')}
                    type="date"
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                  <FieldError msg={errors.date?.message} />
                </div>
                <div>
                  <Label>Party Size *</Label>
                  <select {...register('partySize')} className={`${inputClass} cursor-pointer`}>
                    <option value="">Select</option>
                    <option value="1-5">1 – 5 guests</option>
                    <option value="6-10">6 – 10 guests</option>
                    <option value="11-20">11 – 20 guests</option>
                    <option value="20+">20 + guests</option>
                  </select>
                  <FieldError msg={errors.partySize?.message} />
                </div>
              </div>

              {/* Table preference */}
              <div>
                <Label>Table / Area Preference *</Label>
                <select {...register('tablePreference')} className={`${inputClass} cursor-pointer`}>
                  <option value="">Select a preference</option>
                  <option value="vip-booth">VIP Booth (Stage View)</option>
                  <option value="main-floor">Main Floor</option>
                  <option value="bar-area">Bar Area</option>
                  <option value="terrace">Terrace</option>
                  <option value="no-preference">No Preference</option>
                </select>
                <FieldError msg={errors.tablePreference?.message} />
              </div>

              {/* Notes */}
              <div>
                <Label>Special Requests</Label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  placeholder="Allergies, celebrations, bottle preferences…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-kai-gold text-kai-black font-semibold text-xs tracking-[0.25em] uppercase hover:bg-kai-gold-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending…' : 'Reserve My Table'}
              </button>

              <p className="text-kai-white/25 text-xs text-center">
                Our team will contact you within 24 hours to confirm.
              </p>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
