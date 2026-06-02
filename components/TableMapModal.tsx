'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// ── Types ─────────────────────────────────────────────────────────────────────
type TableStatus = 'available' | 'reserved'
type TableArea   = 'VIP Booth' | 'Main Floor' | 'Bar Area' | 'Terrace'

interface TableDef {
  id: string
  area: TableArea
  label: string
  short: string
  cx: number
  cy: number
  r: number
  capacity: string
  minSpend: string
  status: TableStatus
}

// ── Floor-plan table positions  (SVG viewBox 0 0 700 500) ────────────────────
const TABLES: TableDef[] = [
  // VIP Booths — ring closest to the DJ stage
  { id: 'vip1', area: 'VIP Booth',  label: 'VIP Booth 1', short: 'VIP 1', cx: 100, cy: 100, r: 28, capacity: '2 – 8', minSpend: 'AED 3,000', status: 'available' },
  { id: 'vip2', area: 'VIP Booth',  label: 'VIP Booth 2', short: 'VIP 2', cx: 195, cy: 100, r: 28, capacity: '2 – 6', minSpend: 'AED 2,500', status: 'available' },
  { id: 'vip3', area: 'VIP Booth',  label: 'VIP Booth 3', short: 'VIP 3', cx: 505, cy: 100, r: 28, capacity: '2 – 6', minSpend: 'AED 2,500', status: 'reserved'  },
  { id: 'vip4', area: 'VIP Booth',  label: 'VIP Booth 4', short: 'VIP 4', cx: 600, cy: 100, r: 28, capacity: '2 – 8', minSpend: 'AED 3,000', status: 'available' },
  // Main Floor tables — flanking the dance floor
  { id: 't1',   area: 'Main Floor', label: 'Table 1', short: 'T1', cx: 155, cy: 295, r: 22, capacity: '2 – 4', minSpend: 'AED 1,000', status: 'available' },
  { id: 't2',   area: 'Main Floor', label: 'Table 2', short: 'T2', cx: 245, cy: 332, r: 22, capacity: '2 – 4', minSpend: 'AED 1,000', status: 'available' },
  { id: 't3',   area: 'Main Floor', label: 'Table 3', short: 'T3', cx: 350, cy: 332, r: 22, capacity: '2 – 4', minSpend: 'AED 1,000', status: 'reserved'  },
  { id: 't4',   area: 'Main Floor', label: 'Table 4', short: 'T4', cx: 455, cy: 295, r: 22, capacity: '2 – 4', minSpend: 'AED 1,000', status: 'available' },
  { id: 't5',   area: 'Main Floor', label: 'Table 5', short: 'T5', cx: 190, cy: 408, r: 22, capacity: '2 – 4', minSpend: 'AED 800',   status: 'available' },
  { id: 't6',   area: 'Main Floor', label: 'Table 6', short: 'T6', cx: 415, cy: 408, r: 22, capacity: '2 – 4', minSpend: 'AED 800',   status: 'available' },
  // Bar stools
  { id: 'b1',   area: 'Bar Area',   label: 'Bar 1',   short: 'B1',  cx:  68, cy: 375, r: 18, capacity: '1 – 3', minSpend: 'AED 500',   status: 'available' },
  { id: 'b2',   area: 'Bar Area',   label: 'Bar 2',   short: 'B2',  cx:  68, cy: 430, r: 18, capacity: '1 – 3', minSpend: 'AED 500',   status: 'available' },
  // Terrace
  { id: 'ter1', area: 'Terrace',    label: 'Terrace 1', short: 'Ter 1', cx: 552, cy: 370, r: 22, capacity: '2 – 6', minSpend: 'AED 1,500', status: 'available' },
  { id: 'ter2', area: 'Terrace',    label: 'Terrace 2', short: 'Ter 2', cx: 620, cy: 430, r: 22, capacity: '2 – 6', minSpend: 'AED 1,500', status: 'reserved'  },
]

