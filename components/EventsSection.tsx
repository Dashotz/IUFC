'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { images } from '@/app/assets/images'

const events = [
  {
    id: 1,
    title: 'ROPA CUP - 1st Tournament 2026',
    location: 'Statefield Sports Field, Sta Rosa Laguna',
    date: 'JAN 17, 2026',
    time: 'START 06:00 AM - UNTIL FINISH',
    price: 600,
    image: images.team.event2,
  },
  {
    id: 2,
    title: 'OJAMS SPORTS MINI FOOTBALL FIESTA',
    location: 'AMPHITHEATER METRO GATE SILANG CAVITE',
    date: 'DEC 07, 2025',
    time: 'KICK OFF 08:00 AM | CALL TIME 07:30 AM',
    price: 500,
    image: images.team.event1,
  },
]

export default function EventsSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images.team.event}
          alt="Football Field Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900 px-6 py-4 mb-8"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase">
            FOOTBALL EVENTS COMING UP INCLUDE
          </h2>
        </motion.div>

        {/* Events Cards */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Section - Event Details */}
                <div className="flex-1 p-6 md:p-8 relative">
                  {/* Diagonal Green Stripe */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-barca-red transform -rotate-45 -translate-x-16 -translate-y-16"></div>
                  
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-3">
                      {/* Location */}
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className="text-gray-700 text-sm md:text-base">{event.location}</p>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-gray-700 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-gray-700 text-sm md:text-base font-semibold">{event.date}</p>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-gray-700 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-gray-700 text-sm md:text-base font-semibold">{event.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Section - Image */}
                <div className="relative w-full md:w-96 h-64 md:h-auto">
                  <div className="absolute inset-0">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Diagonal cut effect */}
                  <div className="absolute left-0 top-0 w-32 h-full bg-white transform -skew-x-12 -translate-x-8"></div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
