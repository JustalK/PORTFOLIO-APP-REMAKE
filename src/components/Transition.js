import React, { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import transitionMaterial from "../materials/TransitionMaterial";
import * as THREE from "three";

export default function Transition({ height, width, velocity }) {
  const { viewport } = useThree();
  const ref = useRef({
    uResolution: new THREE.Vector2(width, height),
  });

  useFrame((_state, delta) => {
    ref.current.uVelo = velocity.current * 1;
    ref.current.uTime += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      <transitionMaterial
        ref={ref}
        uResolution={new THREE.Vector2(width / height, width / height)}
        uVelo={velocity.current}
      />
    </mesh>
  );
}
