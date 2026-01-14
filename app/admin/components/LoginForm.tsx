import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface LoginFormProps {
    handleLogin: (e: React.FormEvent) => void
    email: string
    setEmail: (email: string) => void
    password: string
    setPassword: (password: string) => void
    loading: boolean
    errorMsg: string
}

export default function LoginForm({
    handleLogin,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errorMsg
}: LoginFormProps) {
    return (
        <div className="flex h-screen items-center justify-center relative z-10 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-red-600 rounded-xl mx-auto mb-6 shadow-lg shadow-blue-500/30 flex items-center justify-center text-2xl font-black text-white">
                        IUFC
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
                    <p className="text-gray-400 text-sm">Sign in to manage team content</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Display Error Message if any */}
                    {errorMsg && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg text-center">
                            {errorMsg}
                        </div>
                    )}

                    <div className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-600"
                            placeholder="Enter admin email"
                            required
                        />
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
