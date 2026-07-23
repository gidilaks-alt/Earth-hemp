'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Procedural stand-in "bag" model built from primitives, styled in the
 * earthy palette. Swap for a real GLB (useGLTF) once a scanned product
 * model is available — group structure/positions are kept so a real
 * model can drop in with the same proportions.
 */
export default function HempBagModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const strap = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.35;
    group.current.rotation.y += scrollProgress.current * delta * 2;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      scrollProgress.current * 0.3,
      0.05
    );
    group.current.position.y = Math.sin(Date.now() * 0.0006) * 0.08;
  });

  return (
    <group ref={group}>
      {/* body */}
      <RoundedBox args={[1.5, 1.9, 0.7]} radius={0.18} smoothness={6} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8a7350" roughness={0.85} metalness={0.02} />
      </RoundedBox>

      {/* front flap */}
      <RoundedBox args={[1.55, 1.05, 0.15]} radius={0.16} smoothness={6} position={[0, 0.35, 0.42]}>
        <meshStandardMaterial color="#9c8563" roughness={0.8} />
      </RoundedBox>

      {/* drawstring closure knots */}
      <mesh position={[-0.35, 0.85, 0.52]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#4a5236" roughness={0.6} />
      </mesh>
      <mesh position={[0.35, 0.85, 0.52]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#4a5236" roughness={0.6} />
      </mesh>

      {/* adjustable strap */}
      <Cylinder
        ref={strap}
        args={[0.045, 0.045, 3.4, 12, 1, false, 0, Math.PI]}
        position={[0, 1.55, 0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial color="#5c6b3f" roughness={0.7} />
      </Cylinder>

      {/* metal buckle accents */}
      <mesh position={[-0.75, 0.6, 0]}>
        <torusGeometry args={[0.09, 0.02, 8, 16]} />
        <meshStandardMaterial color="#c9a877" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.75, 0.6, 0]}>
        <torusGeometry args={[0.09, 0.02, 8, 16]} />
        <meshStandardMaterial color="#c9a877" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}
