'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const teamMembers = [
  {
    id: 1,
    name: 'Alexis "Lee" Geluz',
    role: 'FOUNDER IMUS UNITED FC',
    image: '/images/coaches/lee.webp',
    facebook: 'https://www.facebook.com/kaleeboyan',
  },
  {
    id: 2,
    name: 'Kingnoel "Ino" Sanvicente',
    role: 'COACH',
    image: '/images/coaches/ino.webp',
    facebook: 'https://www.facebook.com/kingnoel.encio.sanvicente',
  },
  {
    id: 3,
    name: 'Karlo Mampolino',
    role: 'COACH',
    image: '/images/coaches/karlo.webp',
    facebook: 'https://www.facebook.com/karugzz',
  },
  {
    id: 4,
    name: 'Jovel "Jov" Paulo Bautista',
    role: 'COACH',
    image: '/images/coaches/jovel.webp',
    facebook: 'https://www.facebook.com/jovelpaulo',
  },
]

export default function TeamSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-gray-600 font-semibold mb-2">
            OUR TEAM
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">
            OUR MEMBER, COACHES
          </h2>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
                   <motion.div
                     key={member.id}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     className="text-left group"
                   >
                     {/* Member Image */}
                     <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={80}
                        loading="lazy"
                      />
                       {/* Facebook Icon Overlay */}
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                         <motion.a
                           href={member.facebook}
                           target="_blank"
                           rel="noopener noreferrer"
                           whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.9 }}
                           className="bg-[#1877F2] text-white p-4 rounded-full shadow-lg hover:bg-[#166FE5] transition-colors"
                           aria-label={`View ${member.name} on Facebook`}
                         >
                           <svg
                             className="w-8 h-8"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                             aria-hidden="true"
                           >
                             <path
                               fillRule="evenodd"
                               d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                               clipRule="evenodd"
                             />
                           </svg>
                         </motion.a>
                       </div>
                     </div>
                     
                     {/* Member Info */}
                     <div>
                       <h3 className="text-xl font-bold text-gray-900 mb-1">
                         {member.name}
                       </h3>
                       <p className="text-sm text-gray-600 uppercase tracking-wide">
                         {member.role}
                       </p>
                     </div>
                   </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
