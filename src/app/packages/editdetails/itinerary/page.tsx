'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState,Suspense } from 'react';

type Itinerary = {
  itineraries_id: number;
  itineraries_day: number;
  itineraries_tiitle: string;
  itineraries_description: string;
  itineraries_paackagesid: number;
};

const ItineraryComponent = () => {
  const searchParams = useSearchParams();
  const packageId = searchParams.get('packageid');

  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [day, setDay] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch itineraries
  useEffect(() => {
    if (!packageId) return;

    fetch(`http://103.168.18.92/api/itineraries/package/${packageId}`)
      .then((res) => res.json())
      .then((data) => setItineraries(data.status ? data.data : []))
      .catch((err) => {
        console.error('Error fetching itineraries:', err);
        setItineraries([]);
      });
  }, [packageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!packageId) {
      alert('Package ID is required');
      return;
    }

    const newItinerary = {
      itineraries_day: Number(day),
      itineraries_tiitle: title,
      itineraries_description: description,
      itineraries_paackagesid: Number(packageId),
    };

    try {
      const res = await fetch('http://103.168.18.92/api/itineraries/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItinerary),
      });

      const result = await res.json();
      if (result.status) {
        const refreshed = await fetch(`http://103.168.18.92/api/itineraries/package/${packageId}`);
        const data = await refreshed.json();
        setItineraries(data.data);
        setShowModal(false);
        setDay('');
        setTitle('');
        setDescription('');
      } else {
        alert('Failed to add itinerary');
      }
    } catch (error) {
      console.error('Error adding itinerary:', error);
      alert('Error adding itinerary. Please try again.');
    }
  };

  const handleAdd = () => setShowModal(true);

  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this itinerary?');
    if (confirmed) {
      setItineraries((prev) => prev.filter((item) => item.itineraries_id !== id));
    }
  };

  const handleEdit = (id: number) => {
    alert(`Edit clicked for ID ${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Itineraries</h1>
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Add Itinerary
        </button>
      </div>

      <p className="mb-4 text-gray-700">Package ID: {packageId}</p>

      {itineraries.length === 0 ? (
        <p className="text-gray-600">No itineraries found for this package.</p>
      ) : (
        <table className="min-w-full border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 bg-black text-white">Day</th>
              <th className="border px-4 py-2 bg-black text-white">Title</th>
              <th className="border px-4 py-2 bg-black text-white">Description</th>
              <th className="border px-4 py-2 bg-black text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {itineraries.map((itinerary) => (
              <tr key={itinerary.itineraries_id}>
                <td className="border px-4 py-2">{itinerary.itineraries_day}</td>
                <td className="border px-4 py-2">{itinerary.itineraries_tiitle}</td>
                <td className="border px-4 py-2">{itinerary.itineraries_description}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(itinerary.itineraries_id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(itinerary.itineraries_id)}
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
            <h2 className="text-xl font-bold mb-4">Add Itinerary</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Day</label>
                <input
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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

export default function ItineraryPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading itineraries...</div>}>
      <ItineraryComponent />
    </Suspense>
  );
}
