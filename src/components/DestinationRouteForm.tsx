'use client';

import React, { useState } from 'react';

interface Location {
  locations_id: number;
  locations_name: string;
  locations_url: string;
  locations_isactive: number;
}

interface FormProps {
  onSubmit: (data: {
    name: string;
    locationId: number;
    isActive: number;
  }) => void;
  locations: Location[]; // ✅ pass locations as props
}

const DestinationRouteForm: React.FC<FormProps> = ({ onSubmit, locations }) => {
  const [name, setName] = useState('');
  const [locationId, setLocationId] = useState<number | ''>('');
  const [isActive, setIsActive] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || locationId === '') {
      alert('Please fill all fields');
      return;
    }

    onSubmit({
      name,
      locationId: Number(locationId),
      isActive,
    });

    setName('');
    setLocationId('');
    setIsActive(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Destination Route</h2>

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

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Location</label>
        <select
          value={locationId}
          onChange={(e) => setLocationId(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">Select a location</option>
          {locations
            .filter((loc) => loc.locations_isactive)
            .map((loc) => (
              <option key={loc.locations_id} value={loc.locations_id}>
                {loc.locations_name}
              </option>
            ))}
        </select>
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
        className="w-full bg-black text-white py-2 rounded hover:bg-black-600 transition"
      >
        Add Route
      </button>
    </form>
  );
};

export default DestinationRouteForm;
