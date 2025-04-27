'use client';

import React, { useState, useEffect } from 'react';

type Props = {
  onSubmit: (name: string) => void;
  initialData?: {
    durations_name: string;
  };
};

const DurationForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialData?.durations_name) {
      setName(initialData.durations_name);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto mt-20"
    >
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Duration' : 'Add New Duration'}
      </h2>
      <input
        type="text"
        placeholder="Duration name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        autoFocus
      />
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

export default DurationForm;
