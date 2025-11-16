
import React from 'react';

interface EditControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onEdit: () => void;
  onDescribe: () => void;
  isEditing: boolean;
  isDescribing: boolean;
  imageUploaded: boolean;
}

const EditControls: React.FC<EditControlsProps> = ({
  prompt,
  setPrompt,
  onEdit,
  onDescribe,
  isEditing,
  isDescribing,
  imageUploaded,
}) => {
  const commonButtonClasses = "w-full flex items-center justify-center px-4 py-3 font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";
  const primaryButtonClasses = "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
  const secondaryButtonClasses = "text-indigo-300 bg-indigo-900/50 hover:bg-indigo-900/80 focus:ring-indigo-500";

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col gap-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Edit Prompt
        </label>
        <textarea
          id="prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., add a futuristic city in the background"
          className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={onEdit}
          disabled={!imageUploaded || isEditing || isDescribing}
          className={`${commonButtonClasses} ${primaryButtonClasses}`}
        >
          {isEditing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Editing...
            </>
          ) : (
            'Edit Photo'
          )}
        </button>
        <button
          onClick={onDescribe}
          disabled={!imageUploaded || isEditing || isDescribing}
          className={`${commonButtonClasses} ${secondaryButtonClasses}`}
        >
          {isDescribing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Architecture'
          )}
        </button>
      </div>
    </div>
  );
};

export default EditControls;
