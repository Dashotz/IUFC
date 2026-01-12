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

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **React Three Fiber** - 3D graphics library
- **Three.js** - 3D library
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Netlify** - Hosting and deployment

## Animation Features

- **Hero Section**: Animated hero with background image and gradient overlay
- **Page Transitions**: Smooth fade and slide animations on page load
- **Section Animations**: Elements animate as they come into view
- **Scroll Animations**: Smooth scroll behavior for navigation
- **Interactive Elements**: Hover and tap animations throughout
- **Sponsors Carousel**: Infinite scrolling sponsors section

## License

MIT

## Support

For issues or questions, please contact the development team.
