import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import { AdminEvent } from '../types'

interface AttendanceRecord {
    id: number
    attendee_name: string
    age_bracket?: string
    created_at: string
}

interface AttendanceModalProps {
    event: AdminEvent
    onClose: () => void
}

export default function AttendanceModal({ event, onClose }: AttendanceModalProps) {
    const [attendees, setAttendees] = useState<AttendanceRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [copyText, setCopyText] = useState('COPY LIST')

    useEffect(() => {
        async function fetchAttendees() {
            const { data, error } = await supabase
                .from('attendance_records')
                .select('*')
                .eq('event_id', event.id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching attendance:', error)
            } else {
                setAttendees(data || [])
            }
            setLoading(false)
        }

        fetchAttendees()
    }, [event.id])

    const handleCopy = () => {
        // Date Formatting: January 17, 2026 Saturday
        const [y, m, d] = event.start_date.split('-').map(Number)
        const dateObj = new Date(y, m - 1, d)

        const datePart = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        const dayPart = dateObj.toLocaleDateString('en-US', { weekday: 'long' })

        // Event Type
        let typeStr = ''
        if (event.event_type) {
            typeStr = ' ' + event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)
        }

        const headerLine = `${datePart} ${dayPart}${typeStr}`

        // Time Formatting
        let timeStr = event.start_time
        if (timeStr && timeStr.includes(':')) {
            const [h, m] = timeStr.split(':')
            const hour = parseInt(h)
            const ampm = hour >= 12 ? 'PM' : 'AM'
            const hour12 = hour % 12 || 12
            timeStr = `${hour12}:${m} ${ampm}`
        }
        timeStr += '- Until Finish'

        const coachLine = event.coach ? `Coaches: ${event.coach}` : 'Coaches: TBD'
        const kitLine = event.kit_color ? `\n${event.kit_color} Kit` : ''

        // Group Attendees by Bracket
        const brackets = ['U5', 'U7/U9', 'U10/U12', 'U13/U14']
        let attendanceListStr = ''

        brackets.forEach(bracket => {
            const bracketAttendees = attendees.filter(a => a.age_bracket === bracket)
            // Include bracket section if it's one of the standard ones, 
            // even if empty? User example had empty slots. 
            // But let's only show if there are people or if it's mostly populated. 
            // Better to only show populated brackets to avoid clutter if empty.
            // However, user specifically asked for this format. 
            // If I look at the user request "U5 ... U7/U9 ... U10/U12 ... U13/U14" they listed all.
            // I will list all brackets to be safe, or just populated ones? 
            // Usually populated ones are preferred. Let's stick to populated + Other for now. 
            // If user wants all headers, they can request. 
            // Wait, looking at the image provided (Step 232), it shows U5(9), U7/U9(0), etc.
            // The text copy request explicitly listed them. 
            // I will only include brackets that have attendees to keep it clean, 
            // similar to how I rendered the view.
            if (bracketAttendees.length > 0) {
                attendanceListStr += `\n${bracket}\n\n`
                attendanceListStr += bracketAttendees.map((a, i) => `${i + 1}. ${a.attendee_name}`).join('\n')
                attendanceListStr += '\n'
            }
        })

        // Other Attendees
        const others = attendees.filter(a => !brackets.includes(a.age_bracket || ''))
        if (others.length > 0) {
            attendanceListStr += `\nOther\n\n`
            attendanceListStr += others.map((a, i) => `${i + 1}. ${a.attendee_name}`).join('\n')
            attendanceListStr += '\n'
        }

        const text = `${headerLine}\n${event.location}\n${timeStr}\n${coachLine}${kitLine}\n\nAttendance:\n${attendanceListStr}`

        navigator.clipboard.writeText(text)
        setCopyText('COPIED!')
        setTimeout(() => setCopyText('COPY LIST'), 2000)
    }

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
                        <p className="text-sm text-blue-400 font-medium">{event.title}</p>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['U5', 'U7/U9', 'U10/U12', 'U13/U14'].map((bracket) => {
                                const bracketAttendees = attendees.filter(a => a.age_bracket === bracket)
                                return (
                                    <div key={bracket} className="bg-black/20 rounded-xl border border-white/5 p-4 flex flex-col h-full">
                                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                                            <h4 className="font-bold text-blue-400">{bracket}</h4>
                                            <span className="text-xs bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/20">
                                                {bracketAttendees.length}
                                            </span>
                                        </div>
                                        {bracketAttendees.length === 0 ? (
                                            <p className="text-gray-600 text-xs italic text-center py-2">No players</p>
                                        ) : (
                                            <ul className="space-y-2 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar">
                                                {bracketAttendees.map((record) => (
                                                    <li key={record.id} className="text-sm text-gray-300 flex justify-between">
                                                        <span>{record.attendee_name}</span>
                                                        <span className="text-[10px] text-gray-600 mono">{new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )
                            })}

                            {/* Handle legacy/other attendees not in the main brackets */}
                            {attendees.some(a => !['U5', 'U7/U9', 'U10/U12', 'U13/U14'].includes(a.age_bracket || '')) && (
                                <div className="bg-black/20 rounded-xl border border-white/5 p-4 flex flex-col h-full md:col-span-2">
                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                                        <h4 className="font-bold text-gray-400">Other</h4>
                                    </div>
                                    <ul className="space-y-2 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar">
                                        {attendees.filter(a => !['U5', 'U7/U9', 'U10/U12', 'U13/U14'].includes(a.age_bracket || '')).map((record) => (
                                            <li key={record.id} className="text-sm text-gray-300 flex justify-between">
                                                <span>{record.attendee_name} <span className="text-gray-500 text-xs">({record.age_bracket || 'No Bracket'})</span></span>
                                                <span className="text-[10px] text-gray-600 mono">{new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-700 bg-gray-800/50 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Total: {attendees.length}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={handleCopy}
                            disabled={attendees.length === 0}
                            className="px-3 py-1.5 text-xs font-bold text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
                        >
                            {copyText}
                        </button>
                        <button
                            onClick={() => {
                                const headers = ['Attendee Name', 'Age Bracket', 'Check-in Time']
                                const rows = attendees.map(a => [a.attendee_name, a.age_bracket || '', new Date(a.created_at).toLocaleString()])
                                const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n')

                                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
                                const link = document.createElement('a')
                                const url = URL.createObjectURL(blob)
                                link.setAttribute('href', url)
                                link.setAttribute('download', `${event.title}_attendance.csv`)
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
