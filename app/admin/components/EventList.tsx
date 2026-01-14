/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { motion } from 'framer-motion'
import { AdminEvent } from '../types'

interface EventListProps {
    events: AdminEvent[]
    handleEdit: (event: AdminEvent) => void
    handleDelete: (id: number, imageUrl: string | null) => void
    generateAttendanceLink: (eventId: number) => void
    handleViewAttendance: (event: AdminEvent) => void
}

export default function EventList({ events, handleEdit, handleDelete, generateAttendanceLink, handleViewAttendance }: EventListProps) {
    const [copiedId, setCopiedId] = React.useState<number | null>(null)
    const [tournPage, setTournPage] = React.useState(1)
    const [trnPage, setTrnPage] = React.useState(1)
    const ITEMS_PER_PAGE = 5

    const handleLinkClick = (event: AdminEvent) => {
        if (event.attendance_token) {
            const link = `${window.location.origin}/attendance?token=${event.attendance_token}`
            navigator.clipboard.writeText(link)
            setCopiedId(event.id)
            setTimeout(() => setCopiedId(null), 2000)
        } else {
            generateAttendanceLink(event.id)
        }
    }

    if (events.length === 0) {
        return (
            <div className="text-center py-20 border-2 border-dashed border-gray-700 rounded-3xl bg-black/20 h-full flex flex-col justify-center items-center">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-gray-400 text-xl font-medium">No events found</p>
                <p className="text-gray-500 text-sm mt-2">Get started by creating a new event!</p>
            </div>
        )
    }

    const tournaments = events.filter(e => e.event_type === 'tournament')
    const trainings = events.filter(e => e.event_type === 'training')

    // Derived Logic for Pagination
    const totalTournPages = Math.ceil(tournaments.length / ITEMS_PER_PAGE) || 1
    const totalTrnPages = Math.ceil(trainings.length / ITEMS_PER_PAGE) || 1

    // Ensure current page is valid
    const currentTournPage = Math.min(Math.max(1, tournPage), totalTournPages)
    const currentTrnPage = Math.min(Math.max(1, trnPage), totalTrnPages)

    const paginatedTournaments = tournaments.slice((currentTournPage - 1) * ITEMS_PER_PAGE, currentTournPage * ITEMS_PER_PAGE)
    const paginatedTrainings = trainings.slice((currentTrnPage - 1) * ITEMS_PER_PAGE, currentTrnPage * ITEMS_PER_PAGE)

    const PaginationControls = ({ page, totalPages, setPage }: { page: number, totalPages: number, setPage: (p: number) => void }) => {
        if (totalPages <= 1) return null
        return (
            <div className="flex justify-between items-center p-3 border-t border-white/5 bg-black/20 mt-auto shrink-0">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="text-xs font-bold text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 uppercase transition-colors"
                >
                    Previous
                </button>
                <span className="text-xs text-gray-500 font-mono">Page {page} of {totalPages}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="text-xs font-bold text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 uppercase transition-colors"
                >
                    Next
                </button>
            </div>
        )
    }

    const renderCompactCard = (event: AdminEvent) => (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={event.id}
            className="bg-[#1a202c] border border-gray-700/50 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all hover:shadow-lg group flex h-32 shrink-0 relative"
        >
            {/* Image Left */}
            <div className="w-32 relative bg-gray-800 shrink-0">
                <img
                    src={event.image_url}
                    alt=""
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a202c]/50"></div>
            </div>

            {/* Content Right */}
            <div className="p-3 flex-1 flex flex-col min-w-0 justify-between relative z-10">
                <div>
                    <h4 className="font-bold text-white text-base leading-tight truncate mb-1">{event.title}</h4>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <span>📅 {event.start_date}</span>
                        <span>⏰ {event.start_time}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    {/* Event Type Badge */}
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${event.event_type === 'training'
                        ? 'bg-blue-900/40 text-blue-400 border border-blue-500/20'
                        : 'bg-yellow-900/40 text-yellow-400 border border-yellow-500/20'
                        }`}>
                        {event.event_type}
                    </span>

                    {/* Actions */}
                    <div className="flex gap-1 relative z-20">
                        {event.event_type === 'training' && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleLinkClick(event) }}
                                    className={`p-1.5 rounded-md transition-all cursor-pointer ${copiedId === event.id ? 'bg-green-500/20 text-green-400' : 'hover:bg-gray-700 text-gray-400 hover:text-white'}`}
                                    title="Attendance Link"
                                >
                                    {copiedId === event.id ? (
                                        <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    ) : (
                                        <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    )}
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleViewAttendance(event) }}
                                    className="p-1.5 rounded-md hover:bg-gray-700 text-gray-400 hover:text-blue-400 transition-all cursor-pointer"
                                    title="View Attendees"
                                >
                                    <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                </button>
                            </>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); handleEdit(event) }} className="p-1.5 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-all cursor-pointer">
                            <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(event.id, event.image_url);
                            }}
                            className="p-1.5 rounded-md hover:bg-gray-700 text-gray-400 hover:text-red-400 transition-all cursor-pointer relative z-50 bg-red-500/10"
                        >
                            <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-0">
            {/* Tournaments Pane */}
            <div className="flex flex-col bg-white/5 border border-white/5 rounded-2xl overflow-hidden h-full">
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20 shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span>
                        <h3 className="font-bold text-gray-200 uppercase tracking-wider text-sm">Tournaments</h3>
                    </div>
                    <span className="bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded-full font-mono">{tournaments.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
                    {tournaments.length > 0 ? paginatedTournaments.map(renderCompactCard) : (
                        <p className="text-gray-500 text-xs text-center italic py-4">No tournaments scheduled</p>
                    )}
                </div>
                <PaginationControls page={currentTournPage} totalPages={totalTournPages} setPage={setTournPage} />
            </div>

            {/* Trainings Pane */}
            <div className="flex flex-col bg-white/5 border border-white/5 rounded-2xl overflow-hidden h-full">
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20 shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                        <h3 className="font-bold text-gray-200 uppercase tracking-wider text-sm">Trainings</h3>
                    </div>
                    <span className="bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded-full font-mono">{trainings.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
                    {trainings.length > 0 ? paginatedTrainings.map(renderCompactCard) : (
                        <p className="text-gray-500 text-xs text-center italic py-4">No training sessions scheduled</p>
                    )}
                </div>
                <PaginationControls page={currentTrnPage} totalPages={totalTrnPages} setPage={setTrnPage} />
            </div>
        </div>
    )
}
