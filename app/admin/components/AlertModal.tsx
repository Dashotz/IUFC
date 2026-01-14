import React from 'react'
import { motion } from 'framer-motion'

interface AlertModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    message?: string
    type?: 'success' | 'error' | 'info'
}

export default function AlertModal({
    isOpen,
    onClose,
    title,
    message,
    type = 'info'
}: AlertModalProps) {
    if (!isOpen) return null

    const colors = {
        success: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: 'text-green-500', shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.2)]' },
        error: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: 'text-red-500', shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.2)]' },
        info: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-500', shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]' }
    }
    const color = colors[type] || colors.info

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className={`bg-[#1a202c] w-full max-w-sm rounded-2xl border ${color.border} shadow-2xl overflow-hidden relative z-10`}
            >
                <div className="p-6 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 ${color.bg} rounded-full flex items-center justify-center mb-4 border ${color.border} ${color.shadow}`}>
                        {type === 'success' && (
                            <svg className={`w-8 h-8 ${color.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        )}
                        {type === 'error' && (
                            <svg className={`w-8 h-8 ${color.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        )}
                        {type === 'info' && (
                            <svg className={`w-8 h-8 ${color.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{title || (type === 'error' ? 'Error' : 'Success')}</h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed whitespace-pre-wrap">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-800 text-white font-bold hover:bg-gray-700 transition-colors shadow-lg"
                    >
                        Okay
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
