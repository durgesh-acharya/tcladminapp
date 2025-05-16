// /editdetails/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import CardGrid from '@/components/CardGrid'; 

const EditPackageDetailsPage = () => {

  

  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    console.log('Package ID:', id);
    // you can now fetch or use the id as needed
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Edit Package Details for {id}</h1>
        <CardGrid packageId={id}/>
    </div>
  );
};

export default EditPackageDetailsPage;
