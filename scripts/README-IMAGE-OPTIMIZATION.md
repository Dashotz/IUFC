# Image Optimization Guide

## Quick Start

Run the optimization script to convert all images to WebP format:

```bash
npm run optimize-images
```

This will:
- Convert images to WebP format (smaller file sizes)
- Resize images to appropriate dimensions
- Compress images with optimal quality settings
- Keep original files as fallbacks

## What Gets Optimized

- **Hero background**: Resized to 1920x1080, quality 80
- **Logos**: Resized to 500x500, quality 90 (PNG kept for favicon)
- **Banner images**: Resized to 1200x800, quality 75
- **Event images**: Resized to 800x600, quality 70
- **Coach photos**: Resized to 600x600, quality 80
- **Sponsor logos**: Resized to 400x200, quality 85
- **Gallery images**: Resized to 1200x1200, quality 80

## Expected Savings

- **Total estimated savings**: ~3,000 KiB (3 MB)
- **Individual image savings**: 50-80% smaller file sizes
- **Faster page load**: Especially on mobile devices

## After Running the Script

The script creates `.webp` versions of all images. The components are already configured to use these optimized versions automatically with fallbacks to the original format.

## Manual Optimization (Alternative)

If you prefer to optimize images manually:

1. Use online tools like:
   - [Squoosh](https://squoosh.app/) - Google's image compression tool
   - [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
   - [ImageOptim](https://imageoptim.com/) - Desktop app

2. Convert to WebP using:
   - [CloudConvert](https://cloudconvert.com/jpg-to-webp)
   - [Convertio](https://convertio.co/jpg-webp/)

3. Resize images to match their display dimensions before uploading

## Troubleshooting

If the script fails:
1. Ensure `sharp` is installed: `npm install sharp --save-dev`
2. Check Node.js version (requires Node 14+)
3. Verify image paths in `public/images/` directory
