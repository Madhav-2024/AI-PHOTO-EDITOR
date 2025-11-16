
import React, { ReactNode } from 'react';
import Loader from './Loader';

interface ImageDisplayProps {
  title: string;
  imageSrc: string | null;
  isLoading?: boolean;
  children?: ReactNode;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageSrc, isLoading = false, children }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center text-gray-300">{title}</h2>
      <div className="aspect-square w-full bg-gray-800/50 rounded-lg shadow-lg flex items-center justify-center overflow-hidden border border-gray-700">
        {isLoading ? (
          <Loader />
        ) : imageSrc ? (
          <img
            src={`data:image/png;base64,${imageSrc}`}
            alt={title}
            className="w-full h-full object-contain"
          />
        ) : (
          children || <div className="text-gray-500">No image</div>
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
