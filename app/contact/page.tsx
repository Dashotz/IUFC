'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Contact Us
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            Have a question or want to reach out? We'd love to hear from you!
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> contact@imusunitedfc.com</p>
            <p><strong>Phone:</strong> +63 XXX XXX XXXX</p>
            <p><strong>Address:</strong> Imus, Cavite, Philippines</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <p className="text-gray-600 mb-4">
            Stay connected with us on social media for the latest updates.
          </p>
          <div className="space-y-2">
            <motion.a
              href="https://www.facebook.com/imusunitedfootballclub"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              className="block text-barca-blue hover:text-barca-red hover:underline"
            >
              Facebook
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, x: 5 }}
              className="block text-barca-blue hover:text-barca-red hover:underline"
            >
              Twitter
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, x: 5 }}
              className="block text-barca-blue hover:text-barca-red hover:underline"
            >
              Instagram
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, x: 5 }}
              className="block text-barca-blue hover:text-barca-red hover:underline"
            >
              YouTube
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
        <form className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-barca-blue focus:border-transparent transition-all"
              placeholder="Your name"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-barca-blue focus:border-transparent transition-all"
              placeholder="your.email@example.com"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label htmlFor="message" className="block mb-2 font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-barca-blue focus:border-transparent transition-all"
              placeholder="Your message"
            ></textarea>
          </motion.div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-barca-blue text-white px-6 py-2 rounded-lg hover:bg-barca-dark transition-colors font-semibold uppercase tracking-wide"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
