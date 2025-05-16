import React, { useState } from 'react';

interface AddKnowBeforeYouGoModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: number;
  onAddSuccess: () => void;
}

const AddKnowBeforeYouGoModal: React.FC<AddKnowBeforeYouGoModalProps> = ({
  isOpen,
  onClose,
  packageId,
  onAddSuccess,
}) => {
  const [point, setPoint] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://103.168.18.92/api/knowbeforeyougo/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          knowbeforeyougo_point: point,
          knowbeforeyougo_packagesid: packageId,
        }),
      });

      const data = await res.json();

      if (data.status !== false) {
        setPoint('');
        onAddSuccess(); // Refresh list
        onClose();
      } else {
        console.error('Error adding point:', data.message);
      }
    } catch (err) {
      console.error('Failed to add point:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Know Before You Go</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="knowbeforeyougo_point"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
            placeholder="Enter point"
            className="w-full border p-2"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKnowBeforeYouGoModal;
