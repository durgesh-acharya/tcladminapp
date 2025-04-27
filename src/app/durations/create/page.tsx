// app/durations/create/page.tsx

'use client';

import DurationForm from '@/components/DurationForm';
import { useRouter } from 'next/navigation';

const CreateDurationPage = () => {
  const router = useRouter();
  const handleCreate = async (name: string) => {
    try {
      const response = await fetch('http://103.168.18.92/api/durations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          durations_name: name,
        }),
      });

      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error('Invalid JSON:', text);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create duration');
      }

      console.log('Created duration:', result);
      router.push('/durations');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      alert(errorMessage);
      console.error('Create duration error:', err);
    }
  };

  return (
    <div className="p-4">
      <DurationForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateDurationPage;
