/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'

export default function AdminBackground() {
    return (
        <div className="fixed inset-0 z-0">
            {/* Dark Overlay Base */}
            <div className="absolute inset-0 bg-[#0a1628]"></div>

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 opacity-20">
                <Image
                    src="/images/global/image-bg.webp"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                    quality={50}
                />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#0a1628]/80 to-[#1e3a8a]/20"></div>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0a1628] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a1628] to-transparent"></div>
        </div>
    )
}
