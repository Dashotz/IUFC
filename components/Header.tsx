'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
    >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/global/logo.png"
                  alt="Imus United Football Club Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                  priority
                />
                <span className="text-xl font-bold text-white hidden sm:inline">
                  IMUS UNITED FC
                </span>
              </Link>
            </motion.div>
            <div className="flex gap-8 items-center">
              {['FIRST TEAM', 'CLUB', 'NEWS'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item === 'FIRST TEAM' ? '/' : item === 'CLUB' ? '/about' : '/#latest'}
                    className="text-white hover:text-barca-red transition-colors font-semibold text-sm uppercase tracking-wide relative group"
                  >
                    {item}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-barca-red group-hover:w-full transition-all duration-300"
                      layoutId={`underline-${item}`}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </nav>
    </motion.header>
  )
}
