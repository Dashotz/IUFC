import React from 'react'

interface EventTypeSelectProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function EventTypeSelect({ value, onChange }: EventTypeSelectProps) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Type</label>
            <div className="relative">
                <select
                    name="event_type"
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none cursor-pointer"
                >
                    <option value="tournament">Tournament</option>
                    <option value="training">Training</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
