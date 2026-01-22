'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'

interface TrainingEvent {
    id: number
    title: string
    start_date: string
    start_time: string
    location: string
    event_type: string
    kit_color?: string
    token_expires_at?: string
}

function AttendanceForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [event, setEvent] = useState<TrainingEvent | null>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [name, setName] = useState('')
    const [ageBracket, setAgeBracket] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchEvent() {
            if (!token) {
                setError('Invalid link')
                setLoading(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('id, title, start_date, start_time, location, event_type, kit_color, token_expires_at')
                    .eq('attendance_token', token)
                    .single()

                if (error || !data) throw new Error('Event not found or link expired')

                // Check if token has expired
                if (data.token_expires_at) {
                    const expirationDate = new Date(data.token_expires_at)
                    if (expirationDate < new Date()) {
                        throw new Error('This attendance link has expired. Please contact the admin for a new link.')
                    }
                }

                if (data.event_type !== 'training') {
                    throw new Error('This event type does not support attendance tracking')
                }

                setEvent(data as TrainingEvent)
            } catch (err: any) {
                setError(err.message || 'Error loading event')
            } finally {
                setLoading(false)
            }
        }

        fetchEvent()
    }, [token])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !ageBracket || !event) return

        setSubmitting(true)
        try {
            const { error } = await supabase
                .from('attendance_records')
                .insert([
                    {
                        event_id: event.id,
                        attendee_name: name.trim(),
                        age_bracket: ageBracket
                    }
                ])

            if (error) throw error

            setSubmitted(true)
        } catch (err: any) {
            console.error(err)
            alert('Failed to submit attendance: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a1628] flex items-center justify-center text-white">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl text-center max-w-md w-full">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-red-500 mb-2">Unavailable</h2>
                    <p className="text-gray-400">{error || 'Event not found'}</p>
                </div>
            </div>
        )
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-500/10 border border-green-500/20 p-8 rounded-2xl text-center max-w-md w-full"
                >
                    <div className="text-5xl mb-6">✅</div>
                    <h2 className="text-2xl font-bold text-green-400 mb-2">You're Checked In!</h2>
                    <p className="text-gray-400 mb-6">Thank you for attending <strong>{event.title}</strong>.</p>
                    <p className="text-sm text-gray-500">See you on the field!</p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Element */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <span className="inline-block px-3 py-1 bg-blue-900/40 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
                        Attendance Check-in
                    </span>
                    <h1 className="text-2xl font-bold text-white mb-2">{event.title}</h1>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
                            <span className="flex items-center gap-1">
                                📅 {new Date(event.start_date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                                ⏰ {event.start_time.slice(0, 5)}
                            </span>
                        </div>
                        {event.kit_color && (
                            <div className="flex items-center justify-center gap-2">
                                <span className="bg-white/10 text-gray-200 text-xs px-3 py-1 rounded-full border border-white/5 font-medium flex items-center gap-2">
                                    👕 Kit: <span className="text-white font-bold">{event.kit_color}</span>
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-4 bg-black/40 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-600 text-lg"
                            placeholder="Enter your name..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Age Bracket
                        </label>
                        <div className="relative">
                            <select
                                value={ageBracket}
                                onChange={(e) => setAgeBracket(e.target.value)}
                                required
                                className="w-full px-4 py-4 bg-black/40 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none text-lg cursor-pointer"
                            >
                                <option value="" disabled className="text-gray-500">Select Age Bracket</option>
                                <option value="U5">U5</option>
                                <option value="U7/U9">U7/U9</option>
                                <option value="U10/U12">U10/U12</option>
                                <option value="U13/U14">U13/U14</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-wait"
                    >
                        {submitting ? 'Checking In...' : 'CONFIRM ATTENDANCE'}
                    </button>

                    <p className="text-center text-xs text-gray-500 mt-4">
                        Please ensure you entered your full name correctly.
                    </p>
                </form>
            </motion.div>
        </div>
    )
}

export default function AttendancePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a1628] flex items-center justify-center text-white">Loading...</div>}>
            <AttendanceForm />
        </Suspense>
    )
}
