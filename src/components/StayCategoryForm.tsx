import React, { useState, useEffect } from 'react';

interface StayCategoryFormProps {
  onSubmit: (data: { categoryName: string; isActive: 1 | 0 }) => void;
  initialData: {
    categoryName: string;
    isActive: 1 | 0;

  } | null;
}

const StayCategoryForm: React.FC<StayCategoryFormProps> = ({ onSubmit, initialData }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isActive, setIsActive] = useState<1 | 0>(1);
 

  // Set initial data when it is loaded
  useEffect(() => {
    if (initialData) {
      setCategoryName(initialData.categoryName);
      setIsActive(initialData.isActive);
      // Reset the image state on initial load (if you want to keep the previous image URL)
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ categoryName, isActive });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <div>
          <label htmlFor="categoryName" className="block text-sm font-semibold">
            Stay Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <span className="block text-sm font-semibold mb-1">Is Active?</span>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isActive"
                value={1}
                checked={isActive === 1}
                onChange={() => setIsActive(1)}
              />
              <span>Active</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isActive"
                value={0}
                checked={isActive === 0}
                onChange={() => setIsActive(0)}
              />
              <span>Inactive</span>
            </label>
          </div>
        </div>

       

        <div className="flex justify-end gap-2">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default StayCategoryForm;
