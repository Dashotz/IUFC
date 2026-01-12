import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/posts'
import BlogPostClient from './BlogPostClient'

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

  return <BlogPostClient post={post} />
}
