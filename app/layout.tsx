import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollToTeam from '@/components/ScrollToTeam'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Imus United Football Club',
  description: 'The official website of Imus United Football Club (IUFC). Join the premier football club in Imus, Cavite. We offer youth training, competitive tournaments, and a community for football enthusiasts.',
  keywords: [
    'imus football', 'imus academy', 'football academy', 'imus united', 'imus', 'imus united website', 'football club imus', 'soccer training cavite', 'youth football philippines', 'grassroots soccer', 'football tournament cavite', 'football clinic'],
  authors: [{ name: 'Imus United FC' }],
  creator: 'Imus United FC',
  publisher: 'Imus United FC',
  icons: {
    icon: '/images/global/logo.png',
    apple: '/images/global/logo.png',
  },
  alternates: {
    canonical: 'https://iufc.netlify.app',
  },
  openGraph: {
    title: 'Imus United Football Club',
    description: 'Join Imus United Football Club. Developing athletes, building character, and fostering a love for the beautiful game in Imus, Cavite.',
    url: 'https://iufc.netlify.app',
    siteName: 'Imus United FC',
    images: [
      {
        url: '/images/global/logo.png',
        width: 800,
        height: 600,
        alt: 'Imus United FC Logo',
      },
      {
        url: '/images/team/event.webp',
        width: 1200,
        height: 630,
        alt: 'Imus United Team Action',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imus United Football Club',
    description: 'Premier football club in Imus, Cavite. Youth training, tournaments, and community.',
    images: ['/images/team/event.webp'], // Using a wider image for twitter card looks better
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'wbGw35acED7Il13UV5TppzkEV522w7ikUU6Bxi04PZo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`} suppressHydrationWarning>
        <main className="min-h-screen overflow-x-hidden">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SportsTeam',
              'name': 'Imus United Football Club',
              'alternateName': 'IUFC',
              'url': 'https://iufc.netlify.app',
              'logo': 'https://iufc.netlify.app/images/global/logo.png',
              'location': {
                '@type': 'Place',
                'address': {
                  '@type': 'PostalAddress',
                  'addressLocality': 'Imus',
                  'addressRegion': 'Cavite',
                  'addressCountry': 'Philippines'
                }
              },
              'description': 'Premier football club in Imus, Cavite dedicated to youth development and competitive excellence.'
            })
          }}
        />
        <ScrollToTop />
        <ScrollToTeam />
      </body>
    </html>
  )
}
