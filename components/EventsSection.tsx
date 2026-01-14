'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Event {
  id: number
  title: string
  location: string
  start_date: string // mapped from DB start_date
  start_time: string // mapped from DB start_time
  image_url: string // mapped from DB image_url
  event_type: 'training' | 'tournament' // from DB
}

export default function EventsSection() {
  const [trainingEvents, setTrainingEvents] = useState<Event[]>([])
  const [tournamentEvents, setTournamentEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error

        if (data) {
          // Map DB fields to Component fields if needed, or use directly
          // DB: title, location, start_date, start_time, price, image_url, event_type
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formattedEvents: Event[] = data.map((evt: any) => ({
            id: evt.id,
            title: evt.title,
            location: evt.location,
            start_date: evt.start_date,
            start_time: evt.start_time,
            image_url: evt.image_url,
            event_type: evt.event_type
          }))

          setTrainingEvents(formattedEvents.filter(e => e.event_type === 'training'))
          setTournamentEvents(formattedEvents.filter(e => e.event_type === 'tournament'))
        }
      } catch (err) {
        console.error('Error loading events:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pl-0 sm:pl-4 xl:pl-0">
          {/* Training Section */}
          <div className="flex flex-col">
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

            <div className="space-y-6 flex-grow ">
              {isLoading ? (
                <div className="text-white">Loading training schedules...</div>
              ) : trainingEvents.length === 0 ? (
                <div className="bg-white/10 p-6 rounded-lg text-white">No upcoming training sessions scheduled.</div>
              ) : (
                trainingEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))
              )}
            </div>
          </div>

          {/* Tournaments Section */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-xl md:text-2xl font-bold text-yellow-400 uppercase tracking-wider border-l-4 border-yellow-400 pl-4">
                TOURNAMENTS
              </h3>
            </motion.div>

            <div className="space-y-6 flex-grow">
              {isLoading ? (
                <div className="text-white">Loading tournaments...</div>
              ) : tournamentEvents.length === 0 ? (
                <div className="bg-white/10 p-6 rounded-lg text-white">No upcoming tournaments scheduled.</div>
              ) : (
                tournamentEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index + trainingEvents.length} />
                ))
              )}
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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-lg overflow-hidden shadow-2xl h-full flex flex-col"
    >
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row h-full">
        {/* Left Section - Event Details */}
        <div className="flex-1 p-6 relative flex flex-col justify-center">
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
                <p className="text-gray-700 text-xs md:text-sm font-semibold">{event.start_date}</p>
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
                <p className="text-gray-700 text-xs md:text-sm font-semibold">{event.start_time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full md:w-64 lg:w-full xl:w-64 h-48 md:h-auto lg:h-48 xl:h-auto flex-shrink-0">
          <div className="absolute inset-0">
            <Image
              src={event.image_url}
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
