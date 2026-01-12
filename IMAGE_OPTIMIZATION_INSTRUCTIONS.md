# Image Optimization Instructions

## Current Status

Your components are already optimized with:
- ✅ Proper `sizes` attributes for responsive images
- ✅ Optimized `quality` settings (70-90)
- ✅ Lazy loading for below-the-fold images
- ✅ Proper image dimensions

## Next Steps: Convert Images to WebP

To achieve the **3,022 KiB savings**, you need to:

### Option 1: Run the Optimization Script (Recommended)

1. **Install dependencies** (if not already installed):
   ```bash
   npm install sharp --save-dev
   ```

2. **Run the optimization script**:
   ```bash
   npm run optimize-images
   ```

   This will:
   - Create `.webp` versions of all images
   - Resize images to appropriate dimensions
   - Compress images with optimal quality
   - Show savings for each image

3. **After running**, the script creates WebP files like:
   - `/images/global/image-bg.webp`
   - `/images/team/banner1.webp`
   - etc.

### Option 2: Manual Optimization

If the script doesn't work, manually optimize images:

1. **Use online tools**:
   - [Squoosh](https://squoosh.app/) - Best quality/compression
   - [TinyPNG](https://tinypng.com/) - Easy batch processing
   - [CloudConvert](https://cloudconvert.com/) - Convert to WebP

2. **For each image**, create a WebP version:
   - Resize to display dimensions (see sizes below)
   - Convert to WebP format
   - Save alongside original (same name, .webp extension)

3. **Recommended dimensions**:
   - `image-bg.jpg`: 1920x1080
   - `banner1.jpg`, `banner2.jpg`: 1200x800
   - `event1.jpg`, `event2.jpg`: 800x600
   - `event.jpg`: 1920x1080
   - `benefits.jpg`: 800x800
   - Coach images: 600x600
   - Sponsor logos: 400x200
   - Logo: 500x500 (keep PNG for favicon)
   - Gallery images: 1200x1200

### Option 3: Update Components to Use WebP

Once WebP files are created, update components to reference them:

**Example for Hero.tsx:**
```tsx
// Change from:
src="/images/global/image-bg.jpg"

// To:
src="/images/global/image-bg.webp"
```

Or use the `ImageWithFallback` component which automatically tries WebP first.

## Expected Results

After optimization:
- **Total savings**: ~3,022 KiB (3 MB)
- **Page load improvement**: 30-50% faster
- **LCP improvement**: Better Largest Contentful Paint scores
- **Mobile performance**: Significantly improved

## Verification

After creating WebP files, check:
1. Files exist in `public/images/` with `.webp` extension
2. File sizes are 50-80% smaller than originals
3. Images still display correctly in browser

## Troubleshooting

**Script not running?**
- Check Node.js version: `node --version` (needs 14+)
- Install sharp: `npm install sharp --save-dev`
- Check file paths in `public/images/`

**WebP not displaying?**
- Verify files were created
- Check browser console for 404 errors
- Ensure file extensions are correct (.webp)

**Need help?**
- Check `scripts/README-IMAGE-OPTIMIZATION.md` for detailed guide
- Review the optimization script: `scripts/optimize-images-simple.js`
