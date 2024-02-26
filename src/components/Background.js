import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import fogMaterial from '../materials/FogMaterial';

export default function Background() {
    const { viewport } = useThree()
    const ref = useRef()
  
    useFrame((state, delta) => {
      ref.current.uTime += delta
    })

    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
            <fogMaterial ref={ref} />
        </mesh>
    );
}
