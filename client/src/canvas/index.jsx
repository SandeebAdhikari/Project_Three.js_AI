import { Canvas } from "@react-three/fiber";
import { Environment, Center, OrbitControls } from "@react-three/drei";

import { Mug } from "./shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./cameraRig";

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          {/* <OrbitControls /> */}
          <Mug />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
