'use client';
import React, { useCallback, useEffect, useState } from 'react';
import KnowBeforeYouGoCard from '@/components/KnowBeforeYouGoCard';
import AddKnowBeforeYouGoModal from '@/components/AddKnowBeforeYouGoModal';
import { useSearchParams } from 'next/navigation';

interface KnowBeforeYouGoItem {
  knowbeforeyougo: number;
  knowbeforeyougo_point: string;
  knowbeforeyougo_packagesid: number;
}

const KnowBeforeYouGoPage = () => {
  const searchParams = useSearchParams();
  const rawPackageId = searchParams.get('packageid');
  const packageId = rawPackageId ? parseInt(rawPackageId, 10) : 0;

  const [points, setPoints] = useState<KnowBeforeYouGoItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPoints = useCallback(async () => {
    try {
      const res = await fetch(`http://103.168.18.92/api/knowbeforeyougo/package/${packageId}`);
      const responseData = await res.json();

      if (responseData.status !== false && Array.isArray(responseData.data)) {
        setPoints(responseData.data);
      } else {
        setPoints([]);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setPoints([]);
    }
  }, [packageId]);

  useEffect(() => {
    if (packageId) {
      fetchPoints();
    }
  },  [fetchPoints,packageId]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Know Before You Go – Package {packageId}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-6 py-2 rounded transition cursor-pointer"
        >
          Add Point
        </button>
      </div>

      {points.map((item) => (
        <KnowBeforeYouGoCard key={item.knowbeforeyougo} point={item.knowbeforeyougo_point} />
      ))}

      <AddKnowBeforeYouGoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageId={packageId}
        onAddSuccess={fetchPoints}
      />
    </div>
  );
};

export default KnowBeforeYouGoPage;
