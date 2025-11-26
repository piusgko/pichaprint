import React from 'react';

// Simplified CameraRig: let OrbitControls fully manage the camera.
// This avoids glitches caused by two systems fighting over camera position.
const CameraRig = ({ children }) => {
  return <group>{children}</group>;
}

export default CameraRig
