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
        className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full group"
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
            className="h-48 bg-gradient-to-br from-barca-blue to-barca-dark"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-barca-red rounded-full"></span>
            <span className="text-xs text-gray-500 uppercase font-semibold">FIRST TEAM</span>
            <span className="text-xs text-gray-400">{date}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-barca-blue transition-colors">{title}</h3>
          <p className="text-gray-600 line-clamp-3">
            {excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
