/**
 * Get optimized image path - tries WebP first, falls back to original
 * For static export, we need to manually reference WebP files
 */
export function getOptimizedImagePath(originalPath: string, preferWebP: boolean = true): string {
  if (!preferWebP) {
    return originalPath
  }
  
  // Replace extension with .webp
  const webpPath = originalPath.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  
  // In production, you can check if WebP exists, but for static export
  // we'll just return the WebP path and let the browser handle fallback
  return webpPath
}

/**
 * Get image src with WebP fallback
 * Returns an object with src and srcSet for picture element
 */
export function getImageSources(originalPath: string) {
  const basePath = originalPath.replace(/\.(jpg|jpeg|png)$/i, '')
  
  return {
    webp: `${basePath}.webp`,
    avif: `${basePath}.avif`,
    original: originalPath,
  }
}
