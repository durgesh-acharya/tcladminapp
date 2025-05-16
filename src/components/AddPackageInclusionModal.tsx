import React, { useState } from 'react';

interface AddPackageInclusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: number;
}

const AddPackageInclusionModal: React.FC<AddPackageInclusionModalProps> = ({
  isOpen,
  onClose,
  packageId,
}) => {
  const [inclusion, setInclusion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://103.168.18.92/api/tourinclusion/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageinclusion_inclusion: inclusion,
          packageinclusion_packagesid: packageId,
        }),
      });

      const result = await res.json();

      if (result.status) {
        setInclusion('');
        onClose();
      } else {
        console.error('Failed to add inclusion:', result.message);
      }
    } catch (error) {
      console.error('Error adding inclusion:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Package Inclusion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="packageinclusion_inclusion"
            value={inclusion}
            onChange={(e) => setInclusion(e.target.value)}
            placeholder="Inclusion"
            className="w-full border p-2"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackageInclusionModal;
