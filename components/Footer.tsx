'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            © {new Date().getFullYear()} Imus United Football Club. All rights reserved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 flex justify-center gap-6"
          >
            <motion.a
              href="https://www.facebook.com/imusunitedfootballclub"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -5 }}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              Twitter
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -5 }}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </motion.a>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
