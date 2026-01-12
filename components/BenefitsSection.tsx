'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { images } from '@/app/assets/images'
import { videos } from '@/app/assets/videos'

const benefits = [
  {
    number: '01',
    title: 'Be Healthy',
    description: 'Improve your physical fitness and well-being through regular football training and matches.',
    position: 'top-left',
  },
  {
    number: '02',
    title: 'Feel Free',
    description: 'Experience the freedom of playing football, expressing yourself on the pitch, and challenging yourself.',
    position: 'bottom-left',
  },
  {
    number: '03',
    title: 'Be One Of Us',
    description: 'Join a supportive community of like-minded footballers and achieve goals together as a team.',
    position: 'top-right',
  },
  {
    number: '04',
    title: 'Be Strong',
    description: 'Build resilience and mental toughness as you push your limits and compete at higher levels.',
    position: 'bottom-right',
  },
]

export default function BenefitsSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <section className="bg-gray-900 py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-600 uppercase">
            BENEFITS OF FOOTBALL
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Column - Two Benefits */}
            <div className="space-y-12 lg:space-y-16">
              {benefits
                .filter((b) => b.position.includes('left'))
                .map((benefit, index) => (
                  <motion.div
                    key={benefit.number}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3">
                          {benefit.title}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-px h-16 bg-gray-700 mb-2"></div>
                        <span className="text-4xl md:text-5xl font-black text-white">
                          {benefit.number}
                        </span>
                      </div>
                    </div>
                    {/* Connection line to center */}
                    <div className="absolute right-0 top-1/2 w-8 h-px bg-gray-700 hidden lg:block">
                      <div className="absolute right-0 top-1/2 w-2 h-2 bg-barca-red rounded-full -translate-y-1/2"></div>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Center Column - Circular Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center my-8 lg:my-0"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-full border-8 border-amber-900 shadow-2xl"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <Image
                    src={images.team.benefits}
                    alt="Imus United FC - Team in Action"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    onClick={() => setIsVideoOpen(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer border-2 border-white/30"
                    aria-label="Play video"
                  >
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Two Benefits */}
            <div className="space-y-12 lg:space-y-16">
              {benefits
                .filter((b) => b.position.includes('right'))
                .map((benefit, index) => (
                  <motion.div
                    key={benefit.number}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <span className="text-4xl md:text-5xl font-black text-white">
                          {benefit.number}
                        </span>
                        <div className="w-px h-16 bg-gray-700 mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3">
                          {benefit.title}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                    {/* Connection line to center */}
                    <div className="absolute left-0 top-1/2 w-8 h-px bg-gray-700 hidden lg:block">
                      <div className="absolute left-0 top-1/2 w-2 h-2 bg-barca-red rounded-full -translate-y-1/2"></div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl mx-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                aria-label="Close video"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Video Player */}
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  src={videos.benefits}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
