'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Event {
  id: number
  title: string
  location: string
  date: string
  time: string
  price: number | string
  image: string
}

const trainingEvents: Event[] = [
  {
    id: 101,
    title: 'REGULAR TRAINING SESSION',
    location: 'Statefield Sports Field',
    date: 'EVERY WEEKEND',
    time: '07:00 AM - 09:00 AM',
    price: 'MEMBERS ONLY',
    image: '/images/training/training1.webp', // Assuming this exists or using a fallback
  },
]

const tournamentEvents: Event[] = [
  {
    id: 1,
    title: 'ROPA CUP - 1st Tournament 2026',
    location: 'Statefield Sports Field, Sta Rosa Laguna',
    date: 'JAN 17, 2026',
    time: 'START 06:00 AM - UNTIL FINISH',
    price: 600,
    image: '/images/team/event2.webp',
  },
  {
    id: 2,
    title: 'OJAMS SPORTS MINI FOOTBALL FIESTA',
    location: 'AMPHITHEATER METRO GATE SILANG CAVITE',
    date: 'DEC 07, 2025',
    time: 'KICK OFF 08:00 AM | CALL TIME 07:30 AM',
    price: 500,
    image: '/images/team/event1.webp',
  },
]

export default function EventsSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/team/event.webp"
          alt="Football Field Background"
          fill
          className="object-cover"
          quality={70}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900 px-6 py-4 mb-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase">
            FOOTBALL EVENTS & TRAINING
          </h2>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Training Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-xl md:text-2xl font-bold text-barca-red uppercase tracking-wider border-l-4 border-barca-red pl-4">
                TRAINING SCHEDULE
              </h3>
            </motion.div>

            <div className="space-y-6">
              {trainingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </div>

          {/* Tournaments Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-xl md:text-2xl font-bold text-yellow-400 uppercase tracking-wider border-l-4 border-yellow-400 pl-4">
                EVENT TOURNAMENTS
              </h3>
            </motion.div>

            <div className="space-y-6">
              {tournamentEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index + trainingEvents.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }} // Reduced delay for smoother load
      className="bg-white rounded-lg overflow-hidden shadow-2xl h-full"
    >
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row h-full">
        {/* Left Section - Event Details */}
        <div className="flex-1 p-6 relative">
          {/* Diagonal Green Stripe */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-barca-red transform -rotate-45 -translate-x-12 -translate-y-12"></div>

          <div className="relative z-10 space-y-4">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 leading-tight">
              {event.title}
            </h3>

            <div className="space-y-2">
              {/* Location */}
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-gray-700 mt-1 flex-shrink-0"
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
                <p className="text-gray-700 text-xs md:text-sm">{event.location}</p>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-700 flex-shrink-0"
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
                <p className="text-gray-700 text-xs md:text-sm font-semibold">{event.date}</p>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-700 flex-shrink-0"
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
                <p className="text-gray-700 text-xs md:text-sm font-semibold">{event.time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full md:w-64 lg:w-full xl:w-64 h-48 md:h-auto lg:h-48 xl:h-auto flex-shrink-0">
          <div className="absolute inset-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 256px, (max-width: 1280px) 100vw, 256px"
              quality={75}
              loading="lazy"
            />
          </div>
          {/* Diagonal cut effect for row layouts */}
          <div className="hidden md:block lg:hidden xl:block absolute left-0 top-0 w-16 h-full bg-white transform -skew-x-12 -translate-x-8"></div>
          {/* Diagonal cut effect for column layouts */}
          <div className="md:hidden lg:block xl:hidden absolute top-0 left-0 w-full h-16 bg-white transform -skew-y-6 -translate-y-8"></div>
        </div>
      </div>
    </motion.div>
  )
}
