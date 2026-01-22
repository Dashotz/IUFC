/**
 * Netlify Edge Function: Rate Limiter
 * Provides IP-based rate limiting for API routes
 */

// Type definitions for Netlify Edge Functions
type Context = {
    ip: string;
    next: () => Promise<Response>;
};

interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

// In-memory store (resets on function cold start)
const rateLimitStore: RateLimitStore = {};

// Configuration
const RATE_LIMIT_CONFIG = {
    windowMs: 60000, // 1 minute
    maxRequests: 60, // 60 requests per minute
    blockDurationMs: 300000, // 5 minutes block
};

function cleanupExpiredEntries() {
    const now = Date.now();
    Object.keys(rateLimitStore).forEach((key) => {
        if (rateLimitStore[key].resetTime < now) {
            delete rateLimitStore[key];
        }
    });
}

export default async (request: Request, context: Context) => {
    // Only apply rate limiting to specific paths
    const url = new URL(request.url);

    // Skip rate limiting for static assets
    if (
        url.pathname.startsWith("/_next") ||
        url.pathname.startsWith("/images") ||
        url.pathname.startsWith("/videos") ||
        url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2)$/)
    ) {
        return context.next();
    }

    // Get client IP
    const clientIP = context.ip || "unknown";
    const now = Date.now();

    // Cleanup old entries periodically
    if (Math.random() < 0.1) {
        cleanupExpiredEntries();
    }

    // Check rate limit
    const record = rateLimitStore[clientIP];

    if (!record) {
        // First request from this IP
        rateLimitStore[clientIP] = {
            count: 1,
            resetTime: now + RATE_LIMIT_CONFIG.windowMs,
        };
        return context.next();
    }

    // Check if window has expired
    if (now > record.resetTime) {
        rateLimitStore[clientIP] = {
            count: 1,
            resetTime: now + RATE_LIMIT_CONFIG.windowMs,
        };
        return context.next();
    }

    // Increment count
    record.count++;

    // Check if limit exceeded
    if (record.count > RATE_LIMIT_CONFIG.maxRequests) {
        // Block for longer duration
        record.resetTime = now + RATE_LIMIT_CONFIG.blockDurationMs;

        return new Response(
            JSON.stringify({
                error: "Too Many Requests",
                message: "You have exceeded the rate limit. Please try again later.",
                retryAfter: Math.ceil(RATE_LIMIT_CONFIG.blockDurationMs / 1000),
            }),
            {
                status: 429,
                headers: {
                    "Content-Type": "application/json",
                    "Retry-After": String(
                        Math.ceil(RATE_LIMIT_CONFIG.blockDurationMs / 1000)
                    ),
                    "X-RateLimit-Limit": String(RATE_LIMIT_CONFIG.maxRequests),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": String(record.resetTime),
                },
            }
        );
    }

    // Add rate limit headers
    const response = await context.next();
    const newHeaders = new Headers(response.headers);
    newHeaders.set("X-RateLimit-Limit", String(RATE_LIMIT_CONFIG.maxRequests));
    newHeaders.set(
        "X-RateLimit-Remaining",
        String(RATE_LIMIT_CONFIG.maxRequests - record.count)
    );
    newHeaders.set("X-RateLimit-Reset", String(record.resetTime));

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
    });
};

export const config = {
    path: "/*",
};
