'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import RealBagModel from './RealBagModel';
import HempFibers from './HempFibers';
import { useScrollProgress } from './useScrollProgress';

export default function Hero3D() {
  const scrollProgress = useRef(0);
  useScrollProgress(scrollProgress, 'hero');

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} color="#fff4e0" />
        <directionalLight position={[-3, 1, -2]} intensity={0.35} color="#a9b48a" />
        <Suspense fallback={null}>
          <RealBagModel scrollProgress={scrollProgress} />
          <HempFibers />
          <ContactShadows position={[0, -1.15, 0]} opacity={0.35} scale={6} blur={2.4} far={2} />
          <Environment preset="dawn" />
        </Suspense>
      </Canvas>
    </div>
  );
}
