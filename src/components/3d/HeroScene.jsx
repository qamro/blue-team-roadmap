import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// ── Mouse tracker ─────────────────────────────────────────────
function MouseTracker({ mouseRef }) {
  const { camera, size } = useThree()
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / size.width  - 0.5) * 2
      mouseRef.current.y = -(e.clientY / size.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [size])
  useFrame(() => {
    camera.position.x += (mouseRef.current.x * 1.5 - camera.position.x) * 0.03
    camera.position.y += (mouseRef.current.y * 0.8 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── Infinite tunnel of rings ──────────────────────────────────
function CyberTunnel() {
  const groupRef = useRef()
  const rings = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      z: -i * 3,
      scale: 1 + i * 0.04,
      opacity: Math.max(0, 1 - i * 0.04),
      rotSpeed: (i % 2 === 0 ? 1 : -1) * (0.2 + i * 0.01),
      sides: i % 3 === 0 ? 6 : i % 3 === 1 ? 8 : 12,
    })), [])

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.z = t * rings[i].rotSpeed
        // Pulse
        const pulse = 1 + Math.sin(t * 1.5 + i * 0.3) * 0.015
        child.scale.set(rings[i].scale * pulse, rings[i].scale * pulse, 1)
      })
    }
  })

  return (
    <group ref={groupRef}>
      {rings.map((r, i) => (
        <mesh key={i} position={[0, 0, r.z]}>
          <ringGeometry args={[2.8, 3.0, r.sides]} />
          <meshBasicMaterial
            color={i % 4 === 0 ? '#00F5FF' : i % 4 === 1 ? '#0066FF' : i % 4 === 2 ? '#0099FF' : '#003399'}
            transparent
            opacity={r.opacity * 0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

// ── DNA helix data strands ────────────────────────────────────
function DataHelix() {
  const ref1 = useRef(), ref2 = useRef()

  const { positions1, positions2, connectors } = useMemo(() => {
    const p1 = [], p2 = [], conn = []
    const count = 60
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 8
      const y = (i / count) * 20 - 10
      p1.push(new THREE.Vector3(Math.cos(t) * 1.5, y, Math.sin(t) * 1.5 - 6))
      p2.push(new THREE.Vector3(Math.cos(t + Math.PI) * 1.5, y, Math.sin(t + Math.PI) * 1.5 - 6))
      if (i % 4 === 0) conn.push(i)
    }
    return { positions1: p1, positions2: p2, connectors: conn }
  }, [])

  useFrame((s) => {
    const t = s.clock.elapsedTime * 0.3
    ;[ref1, ref2].forEach((ref) => {
      if (ref.current) ref.current.rotation.y = t
    })
  })

  const curve1 = new THREE.CatmullRomCurve3(positions1)
  const curve2 = new THREE.CatmullRomCurve3(positions2)

  return (
    <group ref={ref1}>
      {/* Strand 1 */}
      <mesh>
        <tubeGeometry args={[curve1, 200, 0.015, 6, false]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.7} />
      </mesh>
      {/* Strand 2 */}
      <mesh>
        <tubeGeometry args={[curve2, 200, 0.015, 6, false]} />
        <meshBasicMaterial color="#0066FF" transparent opacity={0.7} />
      </mesh>
      {/* Connector bars */}
      {connectors.map((idx) => {
        const p1 = positions1[idx]
        const p2 = positions2[idx]
        const mid = new THREE.Vector3().lerpVectors(p1, p2, 0.5)
        const len = p1.distanceTo(p2)
        const dir = new THREE.Vector3().subVectors(p2, p1).normalize()
        const q   = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
        return (
          <mesh key={idx} position={mid} quaternion={q}>
            <cylinderGeometry args={[0.008, 0.008, len, 4]} />
            <meshBasicMaterial color="#00DDFF" transparent opacity={0.4} />
          </mesh>
        )
      })}
      {/* Node spheres */}
      {positions1.filter((_, i) => i % 6 === 0).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#00F5FF" />
        </mesh>
      ))}
      {positions2.filter((_, i) => i % 6 === 0).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#0066FF" />
        </mesh>
      ))}
    </group>
  )
}

