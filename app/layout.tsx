import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kaiabudhabi.com'),
  title: {
    default: 'KAI Abu Dhabi | Your Favorite Clubbing Experience',
    template: '%s | KAI Abu Dhabi',
  },
  description:
    'KAI Abu Dhabi — The premier luxury nightclub at Royal M Hotel by Gewan, Al Bateen. VIP tables, world-class DJs, bottle service, and unforgettable nights. Open Friday & Saturday, 10 PM – 3 AM.',
  keywords: [
    'KAI Abu Dhabi',
    'nightclub Abu Dhabi',
    'VIP table Abu Dhabi',
    'bottle service Abu Dhabi',
    'Royal M Hotel nightclub',
    'Al Bateen club',
    'clubbing Abu Dhabi',
    'DJ night Abu Dhabi',
  ],
  authors: [{ name: 'KAI Abu Dhabi' }],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://kaiabudhabi.com',
    siteName: 'KAI Abu Dhabi',
    title: 'KAI Abu Dhabi | Your Favorite Clubbing Experience',
    description:
      'The premier luxury nightclub at Royal M Hotel by Gewan, Al Bateen. VIP tables, world-class DJs, bottle service.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KAI Abu Dhabi — Luxury Nightclub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KAI Abu Dhabi | Your Favorite Clubbing Experience',
    description:
      'The premier luxury nightclub at Royal M Hotel by Gewan, Al Bateen.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://kaiabudhabi.com' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'NightClub',
      '@id': 'https://kaiabudhabi.com/#nightclub',
      name: 'KAI Abu Dhabi',
      description:
        'Premium luxury nightclub at Royal M Hotel by Gewan, Al Bateen, Abu Dhabi.',
      url: 'https://kaiabudhabi.com',
      telephone: '+971543088649',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Royal M Hotel by Gewan, Al Bateen',
        addressLocality: 'Abu Dhabi',
        addressCountry: 'AE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.449,
        longitude: 54.338,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Friday', 'Saturday'],
          opens: '22:00',
          closes: '03:00',
        },
      ],
      priceRange: '$$$',
      sameAs: ['https://www.instagram.com/kaiabudhabi'],
      image: 'https://kaiabudhabi.com/og-image.jpg',
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://kaiabudhabi.com/#business',
      name: 'KAI Abu Dhabi',
      telephone: '+971543088649',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Royal M Hotel by Gewan, Al Bateen',
        addressLocality: 'Abu Dhabi',
        addressCountry: 'AE',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Friday', 'Saturday'],
          opens: '22:00',
          closes: '03:00',
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-kai-black text-kai-white font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
