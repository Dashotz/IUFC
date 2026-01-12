'use client'

import Image from 'next/image'
import { ComponentProps } from 'react'

interface OptimizedImageProps extends Omit<ComponentProps<typeof Image>, 'src'> {
  src: string
  fallback?: string
}

export default function OptimizedImage({ src, fallback, ...props }: OptimizedImageProps) {
  // Convert src to WebP/AVIF if available
  const getOptimizedSrc = (originalSrc: string, format: 'webp' | 'avif' = 'webp') => {
    // Check if WebP/AVIF version exists
    const basePath = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '')
    return `${basePath}.${format}`
  }

  // Try AVIF first (best compression), fallback to WebP, then original
  const avifSrc = getOptimizedSrc(src, 'avif')
  const webpSrc = getOptimizedSrc(src, 'webp')
  const originalSrc = fallback || src

  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <source srcSet={webpSrc} type="image/webp" />
      <Image src={originalSrc} {...props} />
    </picture>
  )
}
