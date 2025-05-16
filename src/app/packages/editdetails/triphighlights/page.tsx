'use client';
import React, { useCallback, useState, useEffect } from 'react';
import TripHighlightCard from '@/components/TripHighlightCard';
import AddTripHighlightModal from '@/components/AddTripHighlightModal';
import { useSearchParams } from 'next/navigation';

type TripHighlight = {
  triphighlights_id: number;
  triphighlights_name: string;
  triphighlights_packageid: number;
};

const TripHighlightsPage = () => {
  const searchParams = useSearchParams();
  const rawPackageId = searchParams.get('packageid');
  const packageId = rawPackageId ? parseInt(rawPackageId, 10) : 0;

  const [highlights, setHighlights] = useState<TripHighlight[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchHighlights = useCallback(async () => {
    try {
      const res = await fetch(`http://103.168.18.92/api/triphighlights/package/${packageId}`);
      const data = await res.json();
      if (data.status) {
        setHighlights(data.data);
      } else {
        setHighlights([]);
      }
    } catch (err) {
      console.error('Error fetching highlights:', err);
    }
  }, [packageId]);

  useEffect(() => {
    if (packageId) {
      fetchHighlights();
    }
  }, [ fetchHighlights,packageId]);

  // ✅ Function to handle saving a new highlight
  const handleSave = async (highlightName: string) => {
    try {
      const res = await fetch('http://103.168.18.92/api/triphighlights/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          triphighlights_name: highlightName,
          triphighlights_packageid: packageId,
        }),
      });

      const data = await res.json();

      if (data.status) {
        setIsModalOpen(false);
        fetchHighlights();
      } else {
        console.error('Failed to save trip highlight:', data.message);
      }
    } catch (err) {
      console.error('Error saving highlight:', err);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">
          Trip Highlights for Package {packageId}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Add Highlight
        </button>
      </div>

      {highlights.length > 0 ? (
        highlights.map((highlight) => (
          <TripHighlightCard
            key={highlight.triphighlights_id}
            name={highlight.triphighlights_name}
          />
        ))
      ) : (
        <p>No highlights available for this package.</p>
      )}

      <AddTripHighlightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave} 
        packageId={packageId}
      />
    </div>
  );
};

export default TripHighlightsPage;
