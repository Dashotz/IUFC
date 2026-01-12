'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { images } from '@/app/assets/images'

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isAboutPage = pathname === '/about'

  // Handle scroll after navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [pathname])

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'SPONSORS', href: '#sponsors' },
    { name: 'MISSION', href: '#mission' },
    { name: 'BENEFITS', href: '#benefits' },
    { name: 'EVENTS', href: '#events' },
    { name: 'COACHES', href: '#coaches' },
    { name: 'CONTACT', href: '#contact' },
  ]

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images.global.imageBg}
          alt="Imus United Football Club"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient overlay - darker at bottom for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
      </div>

      {/* Header and Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src={images.global.logo}
                  alt="Imus United Football Club Logo"
                  width={80}
                  height={80}
                  className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                  priority
                />
                <span className="text-lg sm:text-xl font-bold text-white hidden xs:inline">
                  IMUS UNITED FC
                </span>
              </Link>
            </motion.div>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-4 xl:gap-6 items-center">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      // Handle navigation based on link type and current page
                      if (item.href.startsWith('#')) {
                        // Anchor link
                        if (isAboutPage) {
                          // Check if section exists on current page (coaches section is on about page)
                          if (item.href === '#coaches') {
                            e.preventDefault()
                            const element = document.querySelector(item.href)
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' })
                            }
                          } else {
                            // Navigate to home with hash
                            e.preventDefault()
                            router.push(`/${item.href}`)
                          }
                        } else {
                          // On home page, just scroll
                          e.preventDefault()
                          const element = document.querySelector(item.href)
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }
                      } else if (item.href === '/about' && isAboutPage) {
                        // If already on about page, scroll to top
                        e.preventDefault()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      } else if (item.href === '/about') {
                        // Navigate to about page normally
                        // Let default behavior handle it
                      }
                    }}
                    className="text-white hover:text-barca-red transition-colors font-semibold text-xs xl:text-sm uppercase tracking-wide relative group"
                  >
                    {item.name}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-barca-red group-hover:w-full transition-all duration-300"
                      layoutId={`underline-${item.name}`}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/90 backdrop-blur-md"
            >
              <nav className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          setIsMobileMenuOpen(false)
                          // Handle navigation based on link type and current page
                          if (item.href.startsWith('#')) {
                            // Anchor link
                            if (isAboutPage) {
                              // Check if section exists on current page (coaches section is on about page)
                              if (item.href === '#coaches') {
                                e.preventDefault()
                                const element = document.querySelector(item.href)
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' })
                                }
                              } else {
                                // Navigate to home with hash
                                e.preventDefault()
                                router.push(`/${item.href}`)
                              }
                            } else {
                              // On home page, just scroll
                              e.preventDefault()
                              const element = document.querySelector(item.href)
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' })
                              }
                            }
                          } else if (item.href === '/about' && isAboutPage) {
                            // If already on about page, scroll to top
                            e.preventDefault()
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          } else if (item.href === '/about') {
                            // Navigate to about page normally
                            // Let default behavior handle it
                          }
                        }}
                        className="text-white hover:text-barca-red transition-colors font-semibold text-base uppercase tracking-wide block py-2"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Headline Overlay - centered left like reference */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-0 top-[40%] -translate-y-1/2 z-10 p-6 md:p-12"
      >
        <div className="max-w-3xl text-left">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-barca-red rounded-full"></span>
            <span className="text-white/80 text-sm font-semibold uppercase tracking-wide">CLUB</span>
            <span className="text-white/60 text-xs ml-2">About Us</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            IMUS UNITED FC: DEVELOPING CHAMPIONS
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mb-8">
            A non-profit organization dedicated to developing morally upright athletes capable of availing scholarships and competing at the national and international level.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="#mission"
              onClick={(e) => {
                e.preventDefault()
                const element = document.querySelector('#mission')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="inline-block bg-barca-red text-white px-8 py-3 font-bold uppercase tracking-wide hover:bg-barca-red/90 transition-colors shadow-lg"
            >
              Read More
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
