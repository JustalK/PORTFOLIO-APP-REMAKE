import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import noiseMaterial from '../materials/Noise';

export default function Background() {
    const { viewport } = useThree()
    const ref = useRef()
  
    useFrame((state, delta) => {
      ref.current.uTime += delta
    })

    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
            <noiseMaterial ref={ref} />
        </mesh>
    );
}
