import React, { useState } from 'react';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: number;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({ isOpen, onClose, packageId }) => {
  const [formData, setFormData] = useState({
    packageactivities_day: 1,
    packageactivities_title: '',
    packageactivities_description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      packageactivities_packageid: packageId,
    };

    console.log('Submitted Activity:', finalData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Activity</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="packageactivities_day" className="block text-sm font-medium mb-1">
              Day
            </label>
            <input
              type="number"
              id="packageactivities_day"
              name="packageactivities_day"
              value={formData.packageactivities_day}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="packageactivities_title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="packageactivities_title"
              name="packageactivities_title"
              value={formData.packageactivities_title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="packageactivities_description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="packageactivities_description"
              name="packageactivities_description"
              value={formData.packageactivities_description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
            />
          </div>

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
              className="bg-black text-white px-4 py-2 rounded "
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;
