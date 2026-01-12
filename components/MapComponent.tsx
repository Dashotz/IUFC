'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Coordinates for Tishabet Field, Imus City, Cavite
    const tishabetFieldCoords: [number, number] = [14.4431022, 120.9277401]

    // Initialize map
    const map = L.map(mapRef.current, {
      center: tishabetFieldCoords,
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false,
    })

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Add marker
    const icon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    })

    L.marker(tishabetFieldCoords, { icon })
      .addTo(map)
      .bindPopup('Tishabet Field<br>Toclong 2-A, Imus City, Cavite')
      .openPopup()

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return <div ref={mapRef} className="w-full h-full" />
}
