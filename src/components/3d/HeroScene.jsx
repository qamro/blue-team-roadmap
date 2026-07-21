import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Ring, Torus, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ── Floating particles ────────────────────────────────────────
function Particles({ count = 2000 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r     = 2.5 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.04
      ref.current.rotation.x = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#00F5FF"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// ── Core glowing sphere ───────────────────────────────────────
function CyberSphere() {
  const meshRef    = useRef()
  const glowRef    = useRef()
  const ringRef1   = useRef()
  const ringRef2   = useRef()
  const ringRef3   = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.05
      glowRef.current.scale.set(s, s, s)
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.3
      ringRef1.current.rotation.z = t * 0.2
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = t * 0.4
      ringRef2.current.rotation.x = Math.PI / 3
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.z = -t * 0.25
      ringRef3.current.rotation.y = Math.PI / 4
    }
  })

  return (
    <group>
      {/* Core sphere */}
      <Sphere ref={meshRef} args={[1.2, 64, 64]}>
        <meshStandardMaterial
          color="#001133"
          emissive="#003399"
          emissiveIntensity={0.3}
          wireframe={false}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[1.22, 24, 24]}>
        <meshBasicMaterial
          color="#00F5FF"
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>

      {/* Glow sphere */}
      <Sphere ref={glowRef} args={[1.4, 32, 32]}>
        <meshBasicMaterial
          color="#0066FF"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer atmosphere */}
      <Sphere args={[1.8, 32, 32]}>
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.015}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Orbital rings */}
      <Torus ref={ringRef1} args={[1.8, 0.006, 16, 200]}>
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.5} />
      </Torus>
      <Torus ref={ringRef2} args={[2.2, 0.004, 16, 200]}>
        <meshBasicMaterial color="#0066FF" transparent opacity={0.4} />
      </Torus>
      <Torus ref={ringRef3} args={[2.6, 0.003, 16, 200]}>
        <meshBasicMaterial color="#00A3FF" transparent opacity={0.3} />
      </Torus>

      {/* Equatorial ring (static) */}
      <Ring args={[1.75, 1.80, 128]}>
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Ring>
    </group>
  )
}

// ── Floating data nodes ───────────────────────────────────────
function DataNodes() {
  const groupRef = useRef()

  const nodes = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      r:     2.8 + Math.random() * 0.5,
      y:     (Math.random() - 0.5) * 2,
      speed: 0.1 + Math.random() * 0.2,
      size:  0.03 + Math.random() * 0.04,
    })),
  [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const node  = nodes[i]
        const angle = node.angle + t * node.speed
        child.position.x = Math.cos(angle) * node.r
        child.position.z = Math.sin(angle) * node.r
        child.position.y = node.y + Math.sin(t * 0.5 + i) * 0.2
      })
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i}>
          <sphereGeometry args={[node.size, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#00F5FF' : i % 3 === 1 ? '#0066FF' : '#00A3FF'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// ── Grid plane ───────────────────────────────────────────────
function GridPlane() {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = -3 + (state.clock.elapsedTime * 0.1 % 1) * 0.5
    }
  })

  return (
    <gridHelper
      ref={ref}
      args={[30, 30, '#002244', '#001133']}
      position={[0, -3, 0]}
    />
  )
}

// ── Main scene ───────────────────────────────────────────────
function Scene() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]}   color="#0066FF" intensity={2} />
      <pointLight position={[-5, -5, 5]} color="#00F5FF" intensity={1.5} />
      <pointLight position={[0, 0, 8]}   color="#ffffff" intensity={0.5} />

      {/* Scene content */}
      <group ref={groupRef}>
        <CyberSphere />
        <DataNodes />
      </group>
      <Particles />
      <GridPlane />
    </>
  )
}

// ── Exported canvas ───────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  )
}
