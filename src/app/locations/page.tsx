"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Location = {
  locations_id: number;
  locations_name: string;
  locations_url: string;
  locations_isactive: number;
};

const LocationList = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://103.168.18.92/api/locations/all"); // Replace with your actual API URL
        const data = await response.json();
        if (data.status) {
          setLocations(data.data); // Set the locations from the response
        } else {
          console.error("Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Check if no locations exist
  const renderLocations = () => {
    if (loading) {
      return <div>Loading Locations....</div>;
    }

    if (locations.length === 0) {
      return (
        <div className="text-center text-lg font-semibold text-gray-600">
          No locations to display.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location) => (
          <div key={location.locations_id} className="bg-white p-4 rounded-lg shadow-lg">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={`http://103.168.18.92${location.locations_url}`}
                alt={location.locations_name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h2 className="text-xl font-semibold">{location.locations_name}</h2>
            <div className="mt-4 flex gap-3">
              <Link href={`/locations/${location.locations_id}`}>
                <h6 className="bg-green-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-green-600 transition">
                  View
                </h6>
              </Link>
              <Link href={`/locations/edit/${location.locations_id}`}>
                <h6 className="bg-yellow-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-yellow-600 transition">
                  Edit
                </h6>
              </Link>
              <Link href={`/locations/delete/${location.locations_id}`}>
                <h6 className="bg-red-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-600 transition">
                  Delete
                </h6>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Locations</h1>
        <Link href="/locations/create">
          <button className="bg-black text-white py-2 px-4 rounded shadow-md hover:bg-black transition">
            Add Location
          </button>
        </Link>
      </div>
      {renderLocations()}
    </div>
  );
};

export default LocationList;
