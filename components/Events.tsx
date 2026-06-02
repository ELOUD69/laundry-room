'use client'

import { useState } from 'react'
import Image from 'next/image'
import AnimatedSection from './AnimatedSection'
import TableMapModal from './TableMapModal'
import eventsData from '@/data/events.json'

type Event = (typeof eventsData)[number]

function formatEventDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-AE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function SectionHeader() {
  return (
    <AnimatedSection>
      <div className="text-center mb-16">
        <p className="text-kai-gold text-xs tracking-[0.4em] uppercase mb-4">What&apos;s On</p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-kai-white mb-5">
          Upcoming Events
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-kai-gold/30" />
          <div className="w-1.5 h-1.5 rotate-45 bg-kai-gold" />
          <div className="h-px w-12 bg-kai-gold/30" />
        </div>
      </div>
    </AnimatedSection>
  )
}

function EventCard({
  event,
  index,
  onBook,
}: {
  event: Event
  index: number
  onBook: (e: Event) => void
}) {
  return (
    <AnimatedSection delay={index * 120}>
      <article className="group glass-card border border-kai-gold/10 hover:border-kai-gold/35 transition-all duration-500 overflow-hidden h-full flex flex-col">
        {/* Flyer image */}
        <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
          <Image
            src={event.image}
            alt={`${event.title} flyer — ${event.artist}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-kai-black/80 border border-kai-gold/30 text-kai-gold text-[10px] tracking-[0.2em] uppercase">
            {event.day}
          </span>
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-kai-card to-transparent" />
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
          <p className="text-kai-gold/60 text-[10px] tracking-[0.2em] uppercase mb-1.5">
            {formatEventDate(event.date)}
          </p>
          <h3 className="font-display text-xl font-bold text-kai-white mb-1 leading-tight">
            {event.title}
          </h3>
          <p className="text-kai-white/70 text-sm mb-0.5">{event.artist}</p>
          <p className="text-kai-gold/45 text-xs tracking-wide mb-3">{event.genre}</p>
          <p className="text-kai-white/45 text-xs leading-relaxed mb-5 flex-1">
            {event.description}
          </p>

          {/* Book Now opens the table map */}
          <button
            onClick={() => onBook(event)}
            className="block w-full text-center py-3 border border-kai-gold text-kai-gold text-xs tracking-[0.2em] uppercase hover:bg-kai-gold hover:text-kai-black transition-all duration-300 mt-auto"
          >
            Book Now
          </button>
        </div>
      </article>
    </AnimatedSection>
  )
}

export default function Events() {
  const [modalOpen,  setModalOpen]  = useState(false)
  const [activeEvent, setActiveEvent] = useState<Event | null>(null)

  const openModal = (event: Event) => {
    setActiveEvent(event)
    setModalOpen(true)
  }

  return (
    <>
      <section id="events" className="py-24 lg:py-32 bg-kai-black">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <SectionHeader />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {eventsData.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} onBook={openModal} />
            ))}
          </div>

          {/* Instagram CTA */}
          <AnimatedSection delay={400}>
            <div className="mt-14 text-center">
              <p className="text-kai-white/35 text-xs tracking-[0.2em] uppercase mb-5">
                Follow us for nightly updates
              </p>
              <a
                href="https://www.instagram.com/kaiabudhabi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-kai-gold text-sm hover:text-kai-gold-light transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @kaiabudhabi
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Table selection modal */}
      <TableMapModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        event={activeEvent}
      />
    </>
  )
}
