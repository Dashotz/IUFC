const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

// Image optimization configuration based on usage
const imageConfigs = {
  // Hero background - full screen, high quality
  'global/image-bg.jpg': {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 85,
    formats: ['webp', 'avif'],
  },
  // Logo - small, high quality
  'global/logo.png': {
    maxWidth: 500,
    maxHeight: 500,
    quality: 90,
    formats: ['webp', 'avif'],
    keepOriginal: true, // Keep PNG for favicon
  },
  // Banner images - large but not full screen
  'team/banner1.jpg': {
    maxWidth: 1200,
    maxHeight: 800,
    quality: 80,
    formats: ['webp', 'avif'],
  },
  'team/banner2.jpg': {
    maxWidth: 1200,
    maxHeight: 800,
    quality: 80,
    formats: ['webp', 'avif'],
  },
  // Event images - medium size
  'team/event.jpg': {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 75,
    formats: ['webp', 'avif'],
  },
  'team/event1.jpg': {
    maxWidth: 800,
    maxHeight: 600,
    quality: 75,
    formats: ['webp', 'avif'],
  },
  'team/event2.jpg': {
    maxWidth: 800,
    maxHeight: 600,
    quality: 75,
    formats: ['webp', 'avif'],
  },
  // Benefits image - circular, medium
  'team/benefits.jpg': {
    maxWidth: 800,
    maxHeight: 800,
    quality: 80,
    formats: ['webp', 'avif'],
  },
  // Coach images - square, medium
  'coaches/ino.jpg': {
    maxWidth: 600,
    maxHeight: 600,
    quality: 85,
    formats: ['webp', 'avif'],
  },
  'coaches/jovel.jpg': {
    maxWidth: 600,
    maxHeight: 600,
    quality: 85,
    formats: ['webp', 'avif'],
  },
  'coaches/karlo.jpg': {
    maxWidth: 600,
    maxHeight: 600,
    quality: 85,
    formats: ['webp', 'avif'],
  },
  'coaches/lee.jpg': {
    maxWidth: 600,
    maxHeight: 600,
    quality: 85,
    formats: ['webp', 'avif'],
  },
  // Sponsor logos - small
  'sponsors/efx.png': {
    maxWidth: 400,
    maxHeight: 200,
    quality: 90,
    formats: ['webp', 'avif'],
  },
  'sponsors/tsl.png': {
    maxWidth: 400,
    maxHeight: 200,
    quality: 90,
    formats: ['webp', 'avif'],
  },
  // Gallery images - medium size
  'gallery': {
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 80,
    formats: ['webp', 'avif'],
  },
}

async function optimizeImage(inputPath, outputPath, config) {
  try {
    const image = sharp(inputPath)
    const metadata = await image.metadata()
    
    // Calculate new dimensions maintaining aspect ratio
    let width = metadata.width
    let height = metadata.height
    
    if (width > config.maxWidth || height > config.maxHeight) {
      const ratio = Math.min(
        config.maxWidth / width,
        config.maxHeight / height
      )
      width = Math.round(width * ratio)
      height = Math.round(height * ratio)
    }
    
    // Process each format
    for (const format of config.formats) {
      const formatOutputPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, `.${format}`)
      
      let pipeline = image
        .resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true,
        })
      
      if (format === 'webp') {
        pipeline = pipeline.webp({ quality: config.quality })
      } else if (format === 'avif') {
        pipeline = pipeline.avif({ quality: config.quality })
      }
      
      await pipeline.toFile(formatOutputPath)
      
      const originalSize = fs.statSync(inputPath).size
      const newSize = fs.statSync(formatOutputPath).size
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1)
      
      console.log(`✓ ${path.basename(formatOutputPath)}: ${(newSize / 1024).toFixed(1)}KB (${savings}% smaller)`)
    }
    
    // Optionally compress original
    if (!config.keepOriginal) {
      const compressedPath = inputPath.replace(/\.(jpg|jpeg)$/i, '.compressed.jpg')
      await image
        .resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: config.quality, mozjpeg: true })
        .toFile(compressedPath)
      
      // Replace original with compressed version
      fs.unlinkSync(inputPath)
      fs.renameSync(compressedPath, inputPath)
      console.log(`✓ Compressed original: ${path.basename(inputPath)}`)
    }
    
    return true
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message)
    return false
  }
}

async function processDirectory(dirPath, relativePath, config) {
  const files = fs.readdirSync(dirPath)
  let processed = 0
  let failed = 0
  
  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      const subProcessed = await processDirectory(filePath, path.join(relativePath, file), config)
      processed += subProcessed.processed
      failed += subProcessed.failed
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const fileRelativePath = path.join(relativePath, file)
      const specificConfig = imageConfigs[fileRelativePath] || config
      
      if (await optimizeImage(filePath, filePath, specificConfig)) {
        processed++
      } else {
        failed++
      }
    }
  }
  
  return { processed, failed }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n')
  
  const imagesDir = path.join(__dirname, '..', 'public', 'images')
  const startTime = Date.now()
  
  // Process each category
  const categories = ['global', 'team', 'coaches', 'sponsors', 'gallery']
  let totalProcessed = 0
  let totalFailed = 0
  
  for (const category of categories) {
    const categoryPath = path.join(imagesDir, category)
    if (!fs.existsSync(categoryPath)) continue
    
    console.log(`\n📁 Processing ${category}/...`)
    
    if (category === 'gallery') {
      // Process all gallery images with same config
      const galleryConfig = imageConfigs['gallery']
      const result = await processDirectory(categoryPath, category, galleryConfig)
      totalProcessed += result.processed
      totalFailed += result.failed
    } else {
      // Process individual files
      const files = fs.readdirSync(categoryPath)
      for (const file of files) {
        if (/\.(jpg|jpeg|png)$/i.test(file)) {
          const filePath = path.join(categoryPath, file)
          const fileRelativePath = path.join(category, file)
          const config = imageConfigs[fileRelativePath] || {
            maxWidth: 1200,
            maxHeight: 1200,
            quality: 80,
            formats: ['webp', 'avif'],
          }
          
          if (await optimizeImage(filePath, filePath, config)) {
            totalProcessed++
          } else {
            totalFailed++
          }
        }
      }
    }
  }
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1)
  
  console.log(`\n✨ Optimization complete!`)
  console.log(`   Processed: ${totalProcessed} images`)
  console.log(`   Failed: ${totalFailed} images`)
  console.log(`   Time: ${duration}s`)
  console.log(`\n💡 Next steps:`)
  console.log(`   1. Update image src paths in components to use .webp or .avif`)
  console.log(`   2. Add fallback to original format for older browsers`)
}

main().catch(console.error)
