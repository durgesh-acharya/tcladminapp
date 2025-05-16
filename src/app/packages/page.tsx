'use client';

import { useState, useEffect } from 'react';
import LocationDropdown from '@/components/LocationDropdown';
import PackageList from '@/components/PackageList';
import { useRouter } from 'next/navigation';

type Location = {
  locations_id: number;
  locations_name: string;
  locations_url: string;
  locations_isactive: number;
};

type Package = {
  packages_id: number;
  packages_name: string;
  packages_actualprice: number;
  packages_offerprice: number;
  packages_locationsid: number;
  packages_locationdurations: number;
  packages_destinationroutesid: number;
  packages_staycategoriesid: number;
  packages_isactive: number;
};

const PackagesPage = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loadingLocations, setLoadingLocations] = useState<boolean>(true);
  const [loadingPackages, setLoadingPackages] = useState<boolean>(false);
  const router = useRouter();

  // Fetch all locations on mount
  useEffect(() => {
    fetch('http://103.168.18.92/api/locations/all')
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          setLocations(response.data.filter((loc: Location) => loc.locations_isactive === 1));
        }
      })
      .catch((err) => {
        console.error('Failed to load locations', err);
      })
      .finally(() => setLoadingLocations(false));
  }, []);

  // Fetch packages when location changes
  useEffect(() => {
    if (selectedLocationId !== null) {
      setLoadingPackages(true);
      fetch(`http://103.168.18.92/api/packages/location/${selectedLocationId}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            setPackages(response.data);
          } else {
            setPackages([]);
          }
        })
        .catch((err) => {
          console.error('Failed to load packages', err);
          setPackages([]);
        })
        .finally(() => setLoadingPackages(false));
    } else {
      setPackages([]);
    }
  }, [selectedLocationId]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Explore Tours</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-black transition cursor-pointer"
          onClick={() => router.push('/packages/create')}
        >
          Add New Tour
        </button>
      </div>

      {/* Loading indicator for locations */}
      {loadingLocations ? (
        <p>Loading locations...</p>
      ) : (
        <LocationDropdown
          locations={locations}
          selectedId={selectedLocationId}
          onChange={setSelectedLocationId}
        />
      )}

      {/* Loading indicator for packages */}
      {loadingPackages ? (
        <p>Loading tours...</p>
      ) : (
        <PackageList packages={packages} />
      )}
    </div>
  );
};

export default PackagesPage;
