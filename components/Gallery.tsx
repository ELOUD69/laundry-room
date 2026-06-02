import Image from 'next/image'
import AnimatedSection from './AnimatedSection'

// Swap filenames for real photos in /public/gallery/
const IMAGES = [
  { src: '/gallery/gallery-1.svg', alt: 'KAI dance floor — crowd energy',       aspect: 'tall'   },
  { src: '/gallery/gallery-2.svg', alt: 'VIP booth with bottle service',         aspect: 'short'  },
  { src: '/gallery/gallery-3.svg', alt: 'DJ on stage at KAI',                   aspect: 'short'  },
  { src: '/gallery/gallery-4.svg', alt: 'Cocktail bar with neon lighting',       aspect: 'tall'   },
  { src: '/gallery/gallery-5.svg', alt: 'White Party — crowd in white',          aspect: 'short'  },
  { src: '/gallery/gallery-6.svg', alt: "Queen's Night — purple atmosphere",     aspect: 'tall'   },
  { src: '/gallery/gallery-7.svg', alt: 'Premium bottle presentation',           aspect: 'short'  },
  { src: '/gallery/gallery-8.svg', alt: 'Saturday night main floor',             aspect: 'short'  },
  { src: '/gallery/gallery-9.svg', alt: 'Gold bottle service sparkler',          aspect: 'tall'   },
]

const HEIGHTS: Record<string, string> = {
  tall:  'h-72 sm:h-80',
  short: 'h-48 sm:h-56',
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-kai-dark">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-kai-gold text-xs tracking-[0.4em] uppercase mb-4">The Experience</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-kai-white mb-5">
              Past Nights
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-kai-gold/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-kai-gold" />
              <div className="h-px w-12 bg-kai-gold/30" />
            </div>
          </div>
        </AnimatedSection>

        {/* Masonry — CSS columns */}
        <div className="columns-2 sm:columns-3 lg:columns-3 gap-3 space-y-3">
          {IMAGES.map((img, i) => (
            <AnimatedSection key={img.src} delay={i * 60} className="break-inside-avoid mb-3">
              <div
                className={`relative w-full overflow-hidden group ${HEIGHTS[img.aspect]}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-kai-black/0 group-hover:bg-kai-black/30 transition-colors duration-500" />
                {/* Gold border shine on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-kai-gold/20 transition-colors duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Instagram CTA */}
        <AnimatedSection delay={300}>
          <div className="mt-12 text-center">
            <a
              href="https://www.instagram.com/kaiabudhabi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 border border-kai-gold/30 text-kai-gold/70 text-xs tracking-[0.2em] uppercase hover:border-kai-gold hover:text-kai-gold transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              See more on Instagram
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
