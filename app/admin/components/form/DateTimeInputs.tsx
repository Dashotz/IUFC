import React from 'react'

interface DateTimeInputsProps {
    startDate: string
    startTime: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function DateTimeInputs({ startDate, startTime, onChange }: DateTimeInputsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date</label>
                <input
                    name="start_date"
                    value={startDate}
                    onChange={onChange}
                    type="date"
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-600 cursor-pointer"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Time</label>
                <input
                    name="start_time"
                    value={startTime}
                    onChange={onChange}
                    type="time"
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-600 cursor-pointer"
                />
            </div>
        </div>
    )
}
