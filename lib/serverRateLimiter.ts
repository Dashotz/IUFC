/**
 * Server-Side Rate Limiter using Supabase
 * Tracks attempts across all devices via database
 */

import { supabase } from './supabaseClient'

interface RateLimitResult {
    allowed: boolean
    attemptsCount: number
    timeUntilReset: number
    message: string
}

/**
 * Check if a login attempt is allowed (server-side)
 * @param identifier - Email or IP address
 * @param windowMinutes - Time window in minutes (default: 15)
 * @param maxAttempts - Maximum attempts allowed (default: 5)
 */
export async function checkLoginRateLimit(
    identifier: string,
    windowMinutes: number = 15,
    maxAttempts: number = 5
): Promise<RateLimitResult> {
    try {


        const { data, error } = await supabase.rpc('check_login_rate_limit', {
            p_email: identifier,
            p_window_minutes: windowMinutes,
            p_max_attempts: maxAttempts,
        })

        if (error) {
            console.error('❌ Rate limit check error:', error)
            console.error('Error details:', JSON.stringify(error, null, 2))
            // Fail open - allow the attempt but log the error
            return {
                allowed: true,
                attemptsCount: 0,
                timeUntilReset: 0,
                message: '',
            }
        }

        // Supabase RPC returns array, get first result
        const result = Array.isArray(data) ? data[0] : data



        return {
            allowed: result.is_allowed,
            attemptsCount: result.attempts_count,
            timeUntilReset: result.time_until_reset,
            message: result.message || '',
        }
    } catch (error) {
        console.error('❌ Rate limit check exception:', error)
        // Fail open
        return {
            allowed: true,
            attemptsCount: 0,
            timeUntilReset: 0,
            message: '',
        }
    }
}

/**
 * Log a login attempt (server-side)
 * @param email - User email
 * @param success - Whether login was successful
 */
export async function logLoginAttempt(
    email: string,
    success: boolean
): Promise<void> {
    try {


        const { error } = await supabase.rpc('log_login_attempt', {
            p_email: email,
            p_success: success,
        })

        if (error) {
            console.error('❌ Failed to log login attempt:', error)
            console.error('Error details:', JSON.stringify(error, null, 2))
        } else {

        }
    } catch (error) {
        console.error('❌ Login attempt logging exception:', error)
    }
}

/**
 * Format remaining time for user display
 */
export function formatRemainingTime(seconds: number): string {
    const minutes = Math.ceil(seconds / 60)
    if (minutes < 1) return 'less than a minute'
    if (minutes === 1) return '1 minute'
    return `${minutes} minutes`
}

/**
 * Get client IP address (best effort)
 * Note: This is client-side, so it's not 100% reliable
 * For production, you'd want to get this from server/edge function
 */
export async function getClientIP(): Promise<string | null> {
    try {
        // Try to get IP from a public API
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        return data.ip || null
    } catch {
        return null
    }
}
