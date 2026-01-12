import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/posts'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link
        href="/"
        className="text-primary-600 dark:text-primary-400 hover:underline mb-6 inline-block"
      >
        ← Back to Home
      </Link>
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <span>{post.date}</span>
          {post.author && <span>by {post.author}</span>}
        </div>
      </header>

      {post.image && (
        <div className="mb-8 h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg"></div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  )
}
