// import HealthWrapped from './components/healthWrapped'
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <HealthWrapped></HealthWrapped>
//     </div>
//   );
// }

// export default App;

import mountain from './assets/mountain.jpeg'
import marathon from './assets/marathon.jpeg'
import mountainStairs from './assets/mountainStairs.jpeg'
import backPacker from './assets/backPacker.jpeg'
import jumprope from './assets/jumprope.jpeg'
import ultramarathon from './assets/ultramarathon.webp'
import climbing from './assets/climbing.jpeg'
import snowboarding from './assets/snowboarding.jpeg'
import cliffJumping from './assets/cliffjumping.webp'
import HealthWrapped from './components/healthWrapped'
import running2 from './assets/running2.jpeg'
import './App.css'


import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIntersect, Image, ScrollControls, Scroll } from '@react-three/drei'

function Item({ url, scale, ...props }) {
  const visible = useRef(false)
  const [hovered, hover] = useState(false)
  const ref = useIntersect((isVisible) => (visible.current = isVisible))
  const { height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, visible.current ? 0 : -height / 2 + 1, 4, delta)
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 1.5, 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 0 : 1, 4, delta)
  })
  return (
    <group {...props}>
      <Image ref={ref} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} scale={scale} url={url} />
    </group>
  )
}

function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport)
  return (
    <Scroll>
      <Item url={mountain} scale={[w / 3, w / 3.5, 1]} position={[-w / 5, 0, 0]} />
      <Item url={running2} scale={[w / 2.5, w / 4, 1]} position={[ w/4, 0, 0]} />
      <Item url={marathon} scale={[3, w / 3, 1]} position={[w / 30, -h, 0]} />
      <Item url={mountainStairs} scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 1, 0]} />
      <Item url={backPacker} scale={[w / 4, w / 4, 1]} position={[w / 3.5, -h * .9, 0]} />
      <Item url={jumprope} scale={[w / 5, w / 5, 1]} position={[w / 10, -h * 1.75, 0]} />
      <Item url={ultramarathon} scale={[w / 3, w / 3, 1]} position={[-w / 4, -h * 2, 0]} />
      <Item url={climbing} scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 2.6, 0]} />
      <Item url={snowboarding} scale={[w / 2, w / 2, 1]} position={[w / 4, -h * 3.1, 0]} />
      <Item url={cliffJumping} scale={[w / 2.5, w / 2, 1]} position={[-w / 6, -h * 4.1, 0]} />
    </Scroll>
  )
}

export const App = () => (
  <Canvas orthographic camera={{ zoom: 80 }} gl={{ alpha: false, antialias: false, stencil: false, depth: false }} dpr={[1, 1.5]}>
    <color attach="background" args={['#ce6262']} />
    <ScrollControls damping={6} pages={5}>
      <Items />
      <Scroll html style={{ width: '100%' }}>
        <HealthWrapped></HealthWrapped>
      </Scroll>
    </ScrollControls>
  </Canvas>
)

