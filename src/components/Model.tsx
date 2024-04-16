'use client'

import { models, sizes } from '@/constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import ModelView from './ModelView'
import { View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from 'three-stdlib'
import { animateWithGsapTimeline } from '@/utils/animations'

export default function Model() {
  const [size, setSize] = useState<(typeof sizes)[number]['value']>('small')
  const [model, setModel] = useState(models[0])

  const cameraControlSmall = useRef<OrbitControls>(null)
  const cameraControlLarge = useRef<OrbitControls>(null)

  const small = useRef(new THREE.Group())
  const large = useRef(new THREE.Group())

  const [smallRotation, setSmallRotation] = useState(0)
  const [largeRotation, setLargeRotation] = useState(0)

  const timeline = gsap.timeline()

  useEffect(() => {
    if (size === 'large') {
      animateWithGsapTimeline(
        timeline,
        small,
        smallRotation,
        '#view1',
        '#view2',
        {
          transform: 'translateX(-100%)',
          duration: 2,
        },
      )
    }

    if (size === 'small') {
      animateWithGsapTimeline(
        timeline,
        large,
        largeRotation,
        '#view2',
        '#view1',
        {
          transform: 'translateX(0)',
          duration: 2,
        },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 })
  }, [])

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>
        <div className="mt-5 flex flex-col items-center">
          <div className="relative h-[75vh] w-full overflow-hidden md:h-[90vh]">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
            />
            <Canvas
              className="h-full w-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
              }}
              eventSource={document.querySelector('body') as HTMLElement}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="mb-5 text-center text-sm font-light">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, index) => (
                  <li
                    key={index}
                    className="mx-2 h-6 w-6 cursor-pointer rounded-full"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    onClick={() => setSize(value)}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? 'white' : 'transparent',
                      color: size === value ? 'black' : 'white',
                    }}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
