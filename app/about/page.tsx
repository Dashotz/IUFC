import Hero from '@/components/Hero'
import AboutContent from '@/components/about/AboutContent'
import Divider from '@/components/Divider'

export default function About() {
  return (
    <>
      <div id="home">
        <Hero />
      </div>

      <Divider variant="dark" />

      <AboutContent />
    </>
  )
}
