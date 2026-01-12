'use client'

import InfiniteMenu from './InfiniteMenu'
import { motion } from 'framer-motion'

interface MenuItem {
  image: string
  link: string
  title: string
  description: string
}

export default function TeamGallerySphere() {
  // Generate gallery items from gallery images
  const galleryItems: MenuItem[] = Array.from({ length: 30 }, (_, i) => {
    const imageNumber = i + 1
    return {
      image: `/images/gallery/gallery${imageNumber}.jpg`,
      link: `/images/gallery/gallery${imageNumber}.jpg`,
      title: `Team Photo ${imageNumber}`,
      description: 'Imus United FC Team Gallery'
    }
  })

  return (
    <section className="bg-gray-900 relative w-full overflow-hidden m-0 p-0" style={{ height: '100dvh' }}>
      {/* Overlay Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute top-8 left-0 right-0 z-10 text-center pointer-events-none"
      >
        <p className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-2">
          GALLERY
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">
          TEAM SPHERE
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
          Explore our team moments in an interactive 3D gallery. Click and drag to rotate.
        </p>
      </motion.div>
      
      {/* Full Coverage Sphere */}
      <div className="w-full h-full absolute inset-0 m-0 p-0">
        <InfiniteMenu items={galleryItems} scale={1.5} />
      </div>
    </section>
  )
}