// ── Booking form schema ───────────────────────────────────────────────────────
const schema = z.object({
  name:      z.string().min(2, 'Enter your full name'),
  phone:     z.string().min(7, 'Enter a valid phone number'),
  date:      z.string().min(1, 'Select a date'),
  partySize: z.string().min(1, 'Select party size'),
  notes:     z.string().optional(),
})
type FormValues = z.infer<typeof schema>

const inputCls =
  'w-full bg-kai-card border border-kai-gold/15 focus:border-kai-gold/50 px-4 py-3 text-kai-white placeholder-kai-white/20 outline-none transition-colors text-sm'

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  isOpen: boolean
  onClose: () => void
  event: { title: string; date: string; artist: string } | null
}

// ─────────────────────────────────────────────────────────────────────────────
export default function TableMapModal({ isOpen, onClose, event }: Props) {
  const [selected, setSelected] = useState<TableDef | null>(null)
  const [step,     setStep]     = useState<'map' | 'form' | 'success'>('map')
  const [loading,  setLoading]  = useState(false)

  useEffect(() => {
    if (isOpen) { setSelected(null); setStep('map') }
  }, [isOpen])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    // TODO: connect booking API / email / CRM here
    console.log('Table booking:', { table: selected?.label, event: event?.title, ...data })
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setStep('success')
    reset()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Modal sheet */}
      <div
        className="relative z-10 w-full sm:max-w-2xl bg-kai-dark border border-kai-gold/20 max-h-[95dvh] overflow-y-auto"
        style={{ boxShadow: '0 -8px 60px rgba(201,168,76,0.08)' }}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-kai-dark border-b border-kai-gold/10">
          <div>
            {event && (
              <p className="text-kai-gold text-[10px] tracking-[0.3em] uppercase mb-0.5">
                {event.title}
              </p>
            )}
            <h3 className="font-display text-lg sm:text-xl font-bold text-kai-white leading-tight">
              {step === 'map'     ? 'Choose Your Table'    :
               step === 'form'    ? 'Complete Booking'     :
                                    'Booking Confirmed'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center text-kai-white/40 hover:text-kai-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* ══ STEP 1: FLOOR MAP ════════════════════════════════════════════ */}
        {step === 'map' && (
          <div className="p-4 sm:p-6">

            {/* Legend */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 mb-4">
              {[
                { color: 'border border-kai-gold bg-transparent', label: 'Available' },
                { color: 'bg-kai-gold',                            label: 'Selected'  },
                { color: 'bg-white/10',                            label: 'Reserved'  },
              ].map(l => (
                <span key={l.label} className="flex items-center gap-1.5 text-[11px] text-kai-white/45">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${l.color}`} />
                  {l.label}
                </span>
              ))}
            </div>

            {/* SVG floor plan */}
            <div className="w-full overflow-x-auto -mx-1 px-1">
              <svg
                viewBox="0 0 700 500"
                className="w-full min-w-[300px]"
                style={{ maxHeight: '370px', touchAction: 'manipulation' }}
                aria-label="Club floor plan — tap a table to select it"
              >
                {/* ── Background ── */}
                <defs>
                  <radialGradient id="ambientGlow" cx="50%" cy="15%" r="50%">
                    <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.07"/>
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <rect width="700" height="500" fill="#050508" rx="6"/>
                <rect width="700" height="500" fill="url(#ambientGlow)"/>

                {/* ── DJ Booth / Stage ── */}
                <rect x="262" y="14" width="176" height="52" rx="4"
                  fill="#12100A" stroke="#C9A84C" strokeWidth="1.2"/>
                <text x="350" y="36" textAnchor="middle" fill="#C9A84C"
                  fontSize="9" letterSpacing="5" fontFamily="Georgia,serif" fontWeight="bold">DJ BOOTH</text>
                <text x="350" y="52" textAnchor="middle" fill="#C9A84C"
                  fontSize="7" letterSpacing="3" fontFamily="Georgia,serif" opacity="0.55">STAGE</text>

                {/* Stage connector lines to VIP */}
                <line x1="262" y1="40" x2="228" y2="100" stroke="#C9A84C" strokeWidth="0.4" opacity="0.2"/>
                <line x1="438" y1="40" x2="472" y2="100" stroke="#C9A84C" strokeWidth="0.4" opacity="0.2"/>

                {/* ── Dance Floor ── */}
                <rect x="232" y="148" width="236" height="148" rx="4"
                  fill="#07070D" stroke="#C9A84C" strokeWidth="0.6" strokeDasharray="7 5" opacity="0.45"/>
                <text x="350" y="225" textAnchor="middle" fill="#C9A84C"
                  fontSize="9" letterSpacing="4" fontFamily="Georgia,serif" opacity="0.45">DANCE FLOOR</text>

                {/* ── Bar zone ── */}
                <rect x="28" y="348" width="82" height="120" rx="3"
                  fill="#07070D" stroke="#C9A84C" strokeWidth="0.4" strokeDasharray="4 3" opacity="0.3"/>
                <text x="69" y="364" textAnchor="middle" fill="#C9A84C"
                  fontSize="7" letterSpacing="2" fontFamily="Georgia,serif" opacity="0.4">BAR</text>

                {/* ── Terrace zone ── */}
                <rect x="515" y="340" width="155" height="130" rx="3"
                  fill="#07070D" stroke="#C9A84C" strokeWidth="0.4" strokeDasharray="4 3" opacity="0.3"/>
                <text x="592" y="356" textAnchor="middle" fill="#C9A84C"
                  fontSize="7" letterSpacing="2" fontFamily="Georgia,serif" opacity="0.4">TERRACE</text>

                {/* ── Entrance ── */}
                <line x1="300" y1="486" x2="400" y2="486" stroke="#C9A84C" strokeWidth="0.5" opacity="0.25"/>
                <text x="350" y="496" textAnchor="middle" fill="#C9A84C"
                  fontSize="7" letterSpacing="3" fontFamily="Georgia,serif" opacity="0.3">ENTRANCE</text>

                {/* ── Tables ── */}
                {TABLES.map(t => {
                  const isReserved = t.status === 'reserved'
                  const isSelected = selected?.id === t.id
                  const isVip      = t.area === 'VIP Booth'

                  return (
                    <g
                      key={t.id}
                      onClick={() => !isReserved && setSelected(t)}
                      role="button"
                      aria-label={`${t.label} — ${isReserved ? 'Reserved' : 'Available'}`}
                      style={{ cursor: isReserved ? 'not-allowed' : 'pointer' }}
                    >
                      {/* Invisible larger tap target for mobile */}
                      <circle cx={t.cx} cy={t.cy} r={t.r + 10} fill="transparent"/>

                      {/* Outer glow ring when selected */}
                      {isSelected && (
                        <circle cx={t.cx} cy={t.cy} r={t.r + 9}
                          fill="#C9A84C" opacity="0.14" filter="url(#glow)"/>
                      )}

                      {/* Table body */}
                      <circle
                        cx={t.cx} cy={t.cy} r={t.r}
                        fill={isSelected ? '#C9A84C' : isReserved ? '#111' : '#0e0e16'}
                        stroke={isSelected ? '#E8C97A' : isReserved ? '#2a2a2a' : '#C9A84C'}
                        strokeWidth={isVip ? 1.5 : 1}
                        opacity={isReserved ? 0.35 : 1}
                        style={{ transition: 'fill 0.2s, stroke 0.2s' }}
                      />

                      {/* Short label */}
                      <text
                        x={t.cx} y={t.cy + 1}
                        textAnchor="middle" dominantBaseline="middle"
                        fill={isSelected ? '#050508' : isReserved ? '#444' : '#C9A84C'}
                        fontSize={t.r > 24 ? 8 : 7}
                        fontWeight="bold"
                        fontFamily="Georgia,serif"
                        letterSpacing="0.5"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {t.short}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Selected table details / prompt */}
            {selected ? (
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-kai-gold/35 bg-kai-card">
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg font-bold text-kai-gold leading-tight">{selected.label}</p>
                  <p className="text-kai-white/45 text-xs mb-2">{selected.area}</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-kai-white/30">Capacity</p>
                      <p className="text-kai-white text-sm font-medium">{selected.capacity} guests</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-kai-white/30">Min. Spend</p>
                      <p className="text-kai-white text-sm font-medium">{selected.minSpend}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep('form')}
                  className="w-full sm:w-auto flex-shrink-0 px-6 py-3 bg-kai-gold text-kai-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-kai-gold-light transition-colors"
                >
                  Book This Table →
                </button>
              </div>
            ) : (
              <p className="mt-4 text-center text-kai-white/30 text-sm py-3">
                Tap any available table on the map
              </p>
            )}
          </div>
        )}

        {/* ══ STEP 2: BOOKING FORM ════════════════════════════════════════ */}
        {step === 'form' && selected && (
          <div className="p-5 sm:p-6">
            {/* Back + table badge */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <button
                onClick={() => setStep('map')}
                className="text-kai-white/40 hover:text-kai-gold transition-colors text-sm"
              >
                ← Change table
              </button>
              <div className="h-4 w-px bg-kai-gold/20" />
              <span className="px-3 py-1 bg-kai-card border border-kai-gold/30 text-kai-gold text-xs tracking-widest uppercase">
                {selected.label} &nbsp;·&nbsp; {selected.minSpend} min
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-kai-white/40 mb-2">Full Name *</label>
                <input {...register('name')} type="text" placeholder="Your full name" className={inputCls}/>
                {errors.name && <p className="text-red-400/80 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-kai-white/40 mb-2">Phone *</label>
                <input {...register('phone')} type="tel" placeholder="+971 XX XXX XXXX" className={inputCls}/>
                {errors.phone && <p className="text-red-400/80 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-kai-white/40 mb-2">Date *</label>
                  <input {...register('date')} type="date" className={`${inputCls} [color-scheme:dark]`}/>
                  {errors.date && <p className="text-red-400/80 text-xs mt-1">{errors.date.message}</p>}
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-kai-white/40 mb-2">Guests *</label>
                  <select {...register('partySize')} className={`${inputCls} cursor-pointer`}>
                    <option value="">Select</option>
                    <option value="1-5">1 – 5</option>
                    <option value="6-10">6 – 10</option>
                    <option value="11-20">11 – 20</option>
                    <option value="20+">20+</option>
                  </select>
                  {errors.partySize && <p className="text-red-400/80 text-xs mt-1">{errors.partySize.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.25em] uppercase text-kai-white/40 mb-2">Special Requests</label>
                <textarea {...register('notes')} rows={2}
                  placeholder="Bottle preferences, celebrations, allergies…"
                  className={`${inputCls} resize-none`}/>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 bg-kai-gold text-kai-black font-semibold text-xs tracking-[0.25em] uppercase hover:bg-kai-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Sending…' : 'Confirm Reservation'}
              </button>
              <p className="text-kai-white/20 text-xs text-center">
                Our team will confirm within 24 hours.
              </p>
            </form>
          </div>
        )}

        {/* ══ STEP 3: SUCCESS ═════════════════════════════════════════════ */}
        {step === 'success' && (
          <div className="p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-kai-gold mb-6">
              <svg className="w-7 h-7 text-kai-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-kai-white mb-2">You&apos;re All Set!</h3>
            <p className="text-kai-gold font-medium mb-1">{selected?.label}</p>
            <p className="text-kai-white/40 text-sm mb-8 leading-relaxed">
              Request received. Our concierge will reach out within 24 hours to confirm your table.
            </p>
            <a href="tel:+971543088649"
              className="block text-kai-gold font-display text-xl hover:text-kai-gold-light transition-colors mb-8">
              +971 54 308 8649
            </a>
            <button onClick={onClose}
              className="px-8 py-3 border border-kai-gold/30 text-kai-gold/60 text-xs tracking-widest uppercase hover:border-kai-gold hover:text-kai-gold transition-all">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
