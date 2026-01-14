# Imus United Football Club - Official Website

A modern, animated website for Imus United Football Club built with Next.js, featuring smooth animations, team information, events, and deployed on Netlify.

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
- Optimized for Netlify deployment
- Scroll to top button
- Animated hero section

## Project Structure

```
├── app/              # Next.js app directory
│   ├── about/        # About page
│   ├── contact/      # Contact page
│   └── page.tsx      # Home page
├── components/       # React components
│   ├── Hero.tsx      # Hero section with navigation
│   ├── Footer.tsx    # Footer component
│   ├── Sponsors.tsx   # Sponsors section
│   ├── TeamSection.tsx # Team and coaches section
│   └── ...           # Other components
└── public/           # Static assets (images, videos)
```

## Customization

### Styling

The project uses Tailwind CSS. Customize colors in `tailwind.config.ts`:
- Primary colors are defined in the `primary` color palette
- Modify the theme to match your team's colors

### Team Information

The site is already configured for **Imus United Football Club**. Update the following files if needed:
- `app/about/page.tsx` - Team information
- `app/contact/page.tsx` - Contact details
- `components/Header.tsx` - Team name/logo
- `components/Footer.tsx` - Footer links (includes Facebook link)

### Adding Real Images

All images are stored in the `public/images/` directory:
- `public/images/global/` - Logo and background images
- `public/images/team/` - Team photos and event images
- `public/images/coaches/` - Coach photos
- `public/images/sponsors/` - Sponsor logos
- `public/images/gallery/` - Gallery images

Update image paths in components to reference images from the `public` folder.

## Admin Dashboard & Backend

Powered by **Supabase**, the custom-built Admin Dashboard provides full control over club operations.

### Features
- **Operations Center**: Secure, animated login dashboard for club administrators.
- **Event Management**: CRUD capabilities for training sessions and tournaments, featuring:
    - Automatic date/title formatting.
    - Image uploads with client-side WebP conversion.
- **Attendance System**:
    - "Who's Going?" Transparency: Publicly viewable attendance lists.
    - Smart Copy: One-click formatted attendance list generation for WhatsApp/Messenger.
    - Secure Sign-up: Public attendance registration without login.
- **Security**:
    - Robust Row Level Security (RLS) policies.
    - Protected Admin routes and actions.
- **UI/UX**:
    - Custom animated modals for alerts and confirmations.
    - Glassmorphism design aesthetics.

## Technologies Used

### Core Framework
- **Next.js 14** - React framework with App Router and static export
- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Supabase** - Backend-as-a-Service (Auth, Database, Storage)

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixing

### Animation & 3D Graphics
- **Framer Motion** - Animation library for React (smooth page transitions and scroll animations)
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and abstractions for React Three Fiber
- **gl-matrix** - High-performance matrix and vector math for WebGL

### Maps & Location
- **Leaflet** - Interactive maps library
- **React Leaflet** - React components for Leaflet
- **OpenStreetMap** - Map tile provider

### Development Tools
- **ESLint** - Code linting
- **Next.js ESLint Config** - Optimized ESLint configuration for Next.js

### Deployment & Hosting
- **Netlify** - Static site hosting and deployment
- **Static Export** - Fully static site generation for optimal performance

## Features & Animations

### Interactive 3D Gallery
- **Team Gallery Sphere**: Interactive 3D rotating sphere showcasing team photos
- **WebGL-powered**: Smooth 60fps 3D rendering using Three.js and React Three Fiber
- **Touch & Mouse Controls**: Drag to rotate, intuitive navigation

### Animation Features
- **Hero Section**: Animated hero with background image and gradient overlay
- **Page Transitions**: Smooth fade and slide animations on page load
- **Section Animations**: Elements animate as they come into view using Intersection Observer
- **Scroll Animations**: Smooth scroll behavior for navigation with scroll-to-top and scroll-to-team buttons
- **Interactive Elements**: Hover and tap animations throughout
- **Sponsors Carousel**: Infinite scrolling sponsors section

### Performance Optimizations
- **WebP Images**: All images converted to WebP format for optimal file sizes
- **Lazy Loading**: Images load on demand to improve initial page load
- **Code Splitting**: Optimized bundle splitting for faster load times
- **Static Export**: Fully static site for maximum performance

## License

MIT

## Support

For issues or questions, please contact the development team.
