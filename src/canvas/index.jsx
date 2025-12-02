import { Canvas } from '@react-three/fiber'
import { Center, OrbitControls } from '@react-three/drei';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      // Camera positioned for front-facing view of STL models at eye level
      camera={{ position: [0, 1.5, 3], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      {/* Basic lights only; external HDR environment removed to avoid CORS/network issues */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 5]} intensity={0.8} />

      {/* Allow rotating around the model with mouse / touch */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        rotateSpeed={1}
        enableDamping={true}
        dampingFactor={0.05}
        // Better initial viewing angle for STL models
        target={[0, 0, 0]}
        minDistance={0.5}
        maxDistance={10}
      />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel
