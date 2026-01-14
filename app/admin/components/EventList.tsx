/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { motion } from 'framer-motion'
import { AdminEvent } from '../types'

interface EventListProps {
    events: AdminEvent[]
    handleEdit: (event: AdminEvent) => void
    handleDelete: (id: number, imageUrl: string | null) => void
    generateAttendanceLink: (eventId: number) => void
    handleViewAttendance: (id: number, title: string) => void
}

export default function EventList({ events, handleEdit, handleDelete, generateAttendanceLink, handleViewAttendance }: EventListProps) {
    const [copiedId, setCopiedId] = React.useState<number | null>(null)

    const handleLinkClick = (event: AdminEvent) => {
        if (event.attendance_token) {
            // Use query parameter format for static export compatibility
            const link = `${window.location.origin}/attendance?token=${event.attendance_token}`
            navigator.clipboard.writeText(link)

            // Show checkmark
            setCopiedId(event.id)
            setTimeout(() => setCopiedId(null), 2000)
        } else {
            generateAttendanceLink(event.id)
        }
    }

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl h-full flex flex-col"
            >
                <div className="flex items-center gap-3 mb-8">
                    <span className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)]"></span>
                    <h2 className="text-2xl font-bold text-white tracking-wide">RECENT EVENTS</h2>
                </div>

                <div className="space-y-4 h-[500px] lg:h-[calc(100vh-280px)] min-h-[400px] overflow-y-auto pr-2 custom-scrollbar flex-grow">
                    {events.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl bg-black/20">
                            <p className="text-gray-500">No events found. Add one on the left!</p>
                        </div>
                    ) : (
                        events.map((event) => (
                            <motion.div
                                layout
                                key={event.id}
                                className="flex items-center gap-4 p-4 bg-black/20 border border-white/5 rounded-xl hover:bg-white/5 transition-all group"
                            >
                                <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 relative border border-white/10">
                                    <div className={`absolute inset-0 flex items-center justify-center text-xs font-bold z-10 ${event.event_type === 'training' ? 'text-blue-400 bg-blue-900/40' : 'text-yellow-400 bg-yellow-900/40'
                                        }`}>
                                        {event.event_type === 'training' ? 'TRN' : 'CUP'}
                                    </div>
                                    <img src={event.image_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-white leading-tight truncate">{event.title}</h4>
                                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider flex items-center gap-2">
                                        <span className="truncate">{event.start_date}</span>
                                        <span className="w-1 h-1 bg-gray-600 rounded-full flex-shrink-0"></span>
                                        <span className={event.event_type === 'training' ? 'text-blue-400' : 'text-yellow-400'}>{event.event_type}</span>
                                    </p>
                                    {event.coach && (
                                        <p className="text-xs text-gray-500 mt-1 uppercase truncate">
                                            Coach(es): {event.coach}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all">
                                    {event.event_type === 'training' && (
                                        <button
                                            onClick={() => handleLinkClick(event)}
                                            className={`p-2 transition-colors duration-200 ${copiedId === event.id
                                                ? 'text-green-500 scale-110'
                                                : event.attendance_token
                                                    ? 'text-green-400 hover:text-green-300'
                                                    : 'text-purple-400 hover:text-purple-300'
                                                }`}
                                            title={event.attendance_token ? "Copy Attendance Link" : "Generate Attendance Link"}
                                        >
                                            {copiedId === event.id ? (
                                                /* Checkmark Icon */
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                /* Link or Generated Icon */
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {event.attendance_token ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                    )}
                                                </svg>
                                            )}
                                        </button>
                                    )}
                                    {event.event_type === 'training' && (
                                        <button
                                            onClick={() => handleViewAttendance(event.id, event.title)}
                                            className="text-blue-400 hover:text-blue-300 p-2"
                                            title="View Attendees"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleEdit(event)}
                                        className="text-gray-400 hover:text-blue-400 p-2"
                                        title="Edit Event"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event.id, event.image_url)}
                                        className="text-gray-400 hover:text-red-400 p-2"
                                        title="Delete Event"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>
        </div>
    )
}
