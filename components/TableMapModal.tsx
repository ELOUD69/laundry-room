'use client'

import { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// ── Types ─────────────────────────────────────────────────────────────────────
type TableStatus = 'available' | 'reserved'
type TableArea   = 'Stage Left' | 'Stage Right' | 'Front Stage' | 'Left' | 'Right'

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

// ── Generate all 64 tables programmatically ───────────────────────────────────
//
// Layout (SVG viewBox 0 0 1010 655):
//
//   [SL4][SL3][SL2][SL1]  ██ STAGE ██  [SR1][SR2][SR3][SR4]   ← stage-side tables (min 4 pax)
//                    [F1][F2][F3][F4][F5][F6]                  ← 6 front-of-stage tables
//   [L1..L5 ]           ┌──────────┐          [R1..R5 ]
//   [L6..L10]           │  DANCE   │          [R6..R10]
//   [L11..L15]          │  FLOOR   │          [R11..R15]
//   [L16..L20]          │          │          [R16..R20]
//   [L21..L25]          └──────────┘
//   [L26..L30]
//
function buildTables(): TableDef[] {
  const t: TableDef[] = []

  // Reserved spot indices (1-based) for variety — edit freely
  const reservedSL   = new Set([2])
  const reservedSR   = new Set<number>()
  const reservedF    = new Set([3])
  const reservedLeft  = new Set([7, 14, 22])
  const reservedRight = new Set([6, 13])

  // ── Stage Left (4 tables — min 4 persons) ──────────────────
  for (let i = 0; i < 4; i++) {
    t.push({
      id: `sl${i + 1}`,
      area: 'Stage Left',
      label: `Stage Left ${i + 1}`,
      short: `SL${i + 1}`,
      cx: 290 - i * 70,
      cy: 52,
      r: 22,
      capacity: '4 – 8',
      minSpend: 'AED 2,000',
      status: reservedSL.has(i + 1) ? 'reserved' : 'available',
    })
  }

  // ── Stage Right (4 tables — min 4 persons) ─────────────────
  for (let i = 0; i < 4; i++) {
    t.push({
      id: `sr${i + 1}`,
      area: 'Stage Right',
      label: `Stage Right ${i + 1}`,
      short: `SR${i + 1}`,
      cx: 720 + i * 70,
      cy: 52,
      r: 22,
      capacity: '4 – 8',
      minSpend: 'AED 2,000',
      status: reservedSR.has(i + 1) ? 'reserved' : 'available',
    })
  }

  // ── Front of Stage (6 tables, centred under the stage) ─────
  // Stage centre x ≈ 505; 6 tables × 70 spacing → start at 505 − 175 = 330
  const frontCX = [330, 400, 470, 540, 610, 680]
  frontCX.forEach((cx, i) => {
    t.push({
      id: `f${i + 1}`,
      area: 'Front Stage',
      label: `Front ${i + 1}`,
      short: `F${i + 1}`,
      cx,
      cy: 165,
      r: 20,
      capacity: '2 – 6',
      minSpend: 'AED 1,500',
      status: reservedF.has(i + 1) ? 'reserved' : 'available',
    })
  })

  // ── Left section (30 tables — 6 rows × 5) ──────────────────
  const leftCols = [45, 115, 185, 255, 325]
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 5; col++) {
      const n = row * 5 + col + 1
      t.push({
        id: `l${n}`,
        area: 'Left',
        label: `Left ${n}`,
        short: `L${n}`,
        cx: leftCols[col],
        cy: 260 + row * 65,
        r: 18,
        capacity: '2 – 4',
        minSpend: 'AED 800',
        status: reservedLeft.has(n) ? 'reserved' : 'available',
      })
    }
  }

  // ── Right section (20 tables — 4 rows × 5) ─────────────────
  const rightCols = [685, 755, 825, 895, 965]
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      const n = row * 5 + col + 1
      t.push({
        id: `r${n}`,
        area: 'Right',
        label: `Right ${n}`,
        short: `R${n}`,
        cx: rightCols[col],
        cy: 260 + row * 65,
        r: 18,
        capacity: '2 – 4',
        minSpend: 'AED 800',
        status: reservedRight.has(n) ? 'reserved' : 'available',
      })
    }
  }

  return t
}

const TABLES = buildTables()

