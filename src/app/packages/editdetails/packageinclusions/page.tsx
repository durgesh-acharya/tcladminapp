'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import PackageInclusionCard from '@/components/PackageInclusionCard';
import AddPackageInclusionModal from '@/components/AddPackageInclusionModal';
import { useSearchParams } from 'next/navigation';

interface PackageInclusion {
  packageinclusion_id: number;
  packageinclusion_inclusion: string;
  packageinclusion_packagesid: number;
}

const PackageInclusionsComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const rawPackageId = searchParams.get('packageid');
  const packageId = rawPackageId ? parseInt(rawPackageId, 10) : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inclusions, setInclusions] = useState<PackageInclusion[]>([]);

  const fetchInclusions = useCallback(async () => {
    try {
      const res = await fetch(`http://103.168.18.92/api/tourinclusion/package/${packageId}`);
      const json = await res.json();
      if (json.status) {
        setInclusions(json.data);
      } else {
        console.error('Failed to load inclusions:', json.message);
        setInclusions([]);
      }
    } catch (error) {
      console.error('Error fetching inclusions:', error);
      setInclusions([]);
    }
  }, [packageId]);

  useEffect(() => {
    if (packageId) {
      fetchInclusions();
    }
  }, [fetchInclusions, packageId]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Package Inclusions for Package {packageId}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-6 py-2 rounded transition cursor-pointer"
        >
          Add Inclusion
        </button>
      </div>

      {inclusions.length === 0 ? (
        <p className="text-gray-600">No inclusions added yet for this package.</p>
      ) : (
        inclusions.map((inclusion) => (
          <PackageInclusionCard
            key={inclusion.packageinclusion_id}
            inclusion={inclusion.packageinclusion_inclusion}
          />
        ))
      )}

      <AddPackageInclusionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchInclusions(); // Refresh after modal closes
        }}
        packageId={packageId}
      />
    </div>
  );
};

export default function PackageInclusionsPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading inclusions...</div>}>
      <PackageInclusionsComponent />
    </Suspense>
  );
}
