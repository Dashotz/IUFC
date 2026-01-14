import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'

interface AttendanceRecord {
    id: number
    attendee_name: string
    created_at: string
}

interface AttendanceModalProps {
    eventId: number
    eventTitle: string
    onClose: () => void
}

export default function AttendanceModal({ eventId, eventTitle, onClose }: AttendanceModalProps) {
    const [attendees, setAttendees] = useState<AttendanceRecord[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchAttendees() {
            const { data, error } = await supabase
                .from('attendance_records')
                .select('*')
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
                className="bg-[#1a202c] border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh]"
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-700 bg-gray-800/50 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">Attendance List</h3>
                        <p className="text-sm text-blue-400 font-medium">{eventTitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
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
                            <p>No attendees yet.</p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {attendees.map((record, index) => (
                                <motion.li
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={record.id}
                                    className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    <span className="font-medium text-gray-200">{record.attendee_name}</span>
                                    <span className="text-xs text-gray-500 mono">
                                        {new Date(record.created_at).toLocaleString()}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-700 bg-gray-800/50 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Total: {attendees.length}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                const text = attendees.map(a => `${a.attendee_name} - ${new Date(a.created_at).toLocaleString()}`).join('\n')
                                navigator.clipboard.writeText(text)
                                alert('List copied to clipboard!')
                            }}
                            disabled={attendees.length === 0}
                            className="px-3 py-1.5 text-xs font-bold text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            COPY LIST
                        </button>
                        <button
                            onClick={() => {
                                const headers = ['Attendee Name', 'Check-in Time']
                                const rows = attendees.map(a => [a.attendee_name, new Date(a.created_at).toLocaleString()])
                                const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n')

                                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
                                const link = document.createElement('a')
                                const url = URL.createObjectURL(blob)
                                link.setAttribute('href', url)
                                link.setAttribute('download', `${eventTitle}_attendance.csv`)
                                link.style.visibility = 'hidden'
                                document.body.appendChild(link)
                                link.click()
                                document.body.removeChild(link)
                            }}
                            disabled={attendees.length === 0}
                            className="px-3 py-1.5 text-xs font-bold text-green-400 bg-green-900/20 hover:bg-green-900/30 rounded-lg border border-green-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            EXPORT CSV
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
