'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
// eslint-disable-next-line @next/next/no-img-element
import Image from 'next/image'

interface AdminEvent {
    id: number
    title: string
    event_type: 'tournament' | 'training'
    location: string
    start_date: string
    start_time: string
    image_url: string
    created_at: string
}

export default function AdminPage() {
    const [session, setSession] = useState<any>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [events, setEvents] = useState<AdminEvent[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState({
        title: '',
        event_type: 'tournament',
        location: '',
        start_date: '',
        start_time: '',
        image_url: '/images/team/event1.webp'
    })

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        if (session) {
            fetchEvents()
        }
    }, [session])

    const fetchEvents = async () => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20)

        if (data) setEvents(data)
        if (error) console.error('Error fetching events:', error.message)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMsg('')

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setErrorMsg(error.message)
        }

        setLoading(false)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData(prev => {
            const newData = { ...prev, [name]: value }

            // Auto-populate title for Training events when date changes
            if (newData.event_type === 'training' && name === 'start_date' && value) {
                const date = new Date(value)
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
                newData.title = `${dayName} Training`
            }

            // Re-trigger auto-population if switching TO training and a date exists
            if (name === 'event_type' && value === 'training' && newData.start_date) {
                const date = new Date(newData.start_date)
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
                newData.title = `${dayName} Training`
            }

            // Clear title if switching to tournament so user can type
            if (name === 'event_type' && value === 'tournament') {
                newData.title = ''
            }

            return newData
        })
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return

            const file = e.target.files[0]
            setUploading(true)

            const webpBlob = await convertToWebP(file)
            const fileExt = 'webp'
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
            const filePath = `training/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, webpBlob, {
                    contentType: 'image/webp',
                    upsert: false
                })

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath)

            setFormData(prev => ({ ...prev, image_url: publicUrl }))

        } catch (error: any) {
            alert('Error uploading image: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    const convertToWebP = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img')
            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    reject(new Error('Could not get canvas context'))
                    return
                }
                ctx.drawImage(img, 0, 0)
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob)
                    else reject(new Error('Conversion to WebP failed'))
                }, 'image/webp', 0.8)
            }
            img.onerror = (e) => reject(e)
            img.src = URL.createObjectURL(file)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase
            .from('events')
            .insert([{
                title: formData.title,
                event_type: formData.event_type,
                location: formData.location,
                start_date: formData.start_date,
                start_time: formData.start_time,
                image_url: formData.image_url
            }])

        setLoading(false)

        if (error) {
            alert('Error creating event: ' + error.message)
        } else {
            alert('Event created successfully!')
            setFormData({
                title: '',
                event_type: 'tournament',
                location: '',
                start_date: '',
                start_time: '',
                image_url: '/images/team/event1.webp'
            })
            if (fileInputRef.current) fileInputRef.current.value = ''
            fetchEvents()
        }
    }

    const deleteEvent = async (id: number) => {
        if (!confirm('Are you sure you want to delete this event?')) return

        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id)

        if (error) {
            alert('Error deleting event: ' + error.message)
        } else {
            fetchEvents()
        }
    }

    // Background Component
    const AdminBackground = () => (
        <div className="fixed inset-0 z-0 select-none pointer-events-none">
            <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/global/image-bg.webp"
                    alt=""
                    className="w-full h-full object-cover opacity-40"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/95 via-[#0a1628]/85 to-[#0a1628]/95 backdrop-blur-sm"></div>
        </div>
    )

    if (!session) {
        return (
            <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-4 relative overflow-hidden">
                <AdminBackground />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full relative z-10"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-white mb-2">ADMIN ACCESS</h1>
                        <p className="text-gray-400 text-sm">Welcome back, Captain.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Error Message Display */}
                        {errorMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm text-center font-medium"
                            >
                                {errorMsg}
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-600"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-600"
                                placeholder="Enter admin password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-700 to-red-700 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-red-900/20 transition-all transform hover:scale-[1.02] disabled:opacity-50"
                        >
                            {loading ? 'SIGNING IN...' : 'ACCESS DASHBOARD'}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                            ← Back to Website
                        </Link>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a1628] text-white relative flex flex-col font-sans">
            <AdminBackground />

            {/* Navbar */}
            <nav className="bg-black/20 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-red-600 rounded-lg shadow-lg shadow-blue-900/50"></div>
                        <h1 className="text-xl font-black tracking-wide">IUFC <span className="text-gray-400 font-normal">DASHBOARD</span></h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-xs font-bold text-gray-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 uppercase tracking-wider"
                    >
                        LOGOUT
                    </button>
                </div>
            </nav>

            <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full">
                    {/* Add Event Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl h-fit"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <span className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span>
                            <h2 className="text-2xl font-bold text-white tracking-wide">ADD NEW EVENT</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Event Title</label>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        type="text"
                                        required
                                        disabled={formData.event_type === 'training'}
                                        className={`w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-600 ${formData.event_type === 'training' ? 'opacity-50 cursor-not-allowed text-gray-400' : ''}`}
                                        placeholder={formData.event_type === 'training' ? "Auto-generated (Select Date)" : "e.g. Summer Cup"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Type</label>
                                    <div className="relative">
                                        <select
                                            name="event_type"
                                            value={formData.event_type}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="tournament">Tournament</option>
                                            <option value="training">Training</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            ▼
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Location</label>
                                <div className="flex bg-black/40 border border-gray-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 transition-all">
                                    <div className="px-4 py-3 bg-white/5 text-gray-400 border-r border-gray-700">📍</div>
                                    <input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-transparent text-white outline-none placeholder-gray-600"
                                        placeholder="Venue Address"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date</label>
                                    <input
                                        name="start_date"
                                        value={formData.start_date}
                                        onChange={handleInputChange}
                                        type="date"
                                        required
                                        className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-600 cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Time</label>
                                    <input
                                        name="start_time"
                                        value={formData.start_time}
                                        onChange={handleInputChange}
                                        type="time"
                                        required
                                        className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-600 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Image Upload Section */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Event Image</label>

                                <div className="space-y-4">
                                    {/* File Input */}
                                    <div className={`border-2 border-dashed border-gray-700 rounded-lg p-6 text-center transition-all bg-black/20 ${uploading ? 'opacity-50 cursor-wait' : 'hover:border-blue-500 hover:bg-white/5'}`}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            ref={fileInputRef}
                                            disabled={uploading}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                            {uploading ? (
                                                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <svg className="w-8 h-8 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            )}
                                            <span className="text-sm text-gray-300 font-medium">
                                                {uploading ? 'Processing & Uploading...' : 'Click to Upload Image'}
                                            </span>
                                            <span className="text-xs text-gray-500">Auto-converts to WebP</span>
                                        </label>
                                    </div>

                                    {/* Preview or URL Display */}
                                    <div className="bg-black/40 border border-gray-700 rounded-lg p-3 flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white/10 rounded overflow-hidden flex-shrink-0 relative">
                                            {formData.image_url && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        {formData.image_url && !formData.image_url.startsWith('/images') ? (
                                            <div className="flex-1 text-sm text-green-400 font-medium flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                Image Uploaded Successfully
                                            </div>
                                        ) : (
                                            <div className="flex-1 text-sm text-gray-400 italic">
                                                No specific image uploaded (using default)
                                            </div>
                                        )}
                                        {/* Hidden input to keep state but hide URL from view */}
                                        <input
                                            type="hidden"
                                            name="image_url"
                                            value={formData.image_url}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-red-900/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
                            >
                                {loading ? 'PUBLISHING...' : 'PUBLISH EVENT'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Existing Events List */}
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

                            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar flex-grow">
                                {events.length === 0 ? (
                                    <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl bg-black/20">
                                        <p className="text-gray-500">No events found. Add one on the left!</p>
                                    </div>
                                ) : events.map((event) => (
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
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={event.image_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-white leading-tight truncate">{event.title}</h4>
                                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider flex items-center gap-2">
                                                <span className="truncate">{event.start_date}</span>
                                                <span className="w-1 h-1 bg-gray-600 rounded-full flex-shrink-0"></span>
                                                <span className={event.event_type === 'training' ? 'text-blue-400' : 'text-yellow-400'}>{event.event_type}</span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => deleteEvent(event.id)}
                                            className="text-gray-600 hover:text-red-500 p-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all"
                                            title="Delete Event"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    )
}
