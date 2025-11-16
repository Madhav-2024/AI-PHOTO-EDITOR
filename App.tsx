
import React, { useState, useCallback } from 'react';
import { ImageFile } from './types';
import { fileToBase64 } from './utils/fileUtils';
import { editPhoto, describePhoto } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import ImageDisplay from './components/ImageDisplay';
import EditControls from './components/EditControls';
import DescriptionDisplay from './components/DescriptionDisplay';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('Make the photo look like a vibrant watercolor painting');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDescribing, setIsDescribing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      try {
        setError(null);
        setEditedImage(null);
        setDescription(null);
        const base64 = await fileToBase64(file);
        setOriginalImage({
          file: file,
          base64: base64,
          mimeType: file.type,
        });
      } catch (err) {
        setError('Failed to load image. Please try another file.');
        setOriginalImage(null);
      }
    } else if (file) {
      setError('Please select a valid image file.');
    }
  };

  const handleEdit = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and provide an edit prompt.');
      return;
    }
    setIsEditing(true);
    setError(null);
    setEditedImage(null);

    try {
      const result = await editPhoto(originalImage.base64, originalImage.mimeType, prompt);
      setEditedImage(result);
    } catch (err) {
      console.error(err);
      setError('Failed to edit the photo. Please try again.');
    } finally {
      setIsEditing(false);
    }
  }, [originalImage, prompt]);

  const handleDescribe = useCallback(async () => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }
    setIsDescribing(true);
    setError(null);
    setDescription(null);

    try {
      const result = await describePhoto(originalImage.base64, originalImage.mimeType);
      setDescription(result);
    } catch (err) {
      console.error(err);
      setError('Failed to generate a description. Please try again.');
    } finally {
      setIsDescribing(false);
    }
  }, [originalImage]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            AI Photo Editor & Architect
          </h1>
          <p className="mt-2 text-lg text-gray-400">Transform your images and uncover their architectural secrets with Gemini.</p>
        </header>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageDisplay title="Original Photo" imageSrc={originalImage?.base64 ?? null}>
                {!originalImage && <ImageUploader onFileChange={handleFileChange} />}
            </ImageDisplay>
            <ImageDisplay title="Edited Photo" imageSrc={editedImage} isLoading={isEditing} />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <EditControls
              prompt={prompt}
              setPrompt={setPrompt}
              onEdit={handleEdit}
              onDescribe={handleDescribe}
              isEditing={isEditing}
              isDescribing={isDescribing}
              imageUploaded={!!originalImage}
            />
            <DescriptionDisplay
              description={description}
              isLoading={isDescribing}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
