import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Sphere, Torus, Ring } from '@react-three/drei'
import * as THREE from 'three'

// ── Mouse-reactive camera ─────────────────────────────────────
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.04
    camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── Dense star field ──────────────────────────────────────────
function StarField() {
  const ref = useRef()
  const count = 3000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return pos
  }, [])

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.01
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#A8D4FF" size={0.04} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  )
}

// ── Floating hex particles ────────────────────────────────────
function HexParticles() {
  const groupRef = useRef()
  const count = 60

  const particles = useMemo(() =>
    Array.from({ length: count }, () => ({
      pos:   [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 2,
      ],
      speed: 0.2 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      size:  0.015 + Math.random() * 0.04,
      color: Math.random() > 0.6 ? '#00F5FF' : Math.random() > 0.5 ? '#0066FF' : '#00A3FF',
    })),
  [])

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i]
      child.position.y = p.pos[1] + Math.sin(t * p.speed + p.phase) * 0.6
      child.position.x = p.pos[0] + Math.cos(t * p.speed * 0.5 + p.phase) * 0.2
      child.material.opacity = 0.4 + Math.sin(t * p.speed + p.phase) * 0.3
    })
  })

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// ── Core cyber shield ─────────────────────────────────────────
function CyberShield() {
  const groupRef  = useRef()
  const coreRef   = useRef()
  const pulseRef  = useRef()
  const ring1Ref  = useRef()
  const ring2Ref  = useRef()
  const ring3Ref  = useRef()
  const ring4Ref  = useRef()
  const energyRef = useRef()

  useFrame((s) => {
    const t = s.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12
    }
    if (coreRef.current) {
      const sc = 1 + Math.sin(t * 1.8) * 0.03
      coreRef.current.scale.set(sc, sc, sc)
    }
    if (pulseRef.current) {
      const ps = 1 + Math.sin(t * 1.2) * 0.12
      pulseRef.current.scale.set(ps, ps, ps)
      pulseRef.current.material.opacity = 0.06 + Math.sin(t * 1.2) * 0.04
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5
      ring1Ref.current.rotation.z = t * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.4
      ring2Ref.current.rotation.x = Math.PI / 2.5 + t * 0.2
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -t * 0.35
      ring3Ref.current.rotation.y = t * 0.15
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.x = Math.PI / 3
      ring4Ref.current.rotation.z = t * 0.25
    }
    if (energyRef.current) {
      const es = 1 + Math.sin(t * 0.8) * 0.08
      energyRef.current.scale.set(es, es, es)
      energyRef.current.material.opacity = 0.03 + Math.sin(t * 0.8) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={[2.5, 0, 0]}>
      {/* Energy field (outermost) */}
      <Sphere ref={energyRef} args={[3.5, 32, 32]}>
        <meshBasicMaterial color="#0033AA" transparent opacity={0.04} side={THREE.BackSide} />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[2.6, 32, 32]}>
        <meshBasicMaterial color="#0066FF" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>

      {/* Core sphere */}
      <Sphere ref={coreRef} args={[1.0, 64, 64]}>
        <meshStandardMaterial
          color="#000D22"
          emissive="#003399"
          emissiveIntensity={0.6}
          roughness={0.05}
          metalness={0.95}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[1.02, 20, 20]}>
        <meshBasicMaterial color="#00F5FF" wireframe transparent opacity={0.06} />
      </Sphere>

      {/* Pulse sphere */}
      <Sphere ref={pulseRef} args={[1.3, 32, 32]}>
        <meshBasicMaterial color="#00A3FF" transparent opacity={0.07} side={THREE.BackSide} />
      </Sphere>

      {/* Orbital rings */}
      <Torus ref={ring1Ref} args={[1.7, 0.008, 16, 300]}>
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.7} />
      </Torus>
      <Torus ref={ring2Ref} args={[2.1, 0.005, 16, 300]}>
        <meshBasicMaterial color="#0088FF" transparent opacity={0.5} />
      </Torus>
      <Torus ref={ring3Ref} args={[2.5, 0.004, 16, 300]}>
        <meshBasicMaterial color="#00CCFF" transparent opacity={0.4} />
      </Torus>
      <Torus ref={ring4Ref} args={[2.9, 0.003, 16, 300]}>
        <meshBasicMaterial color="#0055FF" transparent opacity={0.25} />
      </Torus>

      {/* Equatorial ring bright */}
      <Ring args={[1.65, 1.72, 128]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.4} side={THREE.DoubleSide} />
      </Ring>

      {/* Orbiting data nodes */}
      <OrbitingNodes />
    </group>
  )
}

// ── Orbiting nodes around shield ──────────────────────────────
function OrbitingNodes() {
  const groupRef = useRef()

  const nodes = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      angle:  (i / 8) * Math.PI * 2,
      radius: 1.7 + (i % 3) * 0.4,
      tilt:   (i % 4) * (Math.PI / 4),
      speed:  0.15 + (i % 3) * 0.1,
      size:   0.04 + (i % 3) * 0.025,
      color:  i % 3 === 0 ? '#00F5FF' : i % 3 === 1 ? '#0066FF' : '#00D4FF',
    })),
  [])

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const n     = nodes[i]
      const angle = n.angle + t * n.speed
      child.position.x = Math.cos(angle) * n.radius
      child.position.z = Math.sin(angle) * n.radius
      child.position.y = Math.sin(angle * 0.5 + n.tilt) * 0.5
    })
  })

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i}>
          <sphereGeometry args={[n.size, 8, 8]} />
          <meshBasicMaterial color={n.color} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

// ── Floating data stream lines ────────────────────────────────
function DataStreams() {
  const lines = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const points = []
      const startX = -8 + Math.random() * 4
      const startY = (Math.random() - 0.5) * 6
      const startZ = (Math.random() - 0.5) * 4
      for (let j = 0; j < 20; j++) {
        points.push(new THREE.Vector3(
          startX + j * 0.8 + Math.sin(j * 0.5) * 0.3,
          startY + Math.sin(j * 0.3 + i) * 0.2,
          startZ + Math.cos(j * 0.4) * 0.2,
        ))
      }
      return { points, color: i % 3 === 0 ? '#00F5FF' : '#0044BB', opacity: 0.1 + Math.random() * 0.2 }
    })
  }, [])

  const refs = useRef(lines.map(() => null))

  useFrame((s) => {
    const t = s.clock.elapsedTime
    refs.current.forEach((ref, i) => {
      if (ref) ref.material.opacity = (lines[i].opacity + Math.sin(t * 0.5 + i) * 0.1)
    })
  })

  return (
    <>
      {lines.map((line, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(line.points)
        return (
          <line key={i} ref={el => refs.current[i] = el} geometry={geometry}>
            <lineBasicMaterial color={line.color} transparent opacity={line.opacity} />
          </line>
        )
      })}
    </>
  )
}

// ── Scanning radar ring ───────────────────────────────────────
function RadarScan() {
  const ref = useRef()

  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 0.8
  })

  return (
    <group position={[2.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <Ring ref={ref} args={[0, 3.5, 64]} rotation={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </Ring>
    </group>
  )
}

// ── Main exported canvas ──────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <CameraRig />

      {/* Lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]}   color="#0066FF" intensity={3} />
      <pointLight position={[-4, -2, 4]} color="#00F5FF" intensity={2} />
      <pointLight position={[0, 0, 10]}  color="#ffffff" intensity={0.4} />
      <pointLight position={[2.5, 0, 0]} color="#00D4FF" intensity={4} distance={6} />

      <StarField />
      <HexParticles />
      <CyberShield />
      <DataStreams />
      <RadarScan />
    </Canvas>
  )
}