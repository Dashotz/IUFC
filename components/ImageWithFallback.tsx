'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface ImageWithFallbackProps extends ImageProps {
  src: string
  webpSrc?: string
  avifSrc?: string
}

export default function ImageWithFallback({ 
  src, 
  webpSrc, 
  avifSrc, 
  alt,
  ...props 
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(webpSrc || src)
  const [hasError, setHasError] = useState(false)

  // Try WebP first, fallback to original
  const handleError = () => {
    if (!hasError && webpSrc && imgSrc === webpSrc) {
      setHasError(true)
      setImgSrc(src)
    }
  }

  // Generate WebP path if not provided
  const getWebpSrc = () => {
    if (webpSrc) return webpSrc
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  }

  const finalSrc = hasError ? src : (webpSrc || getWebpSrc())

  return (
    <Image
      src={finalSrc}
      alt={alt || ''}
      onError={handleError}
      {...props}
    />
  )
}
