'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background video (swap <source> for a real .mp4 clip) ─────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        {/* TODO: drop a real promo clip into /public and uncomment: */}
        {/* <source src="/hero.mp4" type="video/mp4" /> */}
      </video>

      {/* ── Ambient CSS glow (fallback when no video) ─────────────────────── */}
      <div className="absolute inset-0 bg-kai-black">
        <div className="absolute inset-0 ambient-glow animate-glow" />
        {/* Warm spotlight top-center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-kai-gold/5 rounded-full blur-[120px] animate-float" />
        {/* Side accents */}
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-kai-gold/3 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-kai-gold/3 rounded-full blur-[80px]" />
      </div>

      {/* ── Dark gradient overlay ──────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-kai-black/60 via-kai-black/40 to-kai-black" />

      {/* ── Hero content ──────────────────────────────────────────────────── */}
      <div
        className="relative z-10 text-center px-5 sm:px-8"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(20px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.svg"
            alt="KAI Abu Dhabi"
            width={130}
            height={130}
            priority
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 animate-float"
          />
        </div>

        {/* Club name */}
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none mb-3">
          <span className="text-gradient-gold">KAI</span>
        </h1>
        <p className="font-display text-kai-white/40 text-base sm:text-lg tracking-[0.5em] uppercase mb-2">
          Abu Dhabi
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-7">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-kai-gold/50" />
          <div className="w-1.5 h-1.5 rotate-45 bg-kai-gold" />
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-kai-gold/50" />
        </div>

        {/* Tagline */}
        <p className="text-kai-white/70 text-sm sm:text-base tracking-[0.35em] uppercase mb-10 font-light">
          Your Favorite Clubbing Experience
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#vip"
            className="w-full sm:w-auto px-8 py-4 bg-kai-gold text-kai-black font-semibold text-xs tracking-[0.25em] uppercase hover:bg-kai-gold-light transition-colors duration-300 animate-pulse-gold"
          >
            Reserve a Table
          </a>
          <a
            href="#guestlist"
            className="w-full sm:w-auto px-8 py-4 border border-kai-gold/60 text-kai-gold text-xs tracking-[0.25em] uppercase hover:border-kai-gold hover:bg-kai-gold/10 transition-all duration-300"
          >
            Join the Guestlist
          </a>
        </div>

        {/* Hours chip */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-kai-gold/15 text-kai-white/45 text-xs tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          FRI &amp; SAT &nbsp;·&nbsp; 10 PM – 3 AM
        </div>
      </div>

      {/* ── Scroll cue ────────────────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-kai-white/25 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-kai-gold/50 to-transparent" />
      </div>
    </section>
  )
}
