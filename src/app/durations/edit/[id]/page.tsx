'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DurationForm from '@/components/DurationForm';

const EditDurationPage = () => {
  const router = useRouter();
  const params = useParams();
  const durationId = params?.id;

  const [initialData, setInitialData] = useState<{ durations_name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDuration = async () => {
      try {
        const response = await fetch(`http://103.168.18.92/api/durations/${durationId}`);
        const result = await response.json();

        if (result.status && result.data.length > 0) {
          const duration = result.data[0];
          setInitialData({ durations_name: duration.durations_name });
        } else {
          alert('Duration not found.');
        }
      } catch (error) {
        console.error('Error fetching duration:', error);
        alert('Failed to load duration data.');
      } finally {
        setLoading(false);
      }
    };

    if (durationId) fetchDuration();
  }, [durationId]);

  const handleUpdate = async (name: string) => {
    try {
      const response = await fetch(`http://103.168.18.92/api/durations/update/${durationId}`, {
        method: 'POST', // Or 'PUT' if your API requires it
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ durations_name: name }),
      });

      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update duration');
      }

      console.log('Duration updated:', result);
      router.push('/durations');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      alert(errorMessage);
    }
  };

  if (loading || !initialData) return <div className="text-center mt-20">Loading...</div>;

  return <DurationForm onSubmit={handleUpdate} initialData={initialData} />;
};

export default EditDurationPage;
