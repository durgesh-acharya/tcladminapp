'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import DestinationRouteForm from '@/components/DestinationRouteForm';

const AddDestinationRoutePage = () => {
  const router = useRouter();
  const params = useParams();
  const locationDurationId = Number(params?.id);

  const handleSubmit = async (data: {
    name: string;
    isActive: number;
  }) => {
    if (!locationDurationId) {
      alert('Invalid location duration ID in URL');
      return;
    }

    try {
      const response = await fetch('http://103.168.18.92/api/destinationroutes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destinationroutes_name: data.name,
          destinationroutes_locationdurationsid: locationDurationId,
          destinationroutes_isactive: data.isActive,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create route');
      }

      const result = await response.json();
      console.log('Route created:', result);
      router.push(`/locationdurations/${locationDurationId}/destinationroutes`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create route. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <DestinationRouteForm
        onSubmit={({ name, isActive }) =>
          handleSubmit({ name, isActive })
        }
      />
    </div>
  );
};

export default AddDestinationRoutePage;
