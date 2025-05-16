"use client"
// pages/activities.tsx
import React, { useState } from 'react';
import PackageActivityCard from '@/components/PackageActivityCard';
import AddActivityModal from '@/components/AddActivityModal';
import { useSearchParams } from 'next/navigation';

const mockActivities = [
  {
    packageactivities_id: 1,
    packageactivities_day: 1,
    packageactivities_title: 'Arrival & City Tour',
    packageactivities_description: 'Welcome to the city! Explore main sights.',
    packageactivities_packageid: 101,
  },
  {
    packageactivities_id: 2,
    packageactivities_day: 2,
    packageactivities_title: 'Mountain Hike',
    packageactivities_description: 'Full-day guided mountain hike.',
    packageactivities_packageid: 101,
  },
];

const PackageActivitiesPage = () => {
    const searchParams = useSearchParams();
    const rawPackageId = searchParams.get('packageid');
    const packageId = rawPackageId ? parseInt(rawPackageId, 10) : 0;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen  p-8">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-white">Package Activities for {packageId}</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition cursor-pointer"
      >
        Add Activity
      </button>
    </div>

    {mockActivities.map((activity) => (
      <PackageActivityCard key={activity.packageactivities_id} activity={activity} />
    ))}

    <AddActivityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} packageId={packageId} />
  </div>
  );
};

export default PackageActivitiesPage;
