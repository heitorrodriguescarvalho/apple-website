import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export function animateWithGsap(
  target: string,
  animationProps?: gsap.TweenVars,
  scrollProps?: ScrollTrigger.Vars,
) {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    },
  })
}

export function animateWithGsapTimeline(
  timeline: gsap.core.Timeline,
  rotationRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: gsap.TweenVars,
) {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    durarion: 1,
    ease: 'power2.inOut',
  })

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<',
  )

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<',
  )
}
