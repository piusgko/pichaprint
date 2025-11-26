import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  // when set, use a user-uploaded STL model instead of the default shirt glb
  stlModelUrl: null,
  useStlModel: false,
});

export default state;