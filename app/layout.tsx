import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Imus United Football Club - Official Website',
  description: 'Official website of Imus United Football Club. A non-profit organization dedicated to developing morally upright athletes capable of availing scholarships and competing at the national and international level.',
  icons: {
    icon: '/images/global/logo.png',
    apple: '/images/global/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
