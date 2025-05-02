'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type LocationDuration = {
  locationdurations_id: number;
  locationdurations_tags: string;
  locationdurations_startsfrom: string;
  locationdurations_imageurl: string;
  locationdurations_isactive: number;
  locations_id: number;
  locations_name: string;
  locations_url: string;
  locations_isactive: number;
  durations_id: number;
  durations_name: string;
};

const LocationDurationsPage: React.FC = () => {
  const [locationDurations, setLocationDurations] = useState<LocationDuration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocationDurations = async () => {
      try {
        const response = await fetch('http://103.168.18.92/api/locationdurations/all/joined'); // Replace with actual API URL
        const json = await response.json();
        if (json.status && Array.isArray(json.data)) {
          setLocationDurations(json.data);
        } else {
          console.error('Unexpected API response format:', json);
        }
      } catch (error) {
        console.error('Failed to fetch location durations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationDurations();
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this location duration?')) {
      setLocationDurations((prev) => prev.filter((d) => d.locationdurations_id !== id));
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Location Durations List</h1>
        <Link
          href="/locationdurations/create"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          + Add Location Duration
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Duration</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Tags</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Starts From</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Image</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Active</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : locationDurations.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  No location durations found.
                </td>
              </tr>
            ) : (
              locationDurations.map((location, index) => (
                <tr
                  key={location.locationdurations_id}
                  className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="px-6 py-4 text-left text-sm text-gray-800">{location.locationdurations_id}</td>
                  <td className="px-6 py-4 text-left text-sm text-gray-900">{location.locations_name}</td>
                  <td className="px-6 py-4 text-left text-sm text-gray-900">{location.durations_name}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{location.locationdurations_tags}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{location.locationdurations_startsfrom}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    <div className="w-20 h-14 relative mx-auto">
                      <Image
                        src={`http://103.168.18.92${location.locationdurations_imageurl}`}
                        alt={`Image for ${location.locations_name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {location.locationdurations_isactive ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/locationdurations/edit/${location.locationdurations_id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 text-sm rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(location.locationdurations_id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-sm rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationDurationsPage;
