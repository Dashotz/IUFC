'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false })

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Section - Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/global/logo.webp"
                alt="Imus United Football Club Logo"
                width={50}
                height={50}
                className="object-contain"
                sizes="50px"
                quality={90}
              />
              <span className="text-2xl font-bold text-white">IMUS UNITED FC</span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Welcome to our football community! Discover the joy of football, connect with fellow enthusiasts, and unlock your full potential with our expert training programs and competitive opportunities.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/imusunitedfootballclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-barca-red transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Section - Field Location */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wide">FIELD LOCATION</h3>
            
            {/* Address */}
            <div className="mb-4">
              <div className="flex items-start gap-3 mb-4">
                <svg className="w-5 h-5 text-barca-red mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-white/80 text-xs leading-relaxed">
                  Toclong 2-A Tishabet Field Imus City, Cavite
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="h-48 w-full rounded-lg overflow-hidden border border-white/20">
              <MapComponent />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm">
              ©{new Date().getFullYear()} Imus United FC. All Rights Reserved.
            </p>
            <p className="text-white/60 text-xs">
              A non-profit organization dedicated to developing morally upright athletes.
            </p>
          </div>
        </div>
      </div>

    </footer>
  )
}
