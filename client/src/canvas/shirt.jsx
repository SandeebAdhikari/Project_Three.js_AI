import React, { useRef } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";
import { useControls } from "leva";
import { useState } from "react";

import state from "../store";

export function Mug(props) {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/mug4.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const meshRef = useRef();
  const decal = useRef();
  const group = useRef();

  // useFrame((state, delta) => {
  //   if (materials.Image) {
  //     easing.dampC(materials.Image.color, snap.color, 0.25, delta);
  //   }
  // });

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5; // Rotate the model
    }
  });

  useControls({
    angle: {
      min: degToRad(90),
      max: degToRad(270),
      value: Math.PI / 4,
      step: 0.01,
      onChange: (value) => {
        const x = Math.cos(value) * 0.06;
        const z = Math.sin(value) * 0.06;
        const rot = Math.atan2(x, z);
        setRotation(() => [0, rot, 0]);
        setPos((pos) => [x, pos[1], z]);
      },
    },
  });

  const [pos, setPos] = useState([0.004, 0.001, 0.06]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([0.09, 0.08, 0.09]);

  const stateString = JSON.stringify(snap);
  return (
    <group key={stateString}>
      <mesh geometry={nodes.Cylinder_1.geometry} scale={[5, 5, 5]}>
        <meshBasicMaterial transparent opacity={0} />
        {snap.isFullTexture && (
          <Decal
            ref={decal}
            debug
            position={pos}
            rotation={rotation}
            scale={scale}
            map={fullTexture}
          >
            <meshBasicMaterial
              map={fullTexture}
              transparent
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </Decal>
        )}
        {snap.isLogoTexture && (
          <Decal
            ref={decal}
            debug
            position={pos}
            rotation={rotation}
            scale={scale}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          >
            <meshBasicMaterial
              map={logoTexture}
              transparent
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </Decal>
        )}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder_2.geometry}
        material={materials.default_1}
        scale={[5, 5, 5]}
      />
    </group>
  );
}

useGLTF.preload("/mug4.glb");
