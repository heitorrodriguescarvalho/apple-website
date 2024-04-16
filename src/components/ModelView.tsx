import { models } from '@/constants'
import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import * as THREE from 'three'
import Lights from './Lights'
import { Suspense } from 'react'
import Iphone from './Iphone'
import { OrbitControls as OrbitControlsType } from 'three-stdlib'
import Loader from './Loader'

interface ModelViewProps {
  index: number
  groupRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>
  gsapType: 'view1' | 'view2'
  controlRef: React.RefObject<OrbitControlsType>
  setRotationState: React.Dispatch<React.SetStateAction<number>>
  item: (typeof models)[number]
}

export default function ModelView({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
}: ModelViewProps) {
  return (
    <View
      index={index}
      id={gsapType}
      className={`absolute h-full w-full ${index === 2 && 'right-[-100%]'}`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current!.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={index === 1 ? 'small' : 'large'}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
          />
        </Suspense>
      </group>
    </View>
  )
}
