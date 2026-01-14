import React from 'react'

interface EventTitleInputProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    eventType: string
}

export default function EventTitleInput({ value, onChange, eventType }: EventTitleInputProps) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Event Title</label>
            <input
                name="title"
                value={value}
                onChange={onChange}
                type="text"
                required
                disabled={eventType === 'training'}
                className={`w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-600 ${eventType === 'training' ? 'opacity-50 cursor-not-allowed text-gray-400' : ''}`}
                placeholder={eventType === 'training' ? "Auto-generated (Select Date)" : "e.g. Summer Cup"}
            />
        </div>
    )
}