// ── Booking form ──────────────────────────────────────────────────────────────
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    // TODO: connect booking API / Resend / CRM here
    console.log('Table booking:', { table: selected?.label, event: event?.title, ...data })
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setStep('success')
    reset()
  }

  // Stats for the legend footer
  const stats = useMemo(() => ({
    total:     TABLES.length,
    available: TABLES.filter(t => t.status === 'available').length,
    reserved:  TABLES.filter(t => t.status === 'reserved').length,
  }), [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/88 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div
        className="relative z-10 w-full sm:max-w-5xl bg-kai-dark border border-kai-gold/20 max-h-[95dvh] overflow-y-auto"
        style={{ boxShadow: '0 -8px 80px rgba(201,168,76,0.1)' }}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-kai-dark border-b border-kai-gold/10">
          <div>
            {event && (
              <p className="text-kai-gold text-[10px] tracking-[0.3em] uppercase mb-0.5">{event.title}</p>
            )}
            <h3 className="font-display text-lg sm:text-xl font-bold text-kai-white leading-tight">
              {step === 'map'  ? 'Choose Your Table' :
               step === 'form' ? 'Complete Booking'  :
                                 'Booking Confirmed'}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close"
            className="w-9 h-9 flex items-center justify-center text-kai-white/40 hover:text-kai-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* ══ STEP 1 — FLOOR MAP ══════════════════════════════════════════ */}
        {step === 'map' && (
          <div className="p-4 sm:p-5">

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-3 text-[11px] text-kai-white/50">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-kai-gold" />Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-kai-gold" />Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />Reserved
              </span>
              <span className="text-kai-white/30 ml-auto hidden sm:block">
                {stats.available} of {stats.total} available
              </span>
            </div>

            {/* ── SVG Floor Plan ─────────────────────────────────────────── */}
            {/* Horizontally scrollable on small screens */}
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <svg
                viewBox="0 0 1010 655"
                style={{ minWidth: '680px', width: '100%', maxHeight: '480px', touchAction: 'manipulation' }}
                aria-label="KAI club floor plan — tap a table to select"
              >
                <defs>
                  <radialGradient id="stageHalo" cx="50%" cy="0%" r="60%">
                    <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.10"/>
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"/>
                  </radialGradient>
                  <filter id="tableGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* Background */}
                <rect width="1010" height="655" fill="#050508" rx="6"/>
                <rect width="1010" height="655" fill="url(#stageHalo)" style={{ pointerEvents: 'none' }}/>

                {/* ── Zone: Left section background ── */}
                <rect x="18" y="240" width="328" height="400" rx="4"
                  fill="#07070e" stroke="#C9A84C" strokeWidth="0.4" strokeDasharray="5 4" opacity="0.25"/>
                <text x="173" y="254" textAnchor="middle" fill="#C9A84C"
                  fontSize="7" letterSpacing="3" fontFamily="Georgia,serif" opacity="0.35">LEFT SECTION  ·  30 TABLES</text>

                {/* ── Zone: Right section background ── */}
                <rect x="664" y="240" width="328" height="275" rx="4"
                  fill="#07070e" stroke="#C9A84C" strokeWidth="0.4" strokeDasharray="5 4" opacity="0.25"/>
                <text x="828" y="254" textAnchor="middle" fill="#C9A84C"
                  fontSize="7" letterSpacing="3" fontFamily="Georgia,serif" opacity="0.35">RIGHT SECTION  ·  20 TABLES</text>

                {/* ── Dance floor (centre gap) ── */}
                <rect x="356" y="192" width="298" height="330" rx="4"
                  fill="#060610" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="7 5" opacity="0.4"/>
                <text x="505" y="350" textAnchor="middle" fill="#C9A84C"
                  fontSize="9" letterSpacing="4" fontFamily="Georgia,serif" opacity="0.45">DANCE FLOOR</text>
                {/* subtle grid lines on dance floor */}
                {[215,258,301,344,387,430,473].map(y => (
                  <line key={y} x1="360" y1={y} x2="650" y2={y}
                    stroke="#C9A84C" strokeWidth="0.2" opacity="0.15"/>
                ))}
                {[380,435,490,545,600].map(x => (
                  <line key={x} x1={x} y1="196" x2={x} y2="519"
                    stroke="#C9A84C" strokeWidth="0.2" opacity="0.15"/>
                ))}

                {/* ── Stage ── */}
                <rect x="335" y="10" width="340" height="82" rx="5"
                  fill="#130f02" stroke="#C9A84C" strokeWidth="1.5"/>
                {/* Stage glow */}
                <rect x="335" y="10" width="340" height="82" rx="5"
                  fill="none" stroke="#E8C97A" strokeWidth="0.5" opacity="0.4"/>
                <text x="505" y="46" textAnchor="middle" fill="#C9A84C"
                  fontSize="11" letterSpacing="6" fontFamily="Georgia,serif" fontWeight="bold">STAGE</text>
                <text x="505" y="62" textAnchor="middle" fill="#C9A84C"
                  fontSize="7.5" letterSpacing="4" fontFamily="Georgia,serif" opacity="0.6">DJ BOOTH</text>
                {/* Decorative stage edge light */}
                <line x1="345" y1="92" x2="665" y2="92" stroke="#C9A84C" strokeWidth="1.5" opacity="0.6"/>

                {/* ── Connector lines: stage → side tables ── */}
                <line x1="335" y1="52" x2="312" y2="52" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3"/>
                <line x1="675" y1="52" x2="698" y2="52" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3"/>

                {/* ── Connector: stage → front tables ── */}
                <line x1="505" y1="92" x2="505" y2="145" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3"/>

                {/* ── Entrance ── */}
                <line x1="400" y1="644" x2="610" y2="644"
                  stroke="#C9A84C" strokeWidth="0.6" opacity="0.3"/>
                <text x="505" y="654" textAnchor="middle" fill="#C9A84C"
                  fontSize="7" letterSpacing="4" fontFamily="Georgia,serif" opacity="0.3">ENTRANCE</text>

                {/* ── Tables ── */}
                {TABLES.map(t => {
                  const isReserved = t.status === 'reserved'
                  const isSelected = selected?.id === t.id
                  const isStage    = t.area === 'Stage Left' || t.area === 'Stage Right'
                  const isFront    = t.area === 'Front Stage'

                  return (
                    <g
                      key={t.id}
                      onClick={() => !isReserved && setSelected(t)}
                      role="button"
                      aria-label={`${t.label} — ${t.capacity} guests — ${isReserved ? 'Reserved' : 'Available'}`}
                      style={{ cursor: isReserved ? 'not-allowed' : 'pointer' }}
                    >
                      {/* Invisible larger tap target */}
                      <circle cx={t.cx} cy={t.cy} r={t.r + 12} fill="transparent"/>

                      {/* Selection glow */}
                      {isSelected && (
                        <circle cx={t.cx} cy={t.cy} r={t.r + 10}
                          fill="#C9A84C" opacity="0.18" filter="url(#tableGlow)"/>
                      )}

                      {/* Table body */}
                      <circle
                        cx={t.cx} cy={t.cy} r={t.r}
                        fill={isSelected ? '#C9A84C' : isReserved ? '#101010' : '#0d0d18'}
                        stroke={
                          isSelected  ? '#E8C97A' :
                          isReserved  ? '#282828' :
                          isStage     ? '#C9A84C' :
                          isFront     ? '#C9A84C' :
                                        '#C9A84C'
                        }
                        strokeWidth={isStage || isFront ? 1.5 : 1}
                        opacity={isReserved ? 0.35 : 1}
                      />

                      {/* Label */}
                      <text
                        x={t.cx} y={t.cy + 1}
                        textAnchor="middle" dominantBaseline="middle"
                        fill={isSelected ? '#050508' : isReserved ? '#3a3a3a' : '#C9A84C'}
                        fontSize={t.r >= 22 ? 8 : t.r === 20 ? 7.5 : 6.5}
                        fontWeight="bold"
                        fontFamily="Georgia,serif"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {t.short}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* ── Selected table info panel ── */}
            {selected ? (
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-kai-gold/35 bg-kai-card">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display text-lg font-bold text-kai-gold leading-tight">{selected.label}</p>
                    <span className="px-2 py-0.5 border border-kai-gold/30 text-kai-gold/60 text-[10px] tracking-widest uppercase">
                      {selected.area}
                    </span>
                  </div>
                  <div className="flex gap-6 mt-2">
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
                  className="w-full sm:w-auto flex-shrink-0 px-7 py-3.5 bg-kai-gold text-kai-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-kai-gold-light transition-colors"
                >
                  Book This Table →
                </button>
              </div>
            ) : (
              <p className="mt-4 text-center text-kai-white/30 text-sm py-3 border border-kai-gold/10">
                Tap any gold table on the map to select it
              </p>
            )}
          </div>
        )}

        {/* ══ STEP 2 — BOOKING FORM ═══════════════════════════════════════ */}
        {step === 'form' && selected && (
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <button onClick={() => setStep('map')}
                className="text-kai-white/40 hover:text-kai-gold transition-colors text-sm">
                ← Change table
              </button>
              <div className="h-4 w-px bg-kai-gold/20"/>
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
              <p className="text-kai-white/20 text-xs text-center">Our team will confirm within 24 hours.</p>
            </form>
          </div>
        )}

        {/* ══ STEP 3 — SUCCESS ════════════════════════════════════════════ */}
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
              Request received. Our concierge will reach out within 24 hours to confirm.
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
