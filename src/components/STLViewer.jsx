import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three-stdlib';
import { Box3, Vector3 } from 'three';

const STLModel = ({ url, color = '#EFBD48', autoRotate = false, isUserInteracting = false }) => {
  const groupRef = useRef();
  const rotationRef = useRef(0);
  const geometry = useLoader(STLLoader, url);

  const { fittedGeometry, stlScale } = useMemo(() => {
    if (!geometry) return { fittedGeometry: null, stlScale: 1 };

    const geom = geometry.clone();
    geom.computeBoundingBox();

    const box = geom.boundingBox || new Box3();
    const size = new Vector3();
    box.getSize(size);

    const maxSide = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 1;
    const scale = targetSize / maxSide;

    const center = new Vector3();
    box.getCenter(center);

    const offset = new Vector3(
      center.x,
      box.min.y,
      center.z
    );

    geom.translate(-offset.x, -offset.y, -offset.z);

    return { fittedGeometry: geom, stlScale: scale };
  }, [geometry]);

  useFrame((state, delta) => {
    if (autoRotate && groupRef.current && !isUserInteracting) {
      // Continuous rotation to the left (negative Y rotation) around center
      // Only rotate when user is not interacting
      rotationRef.current -= delta * 0.5; // Rotate left continuously
      // Keep rotation within 0 to -2π range to prevent overflow
      if (rotationRef.current < -Math.PI * 2) {
        rotationRef.current += Math.PI * 2;
      }
      groupRef.current.rotation.y = rotationRef.current;
      // Ensure position stays fixed at origin
      groupRef.current.position.set(0, 0, 0);
    }
  });

  if (!fittedGeometry) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh
        geometry={fittedGeometry}
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        scale={stlScale}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} />
      </mesh>
    </group>
  );
};

const STLViewer = ({ url, color = '#EFBD48', className = '', autoRotate = false, zoom = 1 }) => {
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimeoutRef = useRef(null);

  const handleInteractionStart = () => {
    setIsUserInteracting(true);
    // Clear any existing timeout
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    // Wait a bit before resuming auto-rotation (2 seconds of no interaction)
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2000);
  };

  // Camera position: default is 2, zoom out by multiplying (3x zoom out = 6)
  const cameraDistance = 2 * zoom;

  return (
    <Canvas
      camera={{ position: [0, 0, cameraDistance], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className={className}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 5]} intensity={0.8} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        rotateSpeed={1}
        enableDamping={true}
        dampingFactor={0.05}
        onStart={handleInteractionStart}
        onChange={handleInteractionStart}
        onEnd={handleInteractionEnd}
      />
      <Center>
        <STLModel url={url} color={color} autoRotate={autoRotate} isUserInteracting={isUserInteracting} />
      </Center>
    </Canvas>
  );
};

export default STLViewer;

