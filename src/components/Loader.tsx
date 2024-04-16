import { Html } from '@react-three/drei'

export default function Loader() {
  return (
    <Html>
      <div className="top- absolute left-0 flex h-full w-full items-center justify-center">
        <div className="h-[10vw] w-[10vw] rounded-full">Loading...</div>
      </div>
    </Html>
  )
}
