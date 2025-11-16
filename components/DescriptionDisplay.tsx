
import React from 'react';
import Loader from './Loader';

interface DescriptionDisplayProps {
  description: string | null;
  isLoading: boolean;
}

const DescriptionDisplay: React.FC<DescriptionDisplayProps> = ({ description, isLoading }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 flex-grow">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">Architectural Analysis</h3>
      <div className="prose prose-invert prose-sm text-gray-400 min-h-[150px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : description ? (
          <p className="whitespace-pre-wrap">{description}</p>
        ) : (
          <p>Analysis will appear here after clicking "Analyze Architecture".</p>
        )}
      </div>
    </div>
  );
};

export default DescriptionDisplay;
