# Imus United Football Club - Official Website

A modern, animated website for Imus United Football Club built with Next.js, featuring smooth animations, team information, events, and deployed on Netlify.

**Live URL:** [https://iufc.netlify.app](https://iufc.netlify.app)

## Features

- Modern, responsive design with Tailwind CSS
- Mobile-friendly layout
- Fast static site generation
- Smooth animations with Framer Motion
- Team and coaches section
- Events and sponsors sections
- Benefits section with video
- Contact section
- Interactive map for field location
- Optimized image handling
- **SEO Optimized:** Sitemap, Robots.txt, JSON-LD structured data, and Open Graph tags.

## Admin Dashboard & Backend

Powered by **Supabase**, the custom-built Admin Dashboard provides full control over club operations.

### Key Capabilities
- **Operations Center**: Secure, animated login dashboard for club administrators.
- **Event Management**: 
    - Create/Edit/Delete Training Sessions and Tournaments.
    - **Kit Colors**: Designate text-based kit colors (e.g., "Red", "Blue") for specific events.
    - Automatic date/title formatting.
    - Image uploads with client-side WebP conversion.
- **Attendance System**:
    - **Public Registration**: Parents/Players can register for an event (Training/Tournament) without logging in.
    - **Age Brackets**: Intelligent grouping of attendees (U5, U7/U9, U10/U12, U13/U14) for better organization.
    - **"Who's Going?" Visibility**: Publicly viewable attendance lists with kit requirements.
    - **Smart Copy**: One-click formatted attendance list generation for WhatsApp/Messenger, including:
        - Event Details (Date, Time, Location).
        - Kit Color requirement.
        - Attendees grouped by age bracket.

### Security
- **Row Level Security (RLS)**: Robust database policies ensuring data privacy.
- **Protected Routes**: Middleware to secure admin access.
- **Rate Limiting**: 
    - Client-side rate limiting for login attempts (5 attempts per 15 minutes)
    - IP-based rate limiting via Netlify Edge Functions (60 requests/minute)
    - Attendance submission throttling (3 attempts per 5 minutes)
- **Token Expiration**: Attendance links expire after 7 days for enhanced security.
- **Security Headers**: 
    - Content Security Policy (CSP)
    - HTTP Strict Transport Security (HSTS)
    - XSS Protection
    - Clickjacking prevention
- **Login Attempt Tracking**: Database logging of all authentication attempts.

For detailed security documentation, see [SECURITY.md](./SECURITY.md).

## Project Structure

```
├── app/              # Next.js app directory
│   ├── admin/        # Admin Dashboard & Auth
│   ├── attendance/   # Public Attendance Registration
│   ├── about/        # About page
│   ├── contact/      # Contact page
│   ├── layout.tsx    # Root layout with SEO metadata
│   ├── sitemap.ts    # Sitemap generator
│   └── robots.ts     # Robots.txt generator
├── components/       # React components
│   ├── EventsSection.tsx # Public Events display
│   ├── PublicAttendanceModal.tsx # Public view of attendees
│   ├── Hero.tsx      # Hero section
│   └── ...           
└── lib/              # Utilities (Supabase client, etc.)
```

## Technologies Used

### Core Framework
- **Next.js 14** - App Router & Static Export
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Supabase** - Auth, Database, Storage

### Styling & UI
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js / React Three Fiber** - 3D Graphics

### SEO & Performance
- **Metadata API**: Dynamic SEO tags.
- **Sitemap/Robots**: Automated discovery.
- **JSON-LD**: Structured data for Search Engines.
- **WebP Images**: Auto-optimization.

## Customization

### Styling
Colors are customizable in `tailwind.config.ts`. The primary theme reflects the club's identity.

## License

MIT

## Support

For issues or questions, please contact the development team.
