'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import TeamSection from '@/components/TeamSection'
import Divider from '@/components/Divider'
import { images } from '@/app/assets/images'

export default function AboutContent() {
  return (
    <>
      {/* About Header Section */}
      <section className="bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-2">
              ABOUT US
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              IMUS UNITED FOOTBALL CLUB
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              A non-profit organization dedicated to developing morally upright athletes capable of availing scholarships and competing at the national and international level.
            </p>
          </motion.div>
        </div>
      </section>

      <Divider variant="dark" />

      {/* Mission Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src={images.team.banner1}
                alt="Imus United FC - Team in Action"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-wider text-gray-600 font-semibold">
                OUR MISSION
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                DEVELOPING CHAMPIONS FOR THE FUTURE
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We strive to compete at the highest level while maintaining our core values of respect, integrity, and sportsmanship. Our goal is to inspire our community and develop talented athletes who represent Imus with pride and passion.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through comprehensive training programs, competitive opportunities, and mentorship, we aim to create pathways for our athletes to achieve academic and athletic excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Divider variant="light" />

      {/* History Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <p className="text-sm uppercase tracking-wider text-gray-600 font-semibold">
                OUR HISTORY
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                BUILDING A LEGACY
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded with a vision to create a competitive and inclusive football environment in Imus, Imus United Football Club has grown into a respected team in the local football community.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We've achieved numerous milestones and continue to build on our successes, bringing together players who share a love for the beautiful game and a commitment to excellence both on and off the field.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl order-1 lg:order-2"
            >
              <Image
                src={images.team.banner2}
                alt="Imus United FC - Team Celebration"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Divider variant="light" />

      {/* Values Section */}
      <section className="bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-2">
              OUR VALUES
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-12">
              WHAT WE STAND FOR
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'RESPECT',
                description: 'We value respect for teammates, opponents, coaches, and the game itself. Respect is the foundation of our team culture.',
                icon: '🤝',
              },
              {
                title: 'INTEGRITY',
                description: 'We conduct ourselves with honesty and integrity, both on and off the field, setting an example for our community.',
                icon: '⚖️',
              },
              {
                title: 'EXCELLENCE',
                description: 'We strive for excellence in everything we do, pushing ourselves to be better athletes, students, and individuals.',
                icon: '⭐',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-800 p-8 rounded-lg text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-white/80 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider variant="dark" />

      {/* Coaches Section */}
      <section id="coaches" className="bg-white py-16 md:py-24">
        <TeamSection />
      </section>

      <Divider variant="light" />

      {/* Join Us Section */}
      <section className="bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              JOIN US
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Whether you're a player, fan, or supporter, there's a place for you in the Imus United Football Club family. Follow us on Facebook and stay updated with all our latest news and events.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="https://www.facebook.com/imusunitedfootballclub"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-barca-red text-white px-8 py-4 font-bold uppercase tracking-wide hover:bg-barca-red/90 transition-colors shadow-lg inline-block"
              >
                Follow Us on Facebook
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
