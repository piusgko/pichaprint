import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
  accept = "image/*,.stl",
  footer,
}: {
  onChange?: (files: File[]) => void;
  accept?: string;
  footer?: React.ReactNode;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    // Replace files instead of accumulating when multiple is false
    setFiles(newFiles);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full mb-18" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-2 sm:p-3 group/file block rounded-2xl cursor-pointer w-full relative overflow-hidden bg-white/90 dark:bg-neutral-950 shadow-sm"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center text-center gap-0.5">
          <p className="font-sans font-semibold text-neutral-700 dark:text-neutral-100 text-sm sm:text-base">
            Upload file
          </p>
          <p className="font-sans text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm max-w-xs">
            Drag Your Image here, or tap to browse.
          </p>
        </div>

        <div className="relative w-full mt-3 space-y-2">


          {!files.length && (
            <motion.div
              layoutId="file-upload"
              variants={mainVariant}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className={cn(
                "relative group-hover/file:shadow-xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-12 sm:h-14 mt-1 w-full rounded-2xl",
                "shadow-[0px_10px_30px_rgba(0,0,0,0.08)]"
              )}
            >
              {isDragActive ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-neutral-600 flex flex-col items-center text-sm"
                >
                  Drop it
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                </motion.p>
              ) : (
                <IconUpload className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              )}
            </motion.div>
          )}

          {!files.length && (
            <motion.div
              variants={secondaryVariant}
              className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-12 sm:h-14 mt-1 w-full rounded-2xl"
            />
          )}
        </div>

        {footer && (
          <div
            className="relative z-20 mt-4 w-full"
            onClick={(e) => {
              // Prevent footer buttons from triggering the upload click area
              e.stopPropagation();
            }}
          >
            {footer}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;

  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-95 sm:scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;

          return (
            <div
              key={`${col}-${row}`}
              className={`w-4 sm:w-8 h-4 sm:h-8 flex shrink-0 rounded-[2px] ${index % 2 === 0
                ? "bg-gray-50 dark:bg-neutral-950"
                : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                }`}
            />
          );
        })
      )}
    </div>
  );
}

