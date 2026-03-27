"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Group, Mesh } from "three";

/** Procedural stylized HDD — lightweight for broad GPU compat */
function HDDModel({ scrollRotation }: { scrollRotation: number }) {
  const groupRef = useRef<Group>(null);
  const platterRef = useRef<Mesh>(null);
  const armRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.y += scrollRotation * 0.02;

    if (platterRef.current) {
      platterRef.current.rotation.y += delta * 2;
    }

    if (armRef.current) {
      armRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.15 - 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} rotation={[0.5, 0, 0.1]}>
        {/* Base chassis */}
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[3, 0.3, 2.2]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.4} />
        </mesh>

        {/* Top cover (partially open) */}
        <mesh position={[0, 0.15, -0.8]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[3, 0.05, 2.2]} />
          <meshStandardMaterial color="#16213e" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Platter - shiny disc */}
        <mesh ref={platterRef} position={[-0.3, 0.05, 0.1]}>
          <cylinderGeometry args={[0.85, 0.85, 0.02, 32]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Platter center spindle */}
        <mesh position={[-0.3, 0.1, 0.1]}>
          <cylinderGeometry args={[0.15, 0.15, 0.12, 16]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Platter ring (data track) */}
        <mesh position={[-0.3, 0.06, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.005, 8, 32]} />
          <meshStandardMaterial color="#888" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Read/write arm assembly */}
        <group ref={armRef} position={[0.9, 0.12, 0.6]}>
          {/* Arm pivot */}
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.15, 12]} />
            <meshStandardMaterial color="#ff1744" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Arm body */}
          <mesh position={[-0.6, 0.02, -0.2]} rotation={[0, 0.3, 0]}>
            <boxGeometry args={[1.2, 0.03, 0.08]} />
            <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Read head — glowing cyan */}
          <mesh position={[-1.1, 0.02, -0.4]}>
            <boxGeometry args={[0.12, 0.02, 0.06]} />
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* PCB connector */}
        <mesh position={[1.2, -0.15, 0]}>
          <boxGeometry args={[0.4, 0.25, 1.5]} />
          <meshStandardMaterial color="#0d4f2b" metalness={0.3} roughness={0.7} />
        </mesh>

        {/* Accent LED */}
        <mesh position={[-1.3, 0.05, -0.9]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ff1744" emissive="#ff1744" emissiveIntensity={2} />
        </mesh>

        {/* Neon edge accents */}
        <mesh position={[0, -0.3, 1.1]}>
          <boxGeometry args={[2.8, 0.01, 0.01]} />
          <meshStandardMaterial color="#ff1744" emissive="#ff1744" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0, -0.3, -1.1]}>
          <boxGeometry args={[2.8, 0.01, 0.01]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1.5} />
        </mesh>
      </group>
    </Float>
  );
}

export function HDDScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRotRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollRot = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollRot, "change", (v) => {
    scrollRotRef.current = v;
  });

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-3, 2, -2]} intensity={0.6} color="#ff1744" />
        <pointLight position={[3, 1, 3]} intensity={0.4} color="#00e5ff" />
        <HDDModel scrollRotation={scrollRotRef.current} />
      </Canvas>
    </div>
  );
}
