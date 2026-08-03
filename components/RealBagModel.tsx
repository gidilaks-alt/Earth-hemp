'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/assets/3d/desert-edition-bag.glb');

/**
 * Scanned Desert Edition bag GLB (Higgsfield-generated from the real
 * product photo). Source GLB has arbitrary scale/origin, so it's
 * re-centered and normalized to roughly a 2-unit bounding box to match
 * the hero camera framing.
 */
export default function RealBagModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/assets/3d/desert-edition-bag.glb');

  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2 / maxDim;
    clone.scale.setScalar(scale);
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    return clone;
  }, [scene]);

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
      <primitive object={normalized} />
    </group>
  );
}
