const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const imagesDir = path.join(__dirname, '..', 'public', 'images')

// Configuration for each image type
const configs = {
  'global/image-bg.jpg': { maxWidth: 1920, maxHeight: 1080, quality: 80 },
  'global/logo.png': { maxWidth: 500, maxHeight: 500, quality: 90, keepOriginal: true },
  'team/banner1.jpg': { maxWidth: 1200, maxHeight: 800, quality: 75 },
  'team/banner2.jpg': { maxWidth: 1200, maxHeight: 800, quality: 75 },
  'team/event.jpg': { maxWidth: 1920, maxHeight: 1080, quality: 70 },
  'team/event1.jpg': { maxWidth: 800, maxHeight: 600, quality: 70 },
  'team/event2.jpg': { maxWidth: 800, maxHeight: 600, quality: 70 },
  'team/benefits.jpg': { maxWidth: 800, maxHeight: 800, quality: 75 },
  'coaches/ino.jpg': { maxWidth: 600, maxHeight: 600, quality: 80 },
  'coaches/jovel.jpg': { maxWidth: 600, maxHeight: 600, quality: 80 },
  'coaches/karlo.jpg': { maxWidth: 600, maxHeight: 600, quality: 80 },
  'coaches/lee.jpg': { maxWidth: 600, maxHeight: 600, quality: 80 },
  'sponsors/efx.png': { maxWidth: 400, maxHeight: 200, quality: 85 },
  'sponsors/tsl.png': { maxWidth: 400, maxHeight: 200, quality: 85 },
}

async function optimizeImage(relativePath, config) {
  const inputPath = path.join(imagesDir, relativePath)
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Skipping ${relativePath} (not found)`)
    return
  }

  try {
    const image = sharp(inputPath)
    const metadata = await image.metadata()
    
    let width = metadata.width
    let height = metadata.height
    
    if (width > config.maxWidth || height > config.maxHeight) {
      const ratio = Math.min(config.maxWidth / width, config.maxHeight / height)
      width = Math.round(width * ratio)
      height = Math.round(height * ratio)
    }
    
    // Create WebP version
    const webpPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    await image
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: config.quality })
      .toFile(webpPath)
    
    const originalSize = fs.statSync(inputPath).size
    const webpSize = fs.statSync(webpPath).size
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1)
    
    console.log(`✓ ${path.basename(relativePath)} → ${path.basename(webpPath)}: ${(webpSize / 1024).toFixed(1)}KB (${savings}% smaller)`)
    
    // Compress original if not keeping it
    if (!config.keepOriginal && /\.(jpg|jpeg)$/i.test(inputPath)) {
      const tempPath = inputPath + '.tmp'
      await image
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: config.quality, mozjpeg: true })
        .toFile(tempPath)
      fs.unlinkSync(inputPath)
      fs.renameSync(tempPath, inputPath)
    }
    
    return true
  } catch (error) {
    console.error(`✗ Error processing ${relativePath}:`, error.message)
    return false
  }
}

async function processGallery() {
  const galleryDir = path.join(imagesDir, 'gallery')
  if (!fs.existsSync(galleryDir)) return { processed: 0, failed: 0 }
  
  const files = fs.readdirSync(galleryDir).filter(f => /\.(jpg|jpeg)$/i.test(f))
  let processed = 0
  let failed = 0
  
  for (const file of files) {
    const filePath = path.join(galleryDir, file)
    try {
      const image = sharp(filePath)
      const metadata = await image.metadata()
      
      let width = metadata.width
      let height = metadata.height
      const maxSize = 1200
      
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }
      
      const webpPath = filePath.replace(/\.(jpg|jpeg)$/i, '.webp')
      await image
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpPath)
      
      processed++
      if (processed % 5 === 0) {
        process.stdout.write(`\rProcessing gallery: ${processed}/${files.length}...`)
      }
    } catch (error) {
      failed++
    }
  }
  
  if (processed > 0) {
    console.log(`\r✓ Gallery: ${processed} images processed, ${failed} failed`)
  }
  
  return { processed, failed }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n')
  
  let totalProcessed = 0
  let totalFailed = 0
  
  // Process configured images
  for (const [relativePath, config] of Object.entries(configs)) {
    if (await optimizeImage(relativePath, config)) {
      totalProcessed++
    } else {
      totalFailed++
    }
  }
  
  // Process gallery images
  console.log('\n📁 Processing gallery images...')
  const galleryResult = await processGallery()
  totalProcessed += galleryResult.processed
  totalFailed += galleryResult.failed
  
  console.log(`\n✨ Optimization complete!`)
  console.log(`   Processed: ${totalProcessed} images`)
  console.log(`   Failed: ${totalFailed} images`)
  console.log(`\n💡 WebP versions created. Update components to use .webp extensions.`)
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
