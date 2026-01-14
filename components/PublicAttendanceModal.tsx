'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'

interface AttendanceRecord {
    id: number
    attendee_name: string
    created_at: string
}

interface PublicAttendanceModalProps {
    eventId: number
    eventTitle: string
    onClose: () => void
}

export default function PublicAttendanceModal({ eventId, eventTitle, onClose }: PublicAttendanceModalProps) {
    const [attendees, setAttendees] = useState<AttendanceRecord[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchAttendees() {
            const { data, error } = await supabase
                .from('attendance_records')
                .select('id, attendee_name, created_at')
                .eq('event_id', eventId)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching attendance:', error)
            } else {
                setAttendees(data || [])
            }
            setLoading(false)
        }

        fetchAttendees()
    }, [eventId])

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh]"
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-0.5">Who's Going?</h3>
                        <p className="text-sm text-blue-600 font-bold uppercase">{eventTitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-200 rounded-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : attendees.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <p className="italic">Be the first to join!</p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {attendees.map((record, index) => (
                                <motion.li
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={record.id}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                        {record.attendee_name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-bold text-gray-700">{record.attendee_name}</span>
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {attendees.length} {attendees.length === 1 ? 'Player' : 'Players'} Confirmed
                    </span>
                </div>
            </motion.div>
        </div>
    )
}
