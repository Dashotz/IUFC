'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function TwoColumnSection() {
  return (
    <section className="bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] md:h-[600px] lg:h-[700px]"
          >
            {/* Top Left Image */}
            <div className="absolute top-0 left-0 w-[60%] h-[55%] z-10 rounded-lg shadow-xl overflow-hidden">
              <Image
                src="/images/team/banner2.webp"
                alt="Imus United FC - Team in Action"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
                loading="lazy"
              />
            </div>
            
            {/* Bottom Right Image */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[55%] z-10 rounded-lg shadow-xl overflow-hidden">
              <Image
                src="/images/team/banner1.webp"
                alt="Imus United FC - Match Action"
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
                loading="lazy"
              />
            </div>
            
            {/* Decorative Pattern - Top Right */}
            <div className="absolute top-8 right-8 w-24 h-24 bg-gray-800 opacity-20 z-0">
              <div className="w-full h-full grid grid-cols-4 gap-1 p-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="bg-gray-900"></div>
                ))}
              </div>
            </div>
            
            {/* Decorative Pattern - Bottom Left */}
            <div className="absolute bottom-8 left-8 w-24 h-24 bg-gray-800 opacity-20 z-0">
              <div className="w-full h-full grid grid-cols-4 gap-1 p-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="bg-gray-900"></div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Decorative Pattern - Top */}
            <div className="w-24 h-24 bg-gray-800 opacity-20">
              <div className="w-full h-full grid grid-cols-4 gap-1 p-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="bg-gray-900"></div>
                ))}
              </div>
            </div>

            {/* Small Heading */}
            <p className="text-sm uppercase tracking-wider text-gray-400 font-semibold">
              WELCOME TO IMUS UNITED FC
            </p>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              DEVELOPING CHAMPIONS FOR THE FUTURE
            </h2>

            {/* Description */}
            <p className="text-lg text-white/90 leading-relaxed max-w-xl">
              Welcome to our vibrant football community, where we organize exciting matches, provide comprehensive training programs, and keep you informed with the latest club news and achievements.
            </p>

            {/* CTA Button and Founder Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
              
                href="/about"
                className="bg-blue-600 text-white px-8 py-4 font-bold uppercase tracking-wide rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                FIND OUT MORE
              </Link>
              
              {/* Founder Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/coaches/lee.webp"
                    alt="Founder"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">Club Founder</p>
                  <p className="text-sm text-white/80">Imus United FC</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
