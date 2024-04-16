import { hightlightsSlides } from '@/constants'
import { pauseImg, playImg, replayImg } from '@/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function VideoCarousel() {
  const videoRef = useRef<HTMLVideoElement[]>([])
  const videoSpanRef = useRef<HTMLSpanElement[]>([])
  const videoDivRef = useRef<HTMLSpanElement[]>([])

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  })

  const { isEnd, isLastVideo, isPlaying, startPlay, videoId } = video

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    })

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }))
      },
    })
  }, [isEnd, videoId])

  useEffect(() => {
    if (!isPlaying) {
      videoRef.current[videoId].pause()
    } else {
      startPlay && videoRef.current[videoId].play()
    }
  }, [startPlay, videoId, isPlaying])

  useEffect(() => {
    let currentProgress = 0
    const span = videoSpanRef.current

    if (span[videoId]) {
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100)

          if (progress !== currentProgress) {
            currentProgress = progress

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? '10vw'
                  : window.innerWidth < 1200
                    ? '10vw'
                    : '4vw',
            })

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white',
            })
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '0.75rem',
            })

            gsap.to(span[videoId], {
              backgroundColor: '#afafaf',
            })
          }
        },
      })

      if (videoId === 0) {
        anim.restart()
      }
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration,
        )
      }

      if (isPlaying) {
        gsap.ticker.add(animUpdate)
      } else {
        gsap.ticker.remove(animUpdate)
      }
    }
  }, [videoId, startPlay, isPlaying])

  const handleProcess = (type?: string, i?: number) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i! + 1 }))
        break

      case 'video-last':
        setVideo((prev) => ({ ...prev, isLastVideo: true }))
        break

      case 'video-reset':
        setVideo((prev) => ({ ...prev, videoId: 0 }))
        break

      case 'play': {
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
        break
      }

      case 'pause': {
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
        break
      }
      default:
        return video
    }
  }

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map(({ id, video, textLists }, index) => (
          <div key={id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="flex-center h-full w-full overflow-hidden rounded-3xl bg-black">
                <video
                  id="video"
                  playsInline
                  preload="auto"
                  className={`${id === 2 && 'translate-x-44'}`}
                  muted
                  ref={(video) => {
                    videoRef.current[index] = video!
                  }}
                  onPlay={() =>
                    setVideo((prev) => ({ ...prev, isPlaying: true }))
                  }
                  onEnded={() =>
                    index !== 3
                      ? handleProcess('video-end', index)
                      : handleProcess('video-last')
                  }
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute left-[5%] top-12 z-10">
                {textLists.map((text) => (
                  <p key={text} className="text-xl font-medium md:text-2xl">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-center relative mt-10">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(div) => {
                videoDivRef.current[i] = div!
              }}
              className="relative mx-2 h-3 w-3 cursor-pointer rounded-full bg-gray-200"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(span) => {
                  videoSpanRef.current[i] = span!
                }}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <Image
            src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
            alt={isLastVideo ? 'replay' : isPlaying ? 'pause' : 'play'}
            height={24}
            width={24}
            onClick={() =>
              handleProcess(
                isLastVideo ? 'video-reset' : isPlaying ? 'pause' : 'play',
              )
            }
          />
        </button>
      </div>
    </>
  )
}
