import { getPosts } from '@/lib/posts'
import AnimatedHero from '@/components/AnimatedHero'
import AnimatedCard from '@/components/AnimatedCard'
import ImageGallery from '@/components/ImageGallery'

export default function Home() {
  const posts = getPosts()

  // Sample gallery images - replace with actual team photos
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
      alt: 'Team training session',
      title: 'Training Session',
    },
    {
      src: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=600&fit=crop',
      alt: 'Match action',
      title: 'Match Action',
    },
    {
      src: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&h=600&fit=crop',
      alt: 'Team celebration',
      title: 'Victory Celebration',
    },
    {
      src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop',
      alt: 'Team photo',
      title: 'Team Photo',
    },
    {
      src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
      alt: 'Stadium view',
      title: 'Home Stadium',
    },
    {
      src: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=600&fit=crop',
      alt: 'Fans cheering',
      title: 'Fan Support',
    },
  ]

  return (
    <>
      <AnimatedHero />
      
      <div id="latest" className="container mx-auto px-4 py-12">
        {/* Latest Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <AnimatedCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                image={post.image}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Image Gallery */}
        <ImageGallery images={galleryImages} />
      </div>
    </>
  )
}
