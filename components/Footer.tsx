import Image from 'next/image'

const NAV = [
  { href: '#events',    label: 'Events' },
  { href: '#vip',       label: 'VIP Tables' },
  { href: '#guestlist', label: 'Guestlist' },
  { href: '#gallery',   label: 'Gallery' },
  { href: '#about',     label: 'Location' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-kai-dark border-t border-kai-gold/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image src="/logo.svg" alt="KAI Abu Dhabi" width={44} height={44} className="w-10 h-10" />
              <span className="font-display text-xl font-bold tracking-[0.3em] text-gradient-gold">KAI</span>
            </div>
            <p className="text-kai-white/40 text-sm leading-relaxed">
              Abu Dhabi&apos;s premier luxury nightclub.<br />
              Royal M Hotel by Gewan, Al Bateen.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-kai-gold/60 mb-5">Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-kai-white/60">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
                Friday
              </div>
              <p className="text-kai-white/40 text-sm pl-3">10 PM – 3 AM</p>
              <div className="flex items-center gap-2 text-sm text-kai-white/60 mt-3">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
                Saturday
              </div>
              <p className="text-kai-white/40 text-sm pl-3">10 PM – 3 AM</p>
              <p className="text-kai-white/25 text-xs pt-2">Closed Sun – Thu</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-kai-gold/60 mb-5">Navigate</h3>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-kai-white/50 hover:text-kai-gold transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-kai-gold/60 mb-5">Contact</h3>
            <div className="space-y-4">
              <div>
                <p className="text-kai-white/25 text-xs mb-1">Reservations &amp; Enquiries</p>
                <a
                  href="tel:+971543088649"
                  className="text-kai-gold hover:text-kai-gold-light transition-colors font-medium"
                >
                  +971 54 308 8649
                </a>
              </div>
              <div>
                <p className="text-kai-white/25 text-xs mb-1">Social</p>
                <a
                  href="https://www.instagram.com/kaiabudhabi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-kai-white/50 hover:text-kai-gold transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @kaiabudhabi
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-kai-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-kai-white/25 text-xs">
          <p>© {year} KAI Abu Dhabi. All rights reserved.</p>
          <p className="text-kai-white/15 tracking-wide">
            Royal M Hotel by Gewan · Al Bateen · Abu Dhabi, UAE
          </p>
        </div>
      </div>
    </footer>
  )
}
