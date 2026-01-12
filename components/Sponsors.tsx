'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface Sponsor {
  name: string
  logo?: string
}

// Add your sponsor names/logos here
const sponsors: Sponsor[] = [
  { name: 'EFX', logo: '/images/sponsors/efx.png' },
  { name: 'TSL', logo: '/images/sponsors/tsl.png' },
  { name: 'Parents' },
  { name: 'Volunteers' },
  { name: 'EFX', logo: '/images/sponsors/efx.png' },
  { name: 'TSL', logo: '/images/sponsors/tsl.png' },
  { name: 'Parents' },
  { name: 'Volunteers' },
]

export default function Sponsors() {
  // Duplicate sponsors multiple times for seamless infinite scroll
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors]
  
  // Calculate the distance to move (one set of sponsors)
  // Each sponsor is w-48 (192px) + gap-16 (64px) = 256px per sponsor
  const itemWidth = 192 // w-48 = 192px
  const gap = 64 // gap-16 = 64px
  const scrollDistance = sponsors.length * (itemWidth + gap)

  return (
    <section className="bg-[#0a1628] py-12 overflow-hidden w-full">
      <div className="w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white text-center mb-8 px-4"
        >
          Our Sponsors
        </motion.h2>
        
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-16 items-center"
            style={{ width: 'max-content' }}
            animate={{
              x: [0, -scrollDistance],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 25,
                ease: 'linear',
              },
            }}
          >
            {duplicatedSponsors.map((sponsor, index) => (
              <div
                key={`${sponsor.name}-${index}`}
                className="flex-shrink-0 w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              >
                <div className={`w-full h-full rounded-lg flex flex-col items-center justify-center p-6 border transition-colors ${
                  sponsor.name === 'Parents' 
                    ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 hover:border-blue-400' 
                    : sponsor.name === 'Volunteers'
                    ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300 hover:border-green-400'
                    : 'bg-gray-100 border-gray-300 hover:border-gray-400'
                }`}>
                  {sponsor.logo ? (
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={120}
                      height={60}
                      className="max-w-full max-h-full object-contain"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      {sponsor.name === 'Parents' && (
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                      {sponsor.name === 'Volunteers' && (
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )}
                      <span className={`text-sm font-bold text-center uppercase tracking-wide ${
                        sponsor.name === 'Parents' 
                          ? 'text-blue-700' 
                          : sponsor.name === 'Volunteers'
                          ? 'text-green-700'
                          : 'text-gray-900'
                      }`}>
                        {sponsor.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
