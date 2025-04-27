"use client";

import React, { useState,useEffect } from 'react';
import Link from 'next/link';

type Duration = {
  durations_id: number;
  durations_name: string;
};

const DurationsPage: React.FC = () => {
    const [durations, setDurations] = useState<Duration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDurations = async () => {
          try {
            const response = await fetch("http://103.168.18.92/api/durations/all");
            const result = await response.json();
            if (result.status && Array.isArray(result.data)) {
              setDurations(result.data);
            } else {
              alert("Failed to load durations.");
            }
          } catch (error) {
            console.error("Error fetching durations:", error);
            alert("An error occurred while fetching durations.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchDurations();
      }, []);

  // const handleView = (id: number) => {
  //   const duration = durations.find((d) => d.durations_id === id);
  //   alert(`Viewing: ${duration?.durations_name}`);
  // };

  // const handleEdit = (id: number) => {
  //   const newName = prompt('Enter new name:');
  //   if (newName) {
  //     setDurations((prev) =>
  //       prev.map((d) =>
  //         d.durations_id === id ? { ...d, durations_name: newName } : d
  //       )
  //     );
  //   }
  // };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this duration?')) {
      setDurations((prev) => prev.filter((d) => d.durations_id !== id));
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Durations List</h1>
      <Link
          href="/durations/create"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          + Add Duration
        </Link>
    </div>

    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="min-w-full table-auto">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
            <th className="px-6 py-4 text-center text-sm font-semibold">Duration Name</th>
            <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
            {loading ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : durations.length > 0 ? (
              durations.map((duration, index) => (
                <tr
                  key={duration.durations_id}
                  className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-6 py-4 text-left text-sm text-gray-800">{duration.durations_id}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 font-medium">
                    {duration.durations_name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/durations/edit/${duration.durations_id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 text-sm rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(duration.durations_id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-sm rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No durations found.
                </td>
              </tr>
            )}
          </tbody>
      </table>
    </div>
  </div>
  );
};

export default DurationsPage;
