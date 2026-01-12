import Hero from '@/components/Hero'
import AboutContent from '@/components/about/AboutContent'

export default function About() {
  return (
    <div className="overflow-x-hidden w-full">
      {/* Hero Section with Navigation */}
      <div id="home">
        <Hero />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800"></div>

      {/* About Content */}
      <AboutContent />
    </div>
  )
}
