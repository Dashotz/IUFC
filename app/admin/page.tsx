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
import DeleteModal from './components/DeleteModal'
import AlertModal from './components/AlertModal'
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
    const [viewAttendanceEvent, setViewAttendanceEvent] = useState<AdminEvent | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<{ id: number, imageUrl: string | null } | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [alertState, setAlertState] = useState<{ isOpen: boolean, type: 'success' | 'error' | 'info', title?: string, message?: string }>({ isOpen: false, type: 'info' })
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
        setIsFormOpen(true)
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
        setIsFormOpen(false)
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
            setAlertState({ isOpen: true, type: 'error', message: 'Error uploading image: ' + error.message })
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

            setAlertState({ isOpen: true, type: 'success', title: 'Success', message: editingId ? 'Event updated successfully!' : 'Event created successfully!' })

        } catch (error: any) {
            console.error('Error saving event:', error)
            setAlertState({ isOpen: true, type: 'error', message: 'Error saving event: ' + error.message })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = (id: number, imageUrl: string | null) => {
        setDeleteTarget({ id, imageUrl })
    }

    const confirmDelete = async () => {
        if (!deleteTarget) return

        const { id, imageUrl } = deleteTarget
        setIsDeleting(true)

        try {
            // 1. Delete Attendance
            const { error: attendanceError } = await supabase.from('attendance_records').delete().eq('event_id', id)
            if (attendanceError) console.error('Error deleting attendance records:', attendanceError)

            // 2. Delete Event
            const { error, data } = await supabase.from('events').delete().eq('id', id).select()
            if (error) throw error
            if (!data || data.length === 0) throw new Error("Deletion failed. Policy restriction.")

            // 3. Delete Image
            if (imageUrl && imageUrl.includes('supabase') && !imageUrl.includes('default')) {
                const urlParts = imageUrl.split('/images/')
                if (urlParts.length > 1) {
                    await supabase.storage.from('images').remove([urlParts[1]])
                }
            }

            fetchEvents()
            setDeleteTarget(null)
            setAlertState({ isOpen: true, type: 'success', title: 'Deleted', message: 'Event successfully deleted.' })
        } catch (error: any) {
            console.error('Error deleting event:', error)
            setAlertState({ isOpen: true, type: 'error', message: error.message })
        } finally {
            setIsDeleting(false)
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
            setAlertState({ isOpen: true, type: 'error', message: 'Failed to generate link: ' + error.message })
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
        <div className="h-screen overflow-hidden bg-[#0a1628] text-white relative flex flex-col font-sans">
            <AdminBackground />

            {/* Navbar */}
            <nav className="bg-black/20 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 shrink-0">
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

            <main className="container mx-auto px-4 sm:px-6 py-6 relative z-10 flex-1 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 shrink-0">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">EVENTS MANAGEMENT</h2>
                        <p className="text-gray-400 text-xs mt-1">Manage your team's schedule and tournaments</p>
                    </div>
                    <button
                        onClick={() => {
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
                            setIsFormOpen(true)
                        }}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-900/40 transform transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <span className="text-lg leading-none">+</span> CREATE NEW EVENT
                    </button>
                </div>

                {/* Grid List */}
                <EventList
                    events={events}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    generateAttendanceLink={generateAttendanceLink}
                    handleViewAttendance={(event) => setViewAttendanceEvent(event)}
                />

                {/* Form Modal */}
                {isFormOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={cancelEdit}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#0a1628] w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl border border-gray-700 shadow-2xl relative z-10 flex flex-col"
                        >
                            <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900/50 sticky top-0 backdrop-blur-md z-20">
                                <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                                    {editingId ? 'Edit Event' : 'New Event'}
                                </h2>
                                <button onClick={cancelEdit} className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-lg">
                                    ✕
                                </button>
                            </div>

                            <div className="p-6">
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
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Attendance Modal */}
                {viewAttendanceEvent && (
                    <AttendanceModal
                        event={viewAttendanceEvent}
                        onClose={() => setViewAttendanceEvent(null)}
                    />
                )}

                {/* Delete Confirmation Modal */}
                <DeleteModal
                    isOpen={!!deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    onConfirm={confirmDelete}
                    isDeleting={isDeleting}
                />

                <AlertModal
                    isOpen={alertState.isOpen}
                    onClose={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
                    title={alertState.title}
                    message={alertState.message}
                    type={alertState.type}
                />
            </main>
        </div>
    )
}
