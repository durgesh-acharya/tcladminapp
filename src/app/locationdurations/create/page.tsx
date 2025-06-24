'use client';

import { useState, useEffect } from 'react';
import LocationDurationForm from '@/components/LocationDurationForm';
import { useRouter } from 'next/navigation';

const CreateLocationDurationPage = () => {
  const router = useRouter();

  const [locations, setLocations] = useState<{ id: number; name: string }[]>([]);
  const [durations, setDurations] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsRes, durationsRes] = await Promise.all([
          fetch('http://103.168.18.92/api/locations/all'),
          fetch('http://103.168.18.92/api/durations/all'),
        ]);
  
        if (!locationsRes.ok || !durationsRes.ok) {
          throw new Error('Failed to fetch locations or durations');
        }
  
        const locationsJson = await locationsRes.json();
        const durationsJson = await durationsRes.json();
  
        type LocationAPIItem = {
          locations_id: number;
          locations_name: string;
        };
  
        type DurationAPIItem = {
          durations_id: number;
          durations_name: string;
        };
  
        const formattedLocations = (locationsJson.data as LocationAPIItem[]).map((item) => ({
          id: item.locations_id,
          name: item.locations_name,
        }));
  
        const formattedDurations = (durationsJson.data as DurationAPIItem[]).map((item) => ({
          id: item.durations_id,
          name: item.durations_name,
        }));
  
        setLocations(formattedLocations);
        setDurations(formattedDurations);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleCreate = async (location: {
    locationsid: number;
    durations_id: number;
    tags: string;
    startsfrom: number;
    imageFile: File; // Add this
    isactive: number;
  }) => {
    try {
      const formData = new FormData();
      formData.append('locationdurations_locationsid', location.locationsid.toString());
      formData.append('locationdurations_durations_id', location.durations_id.toString());
      formData.append('locationdurations_tags', location.tags);
      formData.append('locationdurations_startsfrom', location.startsfrom.toString());
      formData.append('locationdurations_isactive', location.isactive.toString());
      formData.append('image', location.imageFile); // file, not string
  
      const response = await fetch('http://103.168.18.92/api/locationdurations/create', {
        method: 'POST',
        body: formData, // No need to set Content-Type manually
      });
      
      const text = await response.text(); // safer than direct .json()
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(`Failed to create: ${response.statusText}`);
      }
  
      // const data = await response.json();
      console.log('Created successfully:', result);
      router.push('/locationdurations');
      router.refresh();
    
    } catch (error) {
      console.error('Image upload or form submission failed:', error);
      alert('Failed to create entry. Check console for details.');
    }
  };
  

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="p-4">
      <LocationDurationForm
        onSubmit={handleCreate}
        locations={locations}
        durations={durations}
      />
    </div>
  );
};

export default CreateLocationDurationPage;
