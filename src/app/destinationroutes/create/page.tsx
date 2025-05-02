'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import DestinationRouteForm from '@/components/DestinationRouteForm';

const dummyLocations = [
  {
    locations_id: 101,
    locations_name: 'Goa Beach',
    locations_url: 'https://example.com/goa-beach',
    locations_isactive: 1,
  },
  {
    locations_id: 102,
    locations_name: 'Himalayan Trail',
    locations_url: 'https://example.com/himalayan-trail',
    locations_isactive: 1,
  },
  {
    locations_id: 103,
    locations_name: 'Thar Desert',
    locations_url: 'https://example.com/thar-desert',
    locations_isactive: 0,
  },
];

const AddDestinationRoutePage = () => {
  const router = useRouter();

  const handleSubmit = (data: {
    name: string;
    locationId: number;
    isActive: number;
  }) => {
    console.log('Submitted route:', data);
    router.push('/destination-routes');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <DestinationRouteForm onSubmit={handleSubmit} locations={dummyLocations} />
    </div>
  );
};

export default AddDestinationRoutePage;
