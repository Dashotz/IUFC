'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface AnimatedCardProps {
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
  index: number
}

export default function AnimatedCard({
  slug,
  title,
  date,
  excerpt,
  image,
  index,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="h-full"
    >
      <Link
        href={`/blog/${slug}`}
        className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full"
      >
        {image ? (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </div>
        ) : (
          <motion.div
            className="h-48 bg-gradient-to-br from-primary-400 to-primary-600"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <div className="p-6">
          <motion.span
            className="text-sm text-primary-600 dark:text-primary-400"
            whileHover={{ scale: 1.1 }}
          >
            {date}
          </motion.span>
          <h3 className="text-xl font-semibold mt-2 mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
            {excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
