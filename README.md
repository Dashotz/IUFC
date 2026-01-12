# IUFC Sports Team Blog

A modern, responsive blog website for a sports team built with Next.js and deployed on Netlify.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 📱 Mobile-friendly layout
- 🌙 Dark mode support
- ⚡ Fast static site generation
- 📝 Blog post system
- 🚀 Optimized for Netlify deployment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/              # Next.js app directory
│   ├── blog/         # Blog post pages
│   ├── about/        # About page
│   ├── contact/      # Contact page
│   └── page.tsx      # Home page
├── components/       # React components
│   ├── Header.tsx    # Navigation header
│   └── Footer.tsx    # Footer component
├── lib/              # Utility functions
│   └── posts.ts      # Blog post data
└── public/           # Static assets
```

## Customization

### Adding Blog Posts

Edit `lib/posts.ts` to add new blog posts. Each post should have:
- `slug`: URL-friendly identifier
- `title`: Post title
- `date`: Publication date (YYYY-MM-DD)
- `excerpt`: Short description
- `content`: HTML content
- `author`: Optional author name
- `image`: Optional image URL

### Styling

The project uses Tailwind CSS. Customize colors in `tailwind.config.ts`:
- Primary colors are defined in the `primary` color palette
- Modify the theme to match your team's colors

### Team Information

Update the following files with your team's information:
- `app/about/page.tsx` - Team information
- `app/contact/page.tsx` - Contact details
- `components/Header.tsx` - Team name/logo
- `components/Footer.tsx` - Footer links

## Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

### Configuration

The `netlify.toml` file is already configured with:
- Build command
- Publish directory
- Redirect rules for client-side routing

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Netlify** - Hosting and deployment

## License

MIT

## Support

For issues or questions, please contact the development team.
