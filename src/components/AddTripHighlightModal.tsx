import React, { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (highlightName: string) => void; // Only pass the name, not full object
  packageId: number; // Just for display, not editing
};

const AddTripHighlightModal: React.FC<Props> = ({ isOpen, onClose, onSave, packageId }) => {
  const [highlightName, setHighlightName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (highlightName.trim() === '') return;

    onSave(highlightName); // Send only the name to the parent
    setHighlightName('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Trip Highlight</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Trip Highlight Name</label>
            <input
              type="text"
              value={highlightName}
              onChange={(e) => setHighlightName(e.target.value)}
              placeholder="e.g. Jungle Safari"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <p className="text-sm text-gray-500">For Package ID: {packageId}</p>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
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
  );
};

export default AddTripHighlightModal;
