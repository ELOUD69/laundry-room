'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '#events',    label: 'Events' },
  { href: '#vip',       label: 'VIP Tables' },
  { href: '#guestlist', label: 'Guestlist' },
  { href: '#gallery',   label: 'Gallery' },
  { href: '#about',     label: 'Location' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const linkClass =
    'text-xs tracking-[0.2em] uppercase text-kai-white/75 hover:text-kai-gold transition-colors duration-300'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-kai-gold/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="KAI Abu Dhabi logo"
              width={42}
              height={42}
              className="w-10 h-10 sm:w-11 sm:h-11"
            />
            <span className="font-display text-xl font-bold tracking-[0.25em] text-gradient-gold hidden sm:block">
              KAI
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#vip"
              className="hidden sm:inline-flex items-center px-5 py-2 border border-kai-gold text-kai-gold text-xs tracking-[0.2em] uppercase hover:bg-kai-gold hover:text-kai-black transition-all duration-300 font-medium"
            >
              Reserve
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span
                className={`block w-6 h-px bg-kai-white transition-all duration-300 origin-center ${
                  open ? 'rotate-45 translate-y-[5px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-px bg-kai-white transition-all duration-300 ${
                  open ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-px bg-kai-white transition-all duration-300 origin-center ${
                  open ? '-rotate-45 -translate-y-[5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden glass border-t border-kai-gold/10 overflow-hidden transition-all duration-500 ${
          open ? 'max-h-screen py-6' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-5" aria-label="Mobile navigation">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm tracking-[0.2em] uppercase text-kai-white/70 hover:text-kai-gold border-b border-kai-gold/10 last:border-none transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#vip"
            onClick={() => setOpen(false)}
            className="mt-4 py-3 text-center text-xs tracking-[0.2em] uppercase border border-kai-gold text-kai-gold hover:bg-kai-gold hover:text-kai-black transition-all duration-300"
          >
            Reserve a Table
          </a>
        </nav>
      </div>
    </header>
  )
}
