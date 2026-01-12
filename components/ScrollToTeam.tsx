'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ScrollToTeam() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Get the gallery section element
      const gallerySection = document.getElementById('gallery')
      const coachesSection = document.getElementById('coaches')
      
      if (!gallerySection || !coachesSection) return
      
      const galleryRect = gallerySection.getBoundingClientRect()
      const coachesRect = coachesSection.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Show button when:
      // 1. Gallery section is in view (top of gallery is above bottom of viewport)
      // 2. Coaches section is not yet in view (top of coaches is below bottom of viewport)
      const isGalleryInView = galleryRect.top < windowHeight && galleryRect.bottom > 0
      const isCoachesInView = coachesRect.top < windowHeight
      
      setIsVisible(isGalleryInView && !isCoachesInView)
    }

    window.addEventListener('scroll', toggleVisibility)
    toggleVisibility() // Check on mount
    
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTeam = () => {
    const coachesSection = document.getElementById('coaches')
    if (coachesSection) {
      coachesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTeam}
          className="fixed bottom-8 left-8 bg-barca-blue text-white p-4 rounded-full shadow-lg hover:bg-barca-dark transition-colors z-50"
          aria-label="Scroll to team section"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
