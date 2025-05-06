'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';

interface FormProps {
  onSubmit: (data: {
    name: string;
    isActive: number;
  }) => void;
}

const DestinationRouteForm: React.FC<FormProps> = ({ onSubmit }) => {
  const params = useParams();
  const locationIdFromParams = Number(params?.id);

  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !locationIdFromParams) {
      alert('Please provide a route name and valid location ID');
      return;
    }

    onSubmit({
      name,
      isActive,
    });

    setName('');
    setIsActive(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add Route for LocationDuration ID {locationIdFromParams}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Route Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter route name"
        />
      </div>

      <div className="mb-6">
        <span className="block text-gray-700 mb-1">Status</span>
        <div className="flex gap-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value={1}
              checked={isActive === 1}
              onChange={() => setIsActive(1)}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value={0}
              checked={isActive === 0}
              onChange={() => setIsActive(0)}
              className="form-radio text-red-600"
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Add Route
      </button>
    </form>
  );
};

export default DestinationRouteForm;
