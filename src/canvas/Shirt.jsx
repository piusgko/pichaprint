import React, { useMemo } from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame, useLoader } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import { Box3, Vector3 } from 'three';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);

  // Default shirt model
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  // Optional user-uploaded STL model
  const rawStlGeometry = snap.stlModelUrl
    ? useLoader(STLLoader, snap.stlModelUrl)
    : null;

  // Fit STL into a nice, consistent size and center it at the origin
  const { fittedGeometry, stlScale } = useMemo(() => {
    if (!rawStlGeometry) return { fittedGeometry: null, stlScale: 1 };

    const geometry = rawStlGeometry.clone();
    geometry.computeBoundingBox();

    const box = geometry.boundingBox || new Box3();
    const size = new Vector3();
    box.getSize(size);

    const maxSide = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 1; // world units for the longest side (smaller so STL fits better in view)
    const scale = targetSize / maxSide;

    // Position the geometry so the base sits at y = 0 and it's centered in X/Z
    const center = new Vector3();
    box.getCenter(center);

    const offset = new Vector3(
      center.x,        // center on X
      box.min.y,       // move so bottom rests at y = 0 after translation
      center.z         // center on Z
    );

    geometry.translate(-offset.x, -offset.y, -offset.z);

    return { fittedGeometry: geometry, stlScale: scale };
  }, [rawStlGeometry]);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    // animate the base shirt color
    if (materials.lambert1) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
  });

  const stateString = JSON.stringify(snap);

  if (snap.useStlModel && fittedGeometry) {
    // Render the uploaded STL model instead of the default shirt
    return (
      <group key={stateString}>
        <mesh
          geometry={fittedGeometry}
          castShadow
          receiveShadow
          // rotate STL so Z-up models stand upright in our Y-up scene
          rotation={[-Math.PI / 2, 0, 0]}
          scale={stlScale}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial color={snap.color} metalness={0.2} roughness={0.8} />
        </mesh>
      </group>
    );
  }

  // Fallback: default shirt model with decals
  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt
