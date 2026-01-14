import React from 'react'

interface LocationInputProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function LocationInput({ value, onChange }: LocationInputProps) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Location</label>
            <div className="flex bg-black/40 border border-gray-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-600 transition-all">
                <div className="px-4 py-3 bg-white/5 text-gray-400 border-r border-gray-700">📍</div>
                <input
                    name="location"
                    value={value}
                    onChange={onChange}
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-transparent text-white outline-none placeholder-gray-600"
                    placeholder="Venue Address"
                />
            </div>
        </div>
    )
}
