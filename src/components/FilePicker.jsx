import React, { useMemo, useEffect, useState } from 'react';

import CustomButton from './CustomButton';
import { FileUpload } from './ui/file-upload';
import { HoverBorderGradient } from './ui/hover-border-gradient';

const FilePicker = ({ file, setFile, readFile, uploadImageTo3d, isUploading, generatedStlUrl, description, setDescription }) => {
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
    <div className="filepicker-container w-full max-w-2xl mx-auto space-y-4 px-4 sm:px-0">
      <FileUpload
        onChange={handleUploadChange}
        accept="image/*,.stl"
        footer={
          <div className="flex flex-col gap-3 w-full">
            {/* Description textarea - only shown when image file is selected */}
            {isImageFile && (
              <div className="w-full">
                <label
                  htmlFor="description-input"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Description (optional)
                </label>
                <textarea
                  id="description-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you want to create (e.g., 'A coffee mug with handle')"
                  disabled={isUploading}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed resize-none transition-all"
                  rows="3"
                />
              </div>
            )}

            {/* Image preview and buttons container */}
            <div className="flex flex-col gap-3">
              {imagePreview && (
                <div className="w-full flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Uploaded preview"
                    className="rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm w-full max-w-[150px] aspect-square sm:aspect-auto sm:w-auto sm:max-w-md sm:max-h-64 object-cover sm:object-contain bg-neutral-50 dark:bg-neutral-900"
                  />
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                {hasGeneratedStl && (
                  <CustomButton
                    type="outline"
                    title="Download STL"
                    handleClick={handleDownloadStl}
                    customStyles="text-xs px-3 py-2 w-full sm:w-auto"
                    disabled={!generatedStlUrl}
                  />
                )}
                <HoverBorderGradient
                  as="button"
                  containerClassName="rounded-full w-full sm:w-auto"
                  className="text-xs px-4 py-2 flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-60 w-full"
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
          </div>
        }
      />
    </div>
  )
}

export default FilePicker
