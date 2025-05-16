'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

type Include = {
  include_id: number;
  include_includtagname: string;
  include_packageid: number;
};

const IncludePage = () => {
  const searchParams = useSearchParams();
  const packageId = searchParams.get('packageid');

  const [includes, setIncludes] = useState<Include[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [tagName, setTagName] = useState('');

  // Fetch includes from API
  useEffect(() => {
    if (packageId) {
      fetch(`http://103.168.18.92/api/include/package/${packageId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            setIncludes(data.data);
          } else {
            setIncludes([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching includes:', error);
          setIncludes([]);
        });
    }
  }, [packageId]);

  // Handle submit (create include)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageId) {
      alert('Package ID is required');
      return;
    }

    const newInclude = {
      include_includtagname: tagName,
      include_packageid: Number(packageId),
    };

    try {
      const res = await fetch('http://103.168.18.92/api/include/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInclude),
      });

      const result = await res.json();
      if (result.status) {
        const refreshed = await fetch(`http://103.168.18.92/api/include/package/${packageId}`);
        const data = await refreshed.json();
        setIncludes(data.data);
        setShowModal(false);
        setTagName('');
      } else {
        alert('Failed to add include');
      }
    } catch (error) {
      console.error('Error adding include:', error);
      alert('Error adding include. Please try again.');
    }
  };

  const handleAdd = () => setShowModal(true);

  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this include tag?');
    if (confirmed) {
      setIncludes((prev) => prev.filter((item) => item.include_id !== id));
    }
  };

  const handleEdit = (id: number) => {
    alert(`Edit clicked for ID ${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Includes</h1>
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Add Include Tag
        </button>
      </div>

      <p className="mb-4 text-gray-700">Package ID: {packageId}</p>

      {includes.length === 0 ? (
        <p className="text-gray-600">No include tags found for this package.</p>
      ) : (
        <table className="min-w-full border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 bg-black text-white">ID</th>
              <th className="border px-4 py-2 bg-black text-white">Include Tag</th>
              <th className="border px-4 py-2 bg-black text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {includes.map((include) => (
              <tr key={include.include_id}>
                <td className="border px-4 py-2">{include.include_id}</td>
                <td className="border px-4 py-2">{include.include_includtagname}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(include.include_id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(include.include_id)}
                    className="bg-red-600 text-white px-3 py-1 m-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Add Include Tag</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tag Name</label>
                <input
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default function IncludePageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading include tags...</div>}>
      <IncludePage />
    </Suspense>
  );
}
