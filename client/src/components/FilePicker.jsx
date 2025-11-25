import React, { useMemo, useEffect } from 'react';

import CustomButton from './CustomButton';
import { FileUpload } from './ui/file-upload';

const FilePicker = ({ file, setFile, readFile, uploadImageTo3d, isUploading, generatedStlUrl }) => {
  const hasFile = !!file;
  const hasGeneratedStl = !!generatedStlUrl;
  const isImageFile = hasFile && file.type?.startsWith('image/');

  const fileDetails = useMemo(() => {
    if (!file) return null;
    const sizeMb = (file.size || 0) / (1024 * 1024);
    return {
      name: file.name,
      type: file.type || 'application/octet-stream',
      sizeLabel: `${sizeMb.toFixed(2)} MB`,
      modifiedLabel: new Date(file.lastModified || Date.now()).toLocaleDateString(),
    };
  }, [file]);

  const handleDownloadStl = () => {
    if (!generatedStlUrl) return;

    const link = document.createElement('a');
    link.href = generatedStlUrl;
    const baseName = file?.name?.replace(/\.[^.]+$/, '') || 'model';
    link.download = `${baseName}.stl`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    return () => {
      if (generatedStlUrl) {
        URL.revokeObjectURL(generatedStlUrl);
      }
    };
  }, [generatedStlUrl]);

  const handleUploadChange = (files) => {
    const latestFile = files[files.length - 1];
    if (latestFile) {
      setFile(latestFile);
    }
  };

  return (
    <div className="filepicker-container w-full space-y-4">
      <FileUpload
        onChange={handleUploadChange}
        accept="image/*,.stl"
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-neutral-500 space-y-1">
              {hasFile && fileDetails ? (
                <>
                 
                </>
              ) : (
                <>
                 
                  
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {hasGeneratedStl && (
                <CustomButton
                  type="outline"
                  title="Download STL"
                  handleClick={handleDownloadStl}
                  customStyles="text-xs px-3 py-1"
                  disabled={!generatedStlUrl}
                />
              )}
              <CustomButton
                type="filled"
                title={isUploading ? 'Generating…' : hasGeneratedStl ? 'Regenerate STL' : 'Convert'}
                handleClick={uploadImageTo3d}
                customStyles="text-xs px-3 py-1"
                disabled={!isImageFile || isUploading}
              />
            </div>
          </div>
        }
      />
    </div>
  )
}

export default FilePicker
