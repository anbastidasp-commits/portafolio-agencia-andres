import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const REDUCED =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

/** Blob cromado líquido: icosaedro distorsionado, metálico, con reflejos de estudio. */
function ChromeBlob() {
  const mesh = useRef<THREE.Mesh>(null)
  const target = useRef(new THREE.Vector2(0, 0))

  useFrame((state, delta) => {
    const m = mesh.current
    if (!m) return
    if (!REDUCED) {
      m.rotation.y += delta * 0.18
      m.rotation.z += delta * 0.04
    }
    // Parallax suave: el blob se inclina hacia el cursor
    target.current.x += (state.pointer.x - target.current.x) * 0.04
    target.current.y += (state.pointer.y - target.current.y) * 0.04
    m.rotation.x = target.current.y * 0.4
    m.position.x = target.current.x * 0.25
  })

  return (
    <Float speed={REDUCED ? 0 : 1.1} rotationIntensity={0.5} floatIntensity={1.4}>
      <mesh ref={mesh} scale={1.55}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color="#c2ccd2"
          metalness={1}
          roughness={0.12}
          envMapIntensity={3.2}
          distort={REDUCED ? 0 : 0.34}
          speed={REDUCED ? 0 : 1.6}
        />
      </mesh>
    </Float>
  )
}

/** Estudio de luces procedural (sin descargar HDR — funciona offline / single-file). */
function StudioEnv() {
  return (
    <Environment resolution={256}>
      <group>
        {/* Fondo frío base */}
        <Lightformer
          form="rect"
          intensity={0.6}
          color="#1b2a36"
          scale={[12, 12, 1]}
          position={[0, 0, -8]}
        />
        {/* Banda clave superior (reflejo principal) */}
        <Lightformer
          form="rect"
          intensity={5}
          color="#ffffff"
          scale={[10, 2.4, 1]}
          position={[0, 5, 2]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        {/* Banda secundaria frontal para más cromado */}
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#eef3f5"
          scale={[8, 1.6, 1]}
          position={[2, 2, 6]}
        />
        {/* Relleno lateral frío */}
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#7f95a3"
          scale={[3, 8, 1]}
          position={[-6, 1, 1]}
          rotation={[0, Math.PI / 2, 0]}
        />
        {/* Contra cálido tenue para contraste cromado */}
        <Lightformer
          form="circle"
          intensity={1.4}
          color="#cdd6da"
          scale={[4, 4, 1]}
          position={[6, -2, 2]}
        />
      </group>
    </Environment>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 5]} intensity={20} color="#cdd6da" />
      <Suspense fallback={null}>
        <ChromeBlob />
        <StudioEnv />
        <Sparkles
          count={50}
          scale={[9, 6, 4]}
          size={1.6}
          speed={REDUCED ? 0 : 0.25}
          opacity={0.35}
          color="#9BA8AB"
          position={[0, 0, 1]}
        />
      </Suspense>
    </Canvas>
  )
}
