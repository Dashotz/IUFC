import React from 'react'
import { motion } from 'framer-motion'
import EventTitleInput from './form/EventTitleInput'
import EventTypeSelect from './form/EventTypeSelect'
import LocationInput from './form/LocationInput'
import DateTimeInputs from './form/DateTimeInputs'
import CoachManager from './form/CoachManager'
import ImageUploader from './form/ImageUploader'

interface EventFormProps {
    formData: {
        title: string
        event_type: string
        location: string
        start_date: string
        start_time: string
        image_url: string
        coach: string
    }
    setFormData: React.Dispatch<React.SetStateAction<any>>
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleSubmit: (e: React.FormEvent) => void
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    uploading: boolean
    loading: boolean
    editingId: number | null
    cancelEdit: () => void
    fileInputRef: React.RefObject<HTMLInputElement>
    showCoach: boolean
    setShowCoach: (show: boolean) => void
}

export default function EventForm({
    formData,
    setFormData,
    handleInputChange,
    handleSubmit,
    handleImageUpload,
    uploading,
    loading,
    editingId,
    cancelEdit,
    fileInputRef,
    showCoach,
    setShowCoach
}: EventFormProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl h-fit"
        >
            <div className="flex items-center gap-3 mb-8">
                <span className={`w-1 h-8 bg-gradient-to-b ${editingId ? 'from-blue-500 to-blue-700' : 'from-red-500 to-red-700'} rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]`}></span>
                <h2 className="text-2xl font-bold text-white tracking-wide">{editingId ? 'EDIT EVENT' : 'ADD NEW EVENT'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <EventTitleInput
                        value={formData.title}
                        onChange={handleInputChange}
                        eventType={formData.event_type}
                    />
                    <EventTypeSelect
                        value={formData.event_type}
                        onChange={handleInputChange}
                    />
                </div>

                <LocationInput
                    value={formData.location}
                    onChange={handleInputChange}
                />

                <DateTimeInputs
                    startDate={formData.start_date}
                    startTime={formData.start_time}
                    onChange={handleInputChange}
                />

                <CoachManager
                    coachValue={formData.coach}
                    onCoachChange={(val) => setFormData((prev: any) => ({ ...prev, coach: val }))}
                    showCoach={showCoach}
                    setShowCoach={setShowCoach}
                />

                <ImageUploader
                    imageUrl={formData.image_url}
                    onUpload={handleImageUpload}
                    uploading={uploading}
                    fileInputRef={fileInputRef}
                />

                <div className="flex gap-4">
                    {editingId && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="w-1/3 bg-gray-700 text-white font-bold py-4 rounded-lg hover:bg-gray-600 transition-all uppercase tracking-widest text-sm"
                        >
                            CANCEL
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className={`flex-1 bg-gradient-to-r ${editingId ? 'from-blue-600 to-blue-800' : 'from-blue-600 to-red-600'} text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm`}
                    >
                        {loading ? 'SAVING...' : (editingId ? 'UPDATE EVENT' : 'CREATE EVENT')}
                    </button>
                </div>
            </form>
        </motion.div>
    )
}
