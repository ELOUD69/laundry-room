import AnimatedSection from './AnimatedSection'

const DETAILS = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    label: 'Hours',
    value: 'Friday & Saturday',
    sub: '10 PM – 3 AM',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
    label: 'Location',
    value: 'Royal M Hotel by Gewan',
    sub: 'Al Bateen, Abu Dhabi, UAE',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
    label: 'Reservations',
    value: '+971 54 308 8649',
    sub: 'Call or WhatsApp',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-kai-black">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-kai-gold text-xs tracking-[0.4em] uppercase mb-4">Find Us</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-kai-white mb-5">
              About &amp; Location
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-kai-gold/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-kai-gold" />
              <div className="h-px w-12 bg-kai-gold/30" />
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

          {/* Left: blurb + details */}
          <AnimatedSection direction="left">
            <p className="text-kai-white/60 text-lg leading-relaxed mb-10">
              KAI is Abu Dhabi&apos;s most immersive luxury nightclub — where world-class DJs,
              premium bottle service, and an electric atmosphere converge at the iconic
              Royal M Hotel by Gewan.
            </p>
            <p className="text-kai-white/45 leading-relaxed mb-12">
              Every Friday and Saturday night, KAI transforms into the city&apos;s most
              coveted destination for those who demand the extraordinary. From intimate
              VIP booths to the pulse of the main floor, every inch of KAI is designed
              to deliver a night you&apos;ll never forget.
            </p>

            {/* Detail cards */}
            <div className="space-y-5">
              {DETAILS.map((d) => (
                <div
                  key={d.label}
                  className="flex items-start gap-5 p-5 glass-card border border-kai-gold/10"
                >
                  <div className="flex-shrink-0 w-10 h-10 border border-kai-gold/30 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-kai-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {d.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-kai-gold/50 mb-0.5">
                      {d.label}
                    </p>
                    <p className="text-kai-white font-medium">{d.value}</p>
                    <p className="text-kai-white/45 text-sm">{d.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Directions link */}
            <div className="mt-8">
              <a
                href="https://maps.google.com/?q=Royal+M+Hotel+by+Gewan+Al+Bateen+Abu+Dhabi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-kai-gold text-sm hover:text-kai-gold-light transition-colors"
              >
                Get Directions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </AnimatedSection>

          {/* Right: map embed */}
          <AnimatedSection delay={150} direction="right">
            <div className="relative overflow-hidden border border-kai-gold/15">
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-6 h-px bg-kai-gold" />
              <div className="absolute top-0 left-0 w-px h-6 bg-kai-gold" />
              <div className="absolute top-0 right-0 w-6 h-px bg-kai-gold" />
              <div className="absolute top-0 right-0 w-px h-6 bg-kai-gold" />
              <div className="absolute bottom-0 left-0 w-6 h-px bg-kai-gold" />
              <div className="absolute bottom-0 left-0 w-px h-6 bg-kai-gold" />
              <div className="absolute bottom-0 right-0 w-6 h-px bg-kai-gold" />
              <div className="absolute bottom-0 right-0 w-px h-6 bg-kai-gold" />

              <iframe
                src="https://maps.google.com/maps?q=Royal+M+Hotel+by+Gewan+Al+Bateen+Abu+Dhabi+UAE&t=k&z=16&output=embed"
                width="100%"
                height="420"
                style={{ border: 0, display: 'block', filter: 'grayscale(30%) contrast(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KAI Abu Dhabi — Royal M Hotel, Al Bateen"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
