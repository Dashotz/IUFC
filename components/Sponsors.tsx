'use client'

import { motion } from 'framer-motion'

interface Sponsor {
  name: string
  logo?: string
}

// Add your sponsor names/logos here
const sponsors: Sponsor[] = [
  { name: 'Sponsor 1' },
  { name: 'Sponsor 2' },
  { name: 'Sponsor 3' },
  { name: 'Sponsor 4' },
  { name: 'Sponsor 5' },
  { name: 'Sponsor 6' },
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
    <section className="bg-gray-900 py-12 overflow-hidden w-full">
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
                <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center p-6 border border-white/20 hover:border-white/40 transition-colors">
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-white text-sm font-semibold text-center">{sponsor.name}</span>
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
