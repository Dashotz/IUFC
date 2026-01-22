/**
 * Persistent Rate Limiter using localStorage
 * Survives page reloads
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

class PersistentRateLimiter {
    private storageKey = 'iufc_rate_limits'

    private getStorage(): Map<string, AttemptRecord> {
        try {
            const data = localStorage.getItem(this.storageKey)
            if (!data) return new Map()

            const obj = JSON.parse(data)
            return new Map(Object.entries(obj))
        } catch {
            return new Map()
        }
    }

    private setStorage(attempts: Map<string, AttemptRecord>): void {
        try {
            const obj = Object.fromEntries(attempts)
            localStorage.setItem(this.storageKey, JSON.stringify(obj))
        } catch (error) {
            console.error('Failed to save rate limit data:', error)
        }
    }

    checkLimit(
        key: string,
        config: RateLimitConfig
    ): { allowed: boolean; remainingMs?: number; attemptsLeft?: number } {
        const now = Date.now()
        const attempts = this.getStorage()
        const record = attempts.get(key)

        // No previous attempts
        if (!record) {
            attempts.set(key, {
                count: 1,
                firstAttempt: now,
            })
            this.setStorage(attempts)
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
            attempts.set(key, {
                count: 1,
                firstAttempt: now,
            })
            this.setStorage(attempts)
            return { allowed: true, attemptsLeft: config.maxAttempts - 1 }
        }

        // Increment attempt count
        record.count++

        // Check if limit exceeded
        if (record.count > config.maxAttempts) {
            record.blockedUntil = now + config.blockDurationMs
            attempts.set(key, record)
            this.setStorage(attempts)
            return {
                allowed: false,
                remainingMs: config.blockDurationMs,
            }
        }

        attempts.set(key, record)
        this.setStorage(attempts)
        return {
            allowed: true,
            attemptsLeft: config.maxAttempts - record.count,
        }
    }

    reset(key: string): void {
        const attempts = this.getStorage()
        attempts.delete(key)
        this.setStorage(attempts)
    }

    clearAll(): void {
        localStorage.removeItem(this.storageKey)
    }

    getAttemptCount(key: string): number {
        const attempts = this.getStorage()
        return attempts.get(key)?.count || 0
    }
}

// Singleton instance
export const persistentRateLimiter = new PersistentRateLimiter()

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

export function formatRemainingTime(ms: number): string {
    const minutes = Math.ceil(ms / 60000)
    if (minutes < 1) return 'less than a minute'
    if (minutes === 1) return '1 minute'
    return `${minutes} minutes`
}
