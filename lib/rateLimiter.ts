/**
 * Client-side rate limiter utility
 * Tracks attempts and implements exponential backoff
 */

interface RateLimitConfig {
    maxAttempts: number
    windowMs: number
    blockDurationMs: number
}

interface AttemptRecord {
    count: number
    firstAttempt: number
    blockedUntil?: number
}

class RateLimiter {
    private attempts: Map<string, AttemptRecord> = new Map()

    /**
     * Check if an action is allowed
     * @param key - Unique identifier (e.g., 'login', 'attendance-submit')
     * @param config - Rate limit configuration
     * @returns Object with allowed status and remaining time if blocked
     */
    checkLimit(
        key: string,
        config: RateLimitConfig
    ): { allowed: boolean; remainingMs?: number; attemptsLeft?: number } {
        const now = Date.now()
        const record = this.attempts.get(key)

        // No previous attempts
        if (!record) {
            this.attempts.set(key, {
                count: 1,
                firstAttempt: now,
            })
            return { allowed: true, attemptsLeft: config.maxAttempts - 1 }
        }

        // Check if currently blocked
        if (record.blockedUntil && record.blockedUntil > now) {
            return {
                allowed: false,
                remainingMs: record.blockedUntil - now,
            }
        }

        // Check if window has expired
        if (now - record.firstAttempt > config.windowMs) {
            // Reset the window
            this.attempts.set(key, {
                count: 1,
                firstAttempt: now,
            })
            return { allowed: true, attemptsLeft: config.maxAttempts - 1 }
        }

        // Increment attempt count
        record.count++

        // Check if limit exceeded
        if (record.count > config.maxAttempts) {
            record.blockedUntil = now + config.blockDurationMs
            this.attempts.set(key, record)
            return {
                allowed: false,
                remainingMs: config.blockDurationMs,
            }
        }

        this.attempts.set(key, record)
        return {
            allowed: true,
            attemptsLeft: config.maxAttempts - record.count,
        }
    }

    /**
     * Reset rate limit for a specific key
     */
    reset(key: string): void {
        this.attempts.delete(key)
    }

    /**
     * Clear all rate limit records
     */
    clearAll(): void {
        this.attempts.clear()
    }

    /**
     * Get current attempt count for a key
     */
    getAttemptCount(key: string): number {
        return this.attempts.get(key)?.count || 0
    }
}

// Singleton instance
export const rateLimiter = new RateLimiter()

// Preset configurations
export const RateLimitPresets = {
    LOGIN: {
        maxAttempts: 5,
        windowMs: 15 * 60 * 1000, // 15 minutes
        blockDurationMs: 30 * 60 * 1000, // 30 minutes
    },
    ATTENDANCE: {
        maxAttempts: 3,
        windowMs: 5 * 60 * 1000, // 5 minutes
        blockDurationMs: 10 * 60 * 1000, // 10 minutes
    },
    TOKEN_GENERATION: {
        maxAttempts: 10,
        windowMs: 60 * 1000, // 1 minute
        blockDurationMs: 5 * 60 * 1000, // 5 minutes
    },
}

/**
 * Format remaining time for user display
 */
export function formatRemainingTime(ms: number): string {
    const minutes = Math.ceil(ms / 60000)
    if (minutes < 1) return 'less than a minute'
    if (minutes === 1) return '1 minute'
    return `${minutes} minutes`
}
