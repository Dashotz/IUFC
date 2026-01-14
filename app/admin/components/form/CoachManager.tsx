import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CoachManagerProps {
    coachValue: string
    onCoachChange: (value: string) => void
    showCoach: boolean
    setShowCoach: (show: boolean) => void
}

export default function CoachManager({ coachValue, onCoachChange, showCoach, setShowCoach }: CoachManagerProps) {
    const [localCoaches, setLocalCoaches] = useState<string[]>([])

    // Sync coachValue string to local array on mount or external change
    useEffect(() => {
        if (coachValue) {
            setLocalCoaches(coachValue.split(',').map(s => s.trim()))
        } else {
            setLocalCoaches([])
        }
    }, [coachValue])

    const handleCoachChange = (index: number, value: string) => {
        const newCoaches = [...localCoaches]
        newCoaches[index] = value
        setLocalCoaches(newCoaches)
        updateParent(newCoaches)
    }

    const addCoach = () => {
        const newCoaches = [...localCoaches, '']
        setLocalCoaches(newCoaches)
        setShowCoach(true)
        updateParent(newCoaches)
    }

    const removeCoach = (index: number) => {
        const newCoaches = localCoaches.filter((_, i) => i !== index)
        setLocalCoaches(newCoaches)
        updateParent(newCoaches)
        if (newCoaches.length === 0) setShowCoach(false)
    }

    const updateParent = (coaches: string[]) => {
        const coachString = coaches.filter(c => c.trim() !== '').join(', ')
        onCoachChange(coachString)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Coach(es)</label>
                {localCoaches.length > 0 && (
                    <button
                        type="button"
                        onClick={addCoach}
                        className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                        + ADD ANOTHER
                    </button>
                )}
            </div>

            {localCoaches.length === 0 ? (
                <button
                    type="button"
                    onClick={addCoach}
                    className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                >
                    <span className="text-lg">+</span> ADD A COACH
                </button>
            ) : (
                <div className="space-y-3">
                    {localCoaches.map((coach, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="flex gap-2"
                        >
                            <input
                                value={coach}
                                onChange={(e) => handleCoachChange(index, e.target.value)}
                                type="text"
                                className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder-gray-600"
                                placeholder={`Coach Name ${index + 1}`}
                                autoFocus={index === localCoaches.length - 1}
                            />
                            <button
                                type="button"
                                onClick={() => removeCoach(index)}
                                className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                                title="Remove Coach"
                            >
                                ✕
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
