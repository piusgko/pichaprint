import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');
  const [description, setDescription] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [uploadingMesh, setUploadingMesh] = useState(false);
  const [generatedStlUrl, setGeneratedStlUrl] = useState(null);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch(config.dalleUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    if (!file) return;

    const name = file.name.toLowerCase();

    // If the user uploads an STL file, use it as a custom 3D model
    if (name.endsWith('.stl')) {
      const objectUrl = URL.createObjectURL(file);
      state.stlModelUrl = objectUrl;
      state.useStlModel = true;
      setActiveEditorTab("");
      return;
    }

    // Otherwise treat it as an image decal as before
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  const handleImageTo3dUpload = async () => {
    if (!file) {
      alert('Please select an image first.');
      return;
    }

    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      alert('Image → STL requires a PNG or JPEG file.');
      return;
    }

    setUploadingMesh(true);

    try {
      // Backend conversion flow
      const formData = new FormData();
      // Backend expects 'image' file and 'description' form field
      formData.append('image_upload', file);
      formData.append('description', description || 'Convert this image to a 3D model');

      console.log('Uploading to:', config.scribbleUploadEndpoint);
      console.log('File:', file.name, file.type, file.size);

      const response = await fetch(config.scribbleUploadEndpoint, {
        method: 'POST',
        headers: {
          // Required for ngrok to bypass browser warning
          'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        throw new Error(errorText || 'Failed to generate STL.');
      }

      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);
      state.stlModelUrl = objectUrl;
      state.useStlModel = true;

      // Track generated STL locally so the FilePicker can expose a
      // Download STL button. Revoke any previous URL to avoid leaks.
      if (generatedStlUrl) {
        URL.revokeObjectURL(generatedStlUrl);
      }
      setGeneratedStlUrl(objectUrl);

      setActiveEditorTab('');
    } catch (error) {
      console.error(error);
      alert('Image → STL failed. Please check the backend tunnel and try again.');
    } finally {
      setUploadingMesh(false);
    }
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="z-10 w-full h-full"
            {...slideAnimation('left')}
          >
            <div className="w-full h-full">
              <FilePicker
                file={file}
                setFile={(newFile) => {
                  setFile(newFile);
                  if (generatedStlUrl) {
                    URL.revokeObjectURL(generatedStlUrl);
                    setGeneratedStlUrl(null);
                  }
                }}
                readFile={readFile}
                uploadImageTo3d={handleImageTo3dUpload}
                isUploading={uploadingMesh}
                generatedStlUrl={generatedStlUrl}
                description={description}
                setDescription={setDescription}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer