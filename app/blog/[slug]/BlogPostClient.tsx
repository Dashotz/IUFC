'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Post } from '@/lib/posts'

interface BlogPostClientProps {
  post: Post
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href="/"
          className="text-barca-blue hover:text-barca-red hover:underline mb-6 inline-block font-semibold"
        >
          ← Back to Home
        </Link>
      </motion.div>
      
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>{post.date}</span>
          {post.author && <span>by {post.author}</span>}
        </div>
      </motion.header>

      {post.image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 h-64 relative rounded-lg overflow-hidden"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-barca-blue prose-a:hover:text-barca-red"
      >
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </motion.div>
    </article>
  )
}
