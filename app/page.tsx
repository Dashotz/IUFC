import Hero from '@/components/Hero'
import Sponsors from '@/components/Sponsors'
import TwoColumnSection from '@/components/TwoColumnSection'
import BenefitsSection from '@/components/BenefitsSection'
import EventsSection from '@/components/EventsSection'
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'
import Divider from '@/components/Divider'

export default function Home() {
  return (
    <>
      <div id="home">
        <Hero />
      </div>
      
      <Divider variant="dark" />
      
      <div id="sponsors">
        <Sponsors />
      </div>
      
      <Divider variant="dark" />
      
      <div id="mission">
        <TwoColumnSection />
      </div>
      
      <Divider variant="dark" />
      
      <div id="benefits">
        <BenefitsSection />
      </div>
      
      <Divider variant="dark" />
      
      <div id="events">
        <EventsSection />
      </div>
      
      <Divider variant="light" />
      
      <div id="coaches">
        <TeamSection />
      </div>
      
      <Divider variant="light" />
      
      <div id="contact">
        <ContactSection />
      </div>
    </>
  )
}