// ── Holographic shield core ───────────────────────────────────
function ShieldCore() {
  const outerRef = useRef()
  const innerRef = useRef()
  const glowRef  = useRef()
  const hex1Ref  = useRef()
  const hex2Ref  = useRef()
  const hex3Ref  = useRef()

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (outerRef.current) outerRef.current.rotation.y = t * 0.15
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.25
      innerRef.current.rotation.x = t * 0.1
    }
    if (glowRef.current) {
      const sc = 1 + Math.sin(t * 2) * 0.06
      glowRef.current.scale.set(sc, sc, sc)
      glowRef.current.material.opacity = 0.04 + Math.sin(t * 2) * 0.02
    }
    if (hex1Ref.current) { hex1Ref.current.rotation.z = t * 0.4; hex1Ref.current.rotation.x = t * 0.2 }
    if (hex2Ref.current) { hex2Ref.current.rotation.z = -t * 0.3; hex2Ref.current.rotation.y = t * 0.35 }
    if (hex3Ref.current) { hex3Ref.current.rotation.y = t * 0.25; hex3Ref.current.rotation.z = -t * 0.15 }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Energy glow */}
      <Sphere ref={glowRef} args={[2.8, 32, 32]}>
        <meshBasicMaterial color="#0044FF" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>

      {/* Distorted core */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere ref={innerRef} args={[1.0, 64, 64]}>
          <MeshDistortMaterial
            color="#001133"
            emissive="#004488"
            emissiveIntensity={0.8}
            distort={0.25}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      {/* Outer wireframe sphere */}
      <Sphere ref={outerRef} args={[1.3, 20, 20]}>
        <meshBasicMaterial color="#00F5FF" wireframe transparent opacity={0.07} />
      </Sphere>

      {/* Hexagonal rings */}
      {[1.6, 2.0, 2.4].map((r, i) => (
        <mesh key={i} ref={[hex1Ref, hex2Ref, hex3Ref][i]}>
          <ringGeometry args={[r - 0.015, r, 6]} />
          <meshBasicMaterial
            color={['#00F5FF', '#0077FF', '#00BBFF'][i]}
            transparent
            opacity={[0.6, 0.45, 0.3][i]}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Equatorial glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.55, 1.65, 128]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner energy rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[0.8, 0.82, 64]} />
        <meshBasicMaterial color="#00AAFF" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// ── Orbiting threat nodes ─────────────────────────────────────
function ThreatNodes() {
  const groupRef = useRef()

  const nodes = useMemo(() => [
    { r: 3.2, angle: 0,              speed: 0.18, tilt: 0.3,  size: 0.08, color: '#FF4444', label: 'APT29' },
    { r: 3.8, angle: Math.PI / 3,    speed: 0.12, tilt: 0.6,  size: 0.06, color: '#FF8800', label: 'C2'    },
    { r: 3.5, angle: Math.PI * 2/3,  speed: 0.22, tilt: -0.4, size: 0.07, color: '#FFD700', label: 'IOC'   },
    { r: 4.0, angle: Math.PI,        speed: 0.14, tilt: 0.8,  size: 0.05, color: '#FF4444', label: 'APT41' },
    { r: 3.3, angle: Math.PI * 4/3,  speed: 0.20, tilt: -0.6, size: 0.09, color: '#00FF88', label: 'CTI'   },
    { r: 3.7, angle: Math.PI * 5/3,  speed: 0.16, tilt: 0.5,  size: 0.06, color: '#00AAFF', label: 'SIEM'  },
  ], [])

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const n = nodes[i]
      const a = n.angle + t * n.speed
      child.position.x = Math.cos(a) * n.r
      child.position.z = Math.sin(a) * n.r
      child.position.y = Math.sin(a * 0.7 + n.tilt) * 0.8
      child.rotation.y += 0.02
    })
  })

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i}>
          <octahedronGeometry args={[n.size, 0]} />
          <meshBasicMaterial color={n.color} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

// ── Particle field ────────────────────────────────────────────
function ParticleField() {
  const ref   = useRef()
  const count = 2500

  const { positions, colors } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 30
      pos[i*3+1] = (Math.random() - 0.5) * 20
      pos[i*3+2] = (Math.random() - 0.5) * 20
      const c = Math.random()
      if (c > 0.7) { cols[i*3]=0; cols[i*3+1]=0.96; cols[i*3+2]=1 }
      else if (c > 0.4) { cols[i*3]=0; cols[i*3+1]=0.4; cols[i*3+2]=1 }
      else { cols[i*3]=0.1; cols[i*3+1]=0.1; cols[i*3+2]=0.4 }
    }
    return { positions: pos, colors: cols }
  }, [])

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.015
      ref.current.rotation.x = s.clock.elapsedTime * 0.008
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// ── Scanning plane ────────────────────────────────────────────
function ScanPlane() {
  const ref = useRef()
  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = ((s.clock.elapsedTime * 0.5) % 2) * 6 - 3
      ref.current.material.opacity = 0.06 + Math.sin(s.clock.elapsedTime * 3) * 0.02
    }
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial color="#00F5FF" transparent opacity={0.05} side={THREE.DoubleSide} />
    </mesh>
  )
}

// ── Connection lines between nodes ────────────────────────────
function ConnectionWeb() {
  const ref = useRef()
  const linePositions = useMemo(() => {
    const pts = []
    const nodeCount = 16
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 8 - 2,
    }))
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = Math.hypot(nodes[i].x-nodes[j].x, nodes[i].y-nodes[j].y, nodes[i].z-nodes[j].z)
        if (dist < 5) {
          pts.push(nodes[i].x, nodes[i].y, nodes[i].z)
          pts.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }
    return new Float32Array(pts)
  }, [])

  useFrame((s) => {
    if (ref.current) ref.current.material.opacity = 0.06 + Math.sin(s.clock.elapsedTime * 0.5) * 0.03
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#0066FF" transparent opacity={0.08} />
    </lineSegments>
  )
}

// ── Main scene ────────────────────────────────────────────────
function Scene({ mouseRef }) {
  return (
    <>
      <MouseTracker mouseRef={mouseRef} />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 5]}   color="#00F5FF" intensity={3}   distance={15} />
      <pointLight position={[5, 3, -2]}  color="#0055FF" intensity={2}   distance={12} />
      <pointLight position={[-5,-3,  2]} color="#0099FF" intensity={1.5} distance={10} />
      <pointLight position={[0, 0,  0]}  color="#00AAFF" intensity={5}   distance={5} />

      <ParticleField />
      <CyberTunnel />
      <DataHelix />
      <ShieldCore />
      <ThreatNodes />
      <ScanPlane />
      <ConnectionWeb />
    </>
  )
}

export default function HeroScene({ mouseRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <Scene mouseRef={mouseRef} />
    </Canvas>
  )
}