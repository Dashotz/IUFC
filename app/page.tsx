import Hero from '@/components/Hero'
import Sponsors from '@/components/Sponsors'
import TwoColumnSection from '@/components/TwoColumnSection'
import BenefitsSection from '@/components/BenefitsSection'
import EventsSection from '@/components/EventsSection'
import TeamSection from '@/components/TeamSection'
import TeamGallerySphere from '@/components/TeamGallerySphere'
import ContactSection from '@/components/ContactSection'

export default function Home() {

  return (
    <div className="overflow-x-hidden w-full">
      <div id="home">
        <Hero />
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-gray-800"></div>
      
      {/* Sponsors Section */}
      <div id="sponsors">
        <Sponsors />
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-gray-800"></div>
      
      {/* Two Column Section - Mission */}
      <div id="mission">
        <TwoColumnSection />
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-gray-800"></div>
      
      {/* Benefits Section */}
      <div id="benefits">
        <BenefitsSection />
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-gray-800"></div>
      
      {/* Events Section */}
      <div id="events">
        <EventsSection />
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-gray-300"></div>
      
      {/* Team Gallery Sphere */}
      <div id="gallery">
        <TeamGallerySphere />
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-gray-300"></div>
      
      {/* Team Section - Coaches */}
      <div id="coaches">
        <TeamSection />
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-gray-300"></div>
      
      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  )
}
