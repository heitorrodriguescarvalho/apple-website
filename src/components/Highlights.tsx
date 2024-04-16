'use client'

import { rightImg, watchImg } from '@/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import VideoCarousel from './VideoCarousel'

export default function Highlights() {
  useGSAP(() => {
    gsap.to('#title', { opacity: 1, y: 0 })
    gsap.to('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25 })
  })

  return (
    <section
      id="highlights"
      className="common-padding h-full w-screen overflow-hidden bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between md:flex">
          <h1 id="title" className="section-heading">
            Get the Highlights
          </h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <Image
                src={watchImg}
                alt="watch"
                width={20}
                height={20}
                className="ml-2"
              />
            </p>
            <p className="link">
              Watch the Event
              <Image
                src={rightImg}
                alt="watch"
                width={7}
                height={11}
                className="ml-2"
              />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  )
}
