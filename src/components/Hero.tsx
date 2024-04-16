'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '@/utils'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [videoSrc, setVideoSrc] = useState(
    typeof window !== 'undefined' && window.innerWidth < 760
      ? smallHeroVideo
      : heroVideo,
  )

  useEffect(() => {
    const handleResizeVideo = () => {
      const src = window.innerWidth < 760 ? smallHeroVideo : heroVideo

      if (videoSrc !== src) {
        setVideoSrc(src)
      }
    }

    window.addEventListener('resize', handleResizeVideo)

    return () => window.removeEventListener('resize', handleResizeVideo)
  }, [videoSrc])

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 })

    gsap.to('#cta', {
      opacity: 1,
      y: -50,
      delay: 2,
    })
  }, [])

  return (
    <section className="nav-height relative w-full bg-black">
      <div className="flex-center h-5/6 w-full flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="w-3/4 md:w-5/6">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        id="cta"
        className="flex translate-y-20 flex-col items-center opacity-0"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="text-xl font-normal">From $199/month or $999</p>
      </div>
    </section>
  )
}
