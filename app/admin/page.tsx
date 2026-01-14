'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import AdminBackground from './components/AdminBackground'
import LoginForm from './components/LoginForm'
import EventForm from './components/EventForm'
import EventList from './components/EventList'
import AttendanceModal from './components/AttendanceModal'
import { AdminEvent } from './types'

export default function AdminPage() {
    const [session, setSession] = useState<any>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [events, setEvents] = useState<AdminEvent[]>([])
    const [showCoach, setShowCoach] = useState(false)
    const [viewAttendanceEvent, setViewAttendanceEvent] = useState<{ id: number, title: string } | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState({
        title: '',
        event_type: 'tournament',
        location: '',
        start_date: '',
        start_time: '',
        image_url: '/images/team/event1.webp',
        coach: ''
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

        if (error) {
            console.error('Error fetching events:', error)
        } else {
            setEvents(data || [])
        }
    }

    const handleEdit = (event: AdminEvent) => {
        setEditingId(event.id)
        setFormData({
            title: event.title,
            event_type: event.event_type,
            location: event.location,
            start_date: event.start_date,
            start_time: event.start_time,
            image_url: event.image_url,
            coach: event.coach || ''
        })
        setShowCoach(!!event.coach)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setFormData({
            title: '',
            event_type: 'tournament',
            location: '',
            start_date: '',
            start_time: '',
            image_url: '/images/team/event1.webp',
            coach: ''
        })
        setShowCoach(false)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData(prev => {
            const newData = { ...prev, [name]: value }

            // Auto-populate title if training + date selected
            if (name === 'start_date' && newData.event_type === 'training' && value) {
                const date = new Date(value)
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
                newData.title = `${dayName} Training`
            }

            // Auto-populate title if type switched to training and date already exists
            if (name === 'event_type' && value === 'training' && newData.start_date) {
                const date = new Date(newData.start_date)
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
                newData.title = `${dayName} Training`
            }

            // Clear title if switching to tournament (optional, maybe keep it?)
            // If switching TO tournament, the user usually types a name. We can clear default training names.
            if (name === 'event_type' && value === 'tournament' && prev.title.includes('Training')) {
                newData.title = ''
            }

            return newData
        })
    }

    const convertToWebP = async (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new (window as any).Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    reject(new Error('Canvas context not available'))
                    return
                }
                ctx.drawImage(img, 0, 0)
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob)
                    else reject(new Error('Conversion failed'))
                }, 'image/webp', 0.8)
            }
            img.onerror = reject
            img.src = URL.createObjectURL(file)
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
            console.error('Error uploading image:', error)
            alert('Error uploading image: ' + error.message)
        } finally {
            setUploading(false)
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Check session again? RLS handles it, but good for UX
            if (!session) throw new Error('No active session')

            let error

            if (editingId) {
                // Update
                const { error: updateError } = await supabase
                    .from('events')
                    .update({
                        title: formData.title,
                        event_type: formData.event_type,
                        location: formData.location,
                        start_date: formData.start_date,
                        start_time: formData.start_time,
                        image_url: formData.image_url,
                        coach: formData.coach
                    })
                    .eq('id', editingId)

                error = updateError
            } else {
                // Insert
                const { error: insertError } = await supabase
                    .from('events')
                    .insert([{
                        title: formData.title,
                        event_type: formData.event_type,
                        location: formData.location,
                        start_date: formData.start_date,
                        start_time: formData.start_time,
                        image_url: formData.image_url,
                        coach: formData.coach
                    }])

                error = insertError
            }

            if (error) throw error

            // Refresh events
            fetchEvents()

            // Reset form
            cancelEdit() // This resets form and editingId

            alert(editingId ? 'Event updated successfully!' : 'Event created successfully!')

        } catch (error: any) {
            console.error('Error saving event:', error)
            alert('Error saving event: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number, imageUrl: string | null) => {
        if (!confirm('Are you sure you want to delete this event?')) return

        try {
            // 1. Delete the DB record
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id)

            if (error) throw error

            // 2. Delete the Image from Storage if it exists and is not default
            // Check if imageUrl is from our bucket
            if (imageUrl && imageUrl.includes('supabase') && !imageUrl.includes('default')) {
                // Extract path from URL
                // URL format: .../storage/v1/object/public/images/training/filename.webp
                // We need 'training/filename.webp'
                const urlParts = imageUrl.split('/images/')
                if (urlParts.length > 1) {
                    const storagePath = urlParts[1]
                    const { error: storageError } = await supabase.storage
                        .from('images')
                        .remove([storagePath])

                    if (storageError) console.error('Error deleting image:', storageError)
                }
            }

            fetchEvents()
        } catch (error: any) {
            console.error('Error deleting event:', error)
            alert('Error deleting event: ' + error.message)
        }
    }

    const generateAttendanceLink = async (eventId: number) => {
        try {
            // Generate a simple unique token
            const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

            const { error } = await supabase
                .from('events')
                .update({ attendance_token: token })
                .eq('id', eventId)

            if (error) throw error

            // Update local state without refetching for speed
            setEvents(events.map(e => e.id === eventId ? { ...e, attendance_token: token } : e))

        } catch (error: any) {
            console.error('Error generating attendance link:', error)
            alert('Failed to generate link: ' + error.message)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMsg('')

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

        } catch (error: any) {
            console.error('Login error:', error)
            setErrorMsg(error.message || 'Failed to login')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setSession(null)
    }

    if (!session) {
        return (
            <div>
                <AdminBackground />
                <LoginForm
                    handleLogin={handleLogin}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    loading={loading}
                    errorMsg={errorMsg}
                />
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
                    <EventForm
                        formData={formData}
                        setFormData={setFormData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        handleImageUpload={handleImageUpload}
                        uploading={uploading}
                        loading={loading}
                        editingId={editingId}
                        cancelEdit={cancelEdit}
                        fileInputRef={fileInputRef}
                        showCoach={showCoach}
                        setShowCoach={setShowCoach}
                    />

                    {/* Existing Events List */}
                    <EventList
                        events={events}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        generateAttendanceLink={generateAttendanceLink}
                        handleViewAttendance={(id, title) => setViewAttendanceEvent({ id, title })}
                    />
                </div>

                {/* Attendance Modal */}
                {viewAttendanceEvent && (
                    <AttendanceModal
                        eventId={viewAttendanceEvent.id}
                        eventTitle={viewAttendanceEvent.title}
                        onClose={() => setViewAttendanceEvent(null)}
                    />
                )}
            </main>
        </div>
    )
}
