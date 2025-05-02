'use client'; // because we're using the useRouter hook

import React from 'react';
import { useRouter } from 'next/navigation'; // Importing useRouter for navigation

interface DestinationRoute {
  destinationroutes_id: number;
  destinationroutes_name: string;
  destinationroutes_locationsid: number;
  destinationroutes_isactive: number;
}

const dummyData: DestinationRoute[] = [
  {
    destinationroutes_id: 1,
    destinationroutes_name: "Beach Paradise",
    destinationroutes_locationsid: 101,
    destinationroutes_isactive: 1,
  },
  {
    destinationroutes_id: 2,
    destinationroutes_name: "Mountain Trek",
    destinationroutes_locationsid: 102,
    destinationroutes_isactive: 1,
  },
  {
    destinationroutes_id: 3,
    destinationroutes_name: "Desert Safari",
    destinationroutes_locationsid: 103,
    destinationroutes_isactive: 0,
  },
];

const DestinationRoutesPage = () => {
  const router = useRouter(); // Initialize useRouter to navigate programmatically

  // Handle the click event for the "Add Route" button
  const handleAddRouteClick = () => {
    router.push('/destinationroutes/create'); // Navigate to the add route page
  };

  return (
    <div className="p-8 relative">
      {/* Add Route Button */}
      <button
        onClick={handleAddRouteClick}
        className="absolute top-6 right-6 bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-black-600 transition cursor-pointer mr-3"
      >
        + Add Route
      </button>

      {/* Table Section */}
      <h1 className="text-2xl font-bold mb-6">Destination Routes</h1>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Location ID</th>
              <th className="px-6 py-3">Active</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((route) => (
              <tr key={route.destinationroutes_id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{route.destinationroutes_id}</td>
                <td className="px-6 py-4">{route.destinationroutes_name}</td>
                <td className="px-6 py-4">{route.destinationroutes_locationsid}</td>
                <td className="px-6 py-4">
                  {route.destinationroutes_isactive ? 'Yes' : 'No'}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DestinationRoutesPage;
