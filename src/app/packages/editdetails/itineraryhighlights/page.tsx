'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type ItineraryHighlight = {
  itineraryhighlights_id: number;
  itineraryhighlights_noofnifhts: number;
  itineraryhighlights_where: string;
  itineraryhighlights_packagesid: number;
};

const ItineraryHighlightsPage = () => {
  const searchParams = useSearchParams();
  const packageId = searchParams.get('packageid');

  const [highlights, setHighlights] = useState<ItineraryHighlight[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [nights, setNights] = useState('');
  const [location, setLocation] = useState('');

  // ✅ Fetch highlights from API based on packageId
  useEffect(() => {
    if (packageId) {
      fetch(`http://103.168.18.92/api/itineraryhighlights/package/${packageId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            setHighlights(data.data);
          } else {
            setHighlights([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching highlights:', error);
          setHighlights([]);
        });
    }
  }, [packageId]);

  // ✅ POST request to create a new highlight
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageId) return;

    const newHighlight = {
      itineraryhighlights_noofnifhts: Number(nights),
      itineraryhighlights_where: location,
      itineraryhighlights_packagesid: Number(packageId),
    };

    try {
      const response = await fetch('http://103.168.18.92/api/itineraryhighlights/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHighlight),
      });

      const result = await response.json();
      if (result.status) {
        // Re-fetch updated list
        const refreshed = await fetch(`http://103.168.18.92/api/itineraryhighlights/package/${packageId}`);
        const data = await refreshed.json();
        setHighlights(data.data);
        setShowModal(false);
        setNights('');
        setLocation('');
      } else {
        alert('Failed to add highlight');
      }
    } catch (error) {
      console.error('Error adding highlight:', error);
    }
  };

  const handleAddHighlight = () => {
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this highlight?');
    if (confirmed) {
      setHighlights((prev) =>
        prev.filter((item) => item.itineraryhighlights_id !== id)
      );
    }
  };

  const handleEdit = (id: number) => {
    alert(`Edit clicked for ID ${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Itinerary Highlights</h1>
        <button
          onClick={handleAddHighlight}
          className="bg-black text-white px-4 py-2 rounded hover:bg-black transition cursor-pointer"
        >
          Add Highlight
        </button>
      </div>

      <p className="mb-4 text-gray-700">Package ID: {packageId}</p>

      {highlights.length === 0 ? (
        <p className="text-gray-600">No highlights found for this package.</p>
      ) : (
        <table className="min-w-full border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 bg-black text-white">No of Nights</th>
              <th className="border px-4 py-2 bg-black text-white">Stay @</th>
              <th className="border px-4 py-2 bg-black text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {highlights.map((highlight) => (
              <tr key={highlight.itineraryhighlights_id}>
                <td className="border px-4 py-2">{highlight.itineraryhighlights_noofnifhts}</td>
                <td className="border px-4 py-2">{highlight.itineraryhighlights_where}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(highlight.itineraryhighlights_id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(highlight.itineraryhighlights_id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
            <h2 className="text-xl font-bold mb-4">Add Highlight</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Number of Nights</label>
                <input
                  type="number"
                  value={nights}
                  onChange={(e) => setNights(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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

export default ItineraryHighlightsPage;
