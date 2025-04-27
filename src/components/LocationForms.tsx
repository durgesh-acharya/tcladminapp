'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";
type Props = {
  onSubmit: (data: {
    locationName: string;
    isActive: 1 | 0;
    image: File | null;
  }) => void;
  initialData?: {
    locationName: string;
    isActive: 1 | 0;
    imageUrl?: string;
  };
};

const LocationForms = ({ onSubmit, initialData }: Props) => {
  const [locationName, setLocationName] = useState('');
  const [isActive, setIsActive] = useState<1 | 0>(1);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setLocationName(initialData.locationName);
      setIsActive(initialData.isActive);
      setPreviewUrl(initialData.imageUrl || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!locationName) {
      alert('Please enter location name.');
      return;
    }

    // For edit, image can be optional
    onSubmit({ locationName, isActive, image });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);

      // Show preview of selected file
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Location Form</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location Name</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="1"
                checked={isActive === 1}
                onChange={() => setIsActive(1)}
                className="form-radio text-black"
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="0"
                checked={isActive === 0}
                onChange={() => setIsActive(0)}
                className="form-radio text-black"
              />
              <span className="ml-2">Inactive</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location Image</label>
          {previewUrl && (
            <div className="mb-2">
              <p className="text-sm text-gray-500">Preview:</p>
              <Image
               src={previewUrl.startsWith("http") ? previewUrl : `http://103.168.18.92${previewUrl}`}
               alt="Preview"
               width={128}
               height={128}
              objectFit="cover"
              className="rounded shadow"
            />
            </div>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="mt-1 block w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationForms;
