import React, { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import fogMaterial from "../materials/FogMaterial";
import * as THREE from "three";

export default function Background({ mouse, height, width, percentHold, loaded }) {
  const { viewport } = useThree();
  const ref = useRef({
    uResolution: new THREE.Vector2(width, height),
  });

  useFrame((state, delta) => {
    if (!loaded) {
      ref.current.uTime += delta;
      if (mouse.current) {
        ref.current.uMouse = mouse.current;
      }
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      <fogMaterial
        ref={ref}
        uResolution={new THREE.Vector2(width / height, width / height)}
        uPercent={percentHold / 100}
      />
    </mesh>
  );
}
