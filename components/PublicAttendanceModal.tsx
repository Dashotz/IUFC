'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'

interface AttendanceRecord {
    id: number
    attendee_name: string
    age_bracket?: string
    created_at: string
}

interface PublicAttendanceModalProps {
    eventId: number
    eventTitle: string
    kitColor?: string
    onClose: () => void
}

export default function PublicAttendanceModal({ eventId, eventTitle, kitColor, onClose }: PublicAttendanceModalProps) {
    const [attendees, setAttendees] = useState<AttendanceRecord[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchAttendees() {
            const { data, error } = await supabase
                .from('attendance_records')
                .select('id, attendee_name, created_at, age_bracket')
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
                        {kitColor && (
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
                                    👕 Kit: <span className="text-gray-900 font-bold">{kitColor}</span>
                                </span>
                            </div>
                        )}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['U5', 'U7/U9', 'U10/U12', 'U13/U14'].map((bracket) => {
                                const bracketAttendees = attendees.filter(a => a.age_bracket === bracket)
                                return (
                                    <div key={bracket} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col h-full">
                                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                                            <h4 className="font-bold text-blue-600">{bracket}</h4>
                                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                                                {bracketAttendees.length}
                                            </span>
                                        </div>
                                        {bracketAttendees.length === 0 ? (
                                            <p className="text-gray-400 text-xs italic text-center py-2">No players</p>
                                        ) : (
                                            <ul className="space-y-2 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar">
                                                {bracketAttendees.map((record) => (
                                                    <li key={record.id} className="text-sm text-gray-600 flex items-center gap-2">
                                                        <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-[8px] shadow-sm shrink-0">
                                                            {record.attendee_name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="truncate">{record.attendee_name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )
                            })}

                            {/* Handle legacy/other attendees not in the main brackets */}
                            {attendees.some(a => !['U5', 'U7/U9', 'U10/U12', 'U13/U14'].includes(a.age_bracket || '')) && (
                                <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col h-full md:col-span-2">
                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                                        <h4 className="font-bold text-gray-500">Other</h4>
                                    </div>
                                    <ul className="space-y-2 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar">
                                        {attendees.filter(a => !['U5', 'U7/U9', 'U10/U12', 'U13/U14'].includes(a.age_bracket || '')).map((record) => (
                                            <li key={record.id} className="text-sm text-gray-600 flex items-center gap-2">
                                                <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-[8px] shadow-sm shrink-0">
                                                    {record.attendee_name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="truncate">
                                                    {record.attendee_name}
                                                    <span className="text-gray-400 text-xs ml-1">
                                                        {record.age_bracket ? `(${record.age_bracket})` : '(No Age Bracket)'}
                                                    </span>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
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
