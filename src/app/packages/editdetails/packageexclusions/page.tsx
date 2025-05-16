'use client';

import React, { useCallback, useEffect, useState, Suspense } from 'react';
import PackageExclusionCard from '@/components/PackageExclusionCard';
import AddPackageExclusionModal from '@/components/AddPackageExclusionModal';
import { useSearchParams } from 'next/navigation';

interface PackageExclusion {
  packageexclusion_id: number;
  packageexclusion_exclusion: string;
  packageexclusion_packagesid: number;
}

const PackageExclusionsComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const rawPackageId = searchParams.get('packageid');
  const packageId = rawPackageId ? parseInt(rawPackageId, 10) : 0;

  const [exclusions, setExclusions] = useState<PackageExclusion[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchExclusions = useCallback(async () => {
    try {
      const res = await fetch(`http://103.168.18.92/api/tourexclusion/package/${packageId}`);
      const json = await res.json();
      if (json.status) {
        setExclusions(json.data);
      } else {
        console.error('Failed to load exclusions:', json.message);
        setExclusions([]);
      }
    } catch (err) {
      console.error('Error fetching exclusions:', err);
      setExclusions([]);
    }
  }, [packageId]);

  useEffect(() => {
    if (packageId) fetchExclusions();
  }, [fetchExclusions, packageId]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Package Exclusions for Package {packageId}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-6 py-2 rounded transition cursor-pointer"
        >
          Add Exclusion
        </button>
      </div>

      {exclusions.length === 0 ? (
        <p className="text-gray-600">No exclusions added yet for this package.</p>
      ) : (
        exclusions.map((exclusion) => (
          <PackageExclusionCard
            key={exclusion.packageexclusion_id}
            exclusion={exclusion.packageexclusion_exclusion}
          />
        ))
      )}

      <AddPackageExclusionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchExclusions(); // Refresh after modal closes
        }}
        packageId={packageId}
      />
    </div>
  );
};

export default function PackageExclusionsPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading exclusions...</div>}>
      <PackageExclusionsComponent />
    </Suspense>
  );
}
