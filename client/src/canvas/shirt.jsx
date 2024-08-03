import React, { useRef } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

const shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/3DMUG12.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const meshRef = useRef();

  useFrame((state, delta) => {
    if (materials.Image) {
      easing.dampC(materials.Image.color, snap.color, 0.25, delta);
    }
  });

  const stateString = JSON.stringify(snap);
  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.Image}
        material-roughness={1}
        dispose={null}
        scale={[5, 5, 5]}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0.16]}
            rotation={[0, 0, 0]}
            scale={0.3}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[-0.0002, -0.0013, 0.16]}
            rotation={[0, 0, 0]}
            scale={0.3}
            map={logoTexture}
            //map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default shirt;
