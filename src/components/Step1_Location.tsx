import { useEffect, useState } from 'react';

type Location = {
  locations_id: number;
  locations_name: string;
  locations_url: string;
  locations_isactive: number;
};

type Props = {
  data: {
    location: number | null;
  };
  update: (data: { location: number | null }) => void;
  next: () => void;
};

const Step1_Location = ({ data, update, next }: Props) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://103.168.18.92/api/locations/all');
        const result = await response.json();

        if (result.status && Array.isArray(result.data)) {
          setLocations(result.data);
        } else {
          console.error('Unexpected API response:', result);
        }
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectedId = value ? parseInt(value, 10) : null;
    update({ location: selectedId });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 1: Select Destination</h2>

      {loading ? (
        <p>Loading locations...</p>
      ) : (
        <select
  className="w-full border p-2 mb-4"
  value={data.location !== null ? data.location : ''}
  onChange={handleChange}
>
  <option value="">Select a Destination</option>
  {locations.map((loc) => (
    <option key={loc.locations_id} value={loc.locations_id}>
      {loc.locations_name}
    </option>
  ))}
</select>
      )}

      <button
        onClick={next}
        disabled={data.location === null}
        className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Step1_Location;
