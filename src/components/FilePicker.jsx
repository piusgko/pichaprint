import React, { useMemo, useEffect, useState } from 'react';

import CustomButton from './CustomButton';
import { FileUpload } from './ui/file-upload';
import { HoverBorderGradient } from './ui/hover-border-gradient';

const FilePicker = ({ file, setFile, readFile, uploadImageTo3d, isUploading, generatedStlUrl }) => {
  const hasFile = !!file;
  const hasGeneratedStl = !!generatedStlUrl;
  const isImageFile = hasFile && file.type?.startsWith('image/');
  const [imagePreview, setImagePreview] = useState(null);

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

  // Generate image preview when file changes
  useEffect(() => {
    if (file && isImageFile) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setImagePreview(null);
    }
  }, [file, isImageFile]);

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
            {imagePreview && (
              <div className="w-full sm:w-2/3">
                <img
                  src={imagePreview}
                  alt="Uploaded preview"
                  className="max-w-full h-auto rounded-lg border border-neutral-200 shadow-sm max-h-48 object-contain"
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2 sm:justify-end sm:w-1/3">
              {hasGeneratedStl && (
                <CustomButton
                  type="outline"
                  title="Download STL"
                  handleClick={handleDownloadStl}
                  customStyles="text-xs px-3 py-1"
                  disabled={!generatedStlUrl}
                />
              )}
              <HoverBorderGradient
                as="button"
                containerClassName="rounded-full"
                className="text-xs px-4 py-1 flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
                onClick={uploadImageTo3d}
                disabled={!isImageFile || isUploading}
              >
                {isUploading
                  ? 'Generating…'
                  : hasGeneratedStl
                    ? 'Regenerate STL'
                    : 'Convert'}
              </HoverBorderGradient>
            </div>
          </div>
        }
      />
    </div>
  )
}

export default FilePicker
