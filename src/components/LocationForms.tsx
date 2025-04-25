'use client';
import { useState } from 'react';

type Props = {
  onSubmit: (data: {
    locationName: string;
    isActive: 1 | 0;
    image: File | null;
  }) => void;
};

const LocationForms = ({ onSubmit }: Props) => {
  const [locationName, setLocationName] = useState('');
  const [isActive, setIsActive] = useState<1 | 0>(1);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!locationName || !image) {
      alert('Please fill in all required fields.');
      return;
    }

    onSubmit({ locationName, isActive, image });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
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
          <label className="block text-sm font-medium text-gray-700">Upload Location Image</label>
          <input
            type="file"
            onChange={handleFileChange}
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
