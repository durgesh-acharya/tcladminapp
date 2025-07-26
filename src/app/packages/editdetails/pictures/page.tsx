/* eslint-disable @next/next/no-img-element */
'use client';

import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  Suspense,
} from 'react';
import { useSearchParams } from 'next/navigation';

interface PackageImage {
  packageimages_id: number;
  packageimages_url: string;
  packageimages_category: string | number;
}

const categories = [
  { label: 'General', value: '1' },
  { label: 'Stay', value: '2' },
  { label: 'Sightseeing', value: '3' },
  { label: 'Activities', value: '4' },
];

const getCategoryLabel = (category: string | number): string | null => {
  const cat = String(category);
  switch (cat) {
    case '1':
      return null;
    case '2':
      return 'Stay';
    case '3':
      return 'Sightseeing';
    case '4':
      return 'Activities';
    default:
      return null;
  }
};

const PicturesComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const packageId = searchParams.get('packageid');
  const [images, setImages] = useState<PackageImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (!packageId) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://103.168.18.92/api/packageimages/by-package/${packageId}`
        );
        const data = await res.json();
        setImages(data.data || []);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [packageId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!packageId || !selectedFile || !selectedCategory) {
      alert('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('packageimages_packageid', packageId);
    formData.append('packageimages_category', selectedCategory);

    try {
      const res = await fetch('http://103.168.18.92/api/packageimages/create', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        setSelectedFile(null);
        setSelectedCategory('');

        // Refresh images
        const refreshed = await fetch(
          `http://103.168.18.92/api/packageimages/by-package/${packageId}`
        );
        const updated = await refreshed.json();
        setImages(updated.data || []);
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pictures for Package ID: {packageId}</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Add Image
        </button>
      </div>

      {loading ? (
        <p>Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-500">No images found for this package.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => {
            const label = getCategoryLabel(img.packageimages_category);
            return (
              <div key={img.packageimages_id} className="rounded shadow p-2">
                <img
                  src={`http://103.168.18.92${img.packageimages_url}`}
                  alt={label || 'Package Image'}
                  className="w-full h-48 object-cover rounded transition-transform duration-300 hover:scale-105"
                />
                {label && (
                  <p className="text-center mt-2 text-gray-700 font-medium">
                    {label}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4">Upload New Image</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image File</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSelectedFile(e.target.files?.[0] || null)
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Upload Image
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Exported with Suspense wrapper
export default function PicturesPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading pictures...</div>}>
      <PicturesComponent />
    </Suspense>
  );
}