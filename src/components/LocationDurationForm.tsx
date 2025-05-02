'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Add at the top


type Props = {
  onSubmit: (location: {
    locationsid: number;
    durations_id: number;
    tags: string;
    startsfrom: number;
    imageFile: File;
    isactive: number;
  }) => void;
  initialData?: {
    locationsid: number;
    durations_id: number;
    tags: string;
    startsfrom: number;
    isactive: number;
  };
  locations: { id: number; name: string }[];
  durations: { id: number; name: string }[];
};

const LocationDurationForm: React.FC<Props> = ({ onSubmit, initialData, locations, durations }) => {
  const router = useRouter();

  const [locationsid, setLocationsid] = useState<number>(initialData?.locationsid || 0);
  const [durations_id, setDurations_id] = useState<number>(initialData?.durations_id || 0);
  const [tags, setTags] = useState<string>(initialData?.tags || '');
  const [startsfrom, setStartsfrom] = useState<number>(initialData?.startsfrom || 0);
  const [isactive, setIsactive] = useState<number>(initialData?.isactive ?? 1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tags.trim() || startsfrom <= 0 || locationsid === 0 || durations_id === 0 || !imageFile) {
      alert('Please fill all required fields and select an image.');
      return;
    }

    onSubmit({
      locationsid,
      durations_id,
      tags,
      startsfrom,
      imageFile,
      isactive,
    });

    router.push('/locationdurations'); // Optional: move to caller if needed
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto mt-20"
    >
      <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit Location Duration' : 'Add New Location Duration'}</h2>

      <select
        value={locationsid}
        onChange={(e) => setLocationsid(Number(e.target.value))}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        required
      >
        <option value={0}>Select Location</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>

      <select
        value={durations_id}
        onChange={(e) => setDurations_id(Number(e.target.value))}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        required
      >
        <option value={0}>Select Duration</option>
        {durations.map((duration) => (
          <option key={duration.id} value={duration.id}>
            {duration.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        required
      />

      <input
        type="text"
        placeholder="Price Starts From"
        value={startsfrom}
        onChange={(e) => setStartsfrom(Number(e.target.value))}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        required
        min={0}
      />

      <div className="mb-4">
        <label className="block text-sm mb-2">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        {imagePreview && (
          <div className="mx-auto border rounded-md shadow-sm w-[200px] h-[150px] relative">
          <Image
            src={imagePreview}
            alt="Preview"
            width={200}
            height={150}
            className="rounded"
          />
        </div>
        )}
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isactive === 1}
          onChange={() => setIsactive(isactive === 1 ? 0 : 1)}
          className="mr-2"
        />
        <label className="text-sm">Is Active</label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          {initialData ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default LocationDurationForm;
