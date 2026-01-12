'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        About Imus United Football Club
      </motion.h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl mb-6"
        >
          Imus United Football Club is a passionate football team from Imus, Cavite, Philippines, 
          dedicated to excellence, teamwork, and community spirit.
        </motion.p>
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Our Mission</h2>
          <p>
            We strive to compete at the highest level while maintaining our core values of respect, 
            integrity, and sportsmanship. Our goal is to inspire our community and develop talented 
            athletes who represent Imus with pride and passion.
          </p>
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Our History</h2>
          <p>
            Founded with a vision to create a competitive and inclusive football environment in Imus, 
            Imus United Football Club has grown into a respected team in the local football community. 
            We've achieved numerous milestones and continue to build on our successes, bringing together 
            players who share a love for the beautiful game.
          </p>
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Join Us</h2>
          <p>
            Whether you're a player, fan, or supporter, there's a place for you in the Imus United 
            Football Club family. Follow us on <a href="https://www.facebook.com/imusunitedfootballclub" target="_blank" rel="noopener noreferrer">Facebook</a> and stay updated with all our latest news and events.
          </p>
        </motion.section>
      </div>
    </div>
  )
}
