'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import PublicAttendanceModal from './PublicAttendanceModal'

interface Event {
  id: number
  title: string
  location: string
  start_date: string // mapped from DB start_date
  start_time: string // mapped from DB start_time
  image_url: string // mapped from DB image_url
  event_type: 'training' | 'tournament' // from DB
  coach?: string // mapped from DB coach
}

export default function EventsSection() {
  const [trainingEvents, setTrainingEvents] = useState<Event[]>([])
  const [tournamentEvents, setTournamentEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewEvent, setViewEvent] = useState<{ id: number; title: string } | null>(null)

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
          // DB: title, location, start_date, start_time, price, image_url, event_type, coach
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formattedEvents: Event[] = data.map((evt: any) => ({
            id: evt.id,
            title: evt.title,
            location: evt.location,
            start_date: evt.start_date,
            start_time: evt.start_time,
            image_url: evt.image_url,
            event_type: evt.event_type,
            coach: evt.coach
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
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

            <div className="space-y-6 flex-grow max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
              {isLoading ? (
                <div className="text-white">Loading training schedules...</div>
              ) : trainingEvents.length === 0 ? (
                <div className="bg-white/10 p-6 rounded-lg text-white">No upcoming training sessions scheduled.</div>
              ) : (
                trainingEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={index}
                    onViewAttendees={(id, title) => setViewEvent({ id, title })}
                  />
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

            <div className="space-y-6 flex-grow max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
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

      {viewEvent && (
        <PublicAttendanceModal
          eventId={viewEvent.id}
          eventTitle={viewEvent.title}
          onClose={() => setViewEvent(null)}
        />
      )}
    </section>
  )
}

function EventCard({ event, index, onViewAttendees }: { event: Event; index: number; onViewAttendees?: (id: number, title: string) => void }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    try {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) return dateStr.toUpperCase() // Fallback to uppercase raw string
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
    } catch (e) {
      return dateStr.toUpperCase()
    }
  }

  const formatTime = (timeStr: string) => {
    if (!timeStr) return ''
    if (timeStr.includes(':') && timeStr.length <= 8) { // Simple check for HH:mm or HH:mm:ss
      const [h, m] = timeStr.split(':')
      const hour = parseInt(h)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const hour12 = hour % 12 || 12
      return `${hour12}:${m} ${ampm}`
    }
    return timeStr.toUpperCase()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col min-h-[220px]"
    >
      <div className="flex flex-col sm:flex-row h-full flex-grow">
        {/* Left Section - Event Details */}
        <div className="flex-1 p-6 relative flex flex-col justify-center">
          {/* Diagonal Red Stripe */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-barca-red transform -rotate-45 -translate-x-12 -translate-y-12"></div>

          <div className="relative z-10 space-y-4">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 leading-tight uppercase">
              {event.title}
            </h3>

            <div className={event.event_type === 'training' ? "grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3" : "space-y-2"}>
              {/* Location */}
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-700 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-700 text-xs md:text-sm uppercase font-medium">{event.location}</p>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-700 text-xs md:text-sm font-semibold uppercase">{formatDate(event.start_date)}</p>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700 text-xs md:text-sm font-semibold uppercase">{formatTime(event.start_time)}</p>
              </div>

              {/* Coach */}
              {event.coach && (
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-700 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <span className="text-gray-500 text-[10px] font-bold uppercase block leading-none mb-0.5">Coach(es)</span>
                    <p className="text-gray-700 text-xs md:text-sm font-semibold uppercase">{event.coach}</p>
                  </div>
                </div>
              )}
            </div>

            {/* View Attendees Button (Training Only) */}
            {event.event_type === 'training' && onViewAttendees && (
              <button
                onClick={() => onViewAttendees(event.id, event.title)}
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors border border-blue-200 uppercase"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                WHO'S GOING?
              </button>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full sm:w-1/3 h-48 sm:h-auto flex-shrink-0">
          <div className="absolute inset-0">
            <Image
              src={event.image_url || '/images/team/event1.webp'}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={75}
              loading="lazy"
            />
          </div>
          {/* Diagonal cut effect for row layout (visible on sm+) */}
          <div className="hidden sm:block absolute left-0 top-0 w-16 h-full bg-white transform -skew-x-12 -translate-x-8 z-10"></div>
          {/* Diagonal cut effect for column layout (visible on mobile only) */}
          <div className="sm:hidden absolute top-0 left-0 w-full h-16 bg-white transform -skew-y-3 -translate-y-8 z-10"></div>
        </div>
      </div>
    </motion.div>
  )
}
