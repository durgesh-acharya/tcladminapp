import { useEffect, useState } from 'react';

type Duration = {
  locationdurations_id: number;
  locationdurations_locationsid: number;
  locationdurations_durations_id: number;
  locationdurations_tags: string;
  locationdurations_startsfrom: string;
  locationdurations_imageurl: string;
  locationdurations_isactive: number;
};

type Props = {
  data: { duration: number | null }; // Still storing tag string like "2N3D", adjust if needed
  update: (data: { duration: number | null }) => void;
  next: () => void;
  back: () => void;
  location: number | null;
};

const Step2_Duration = ({ data, update, next, back, location }: Props) => {
  const [durations, setDurations] = useState<Duration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDurations = async () => {
      if (!location) {
        console.warn("No location provided.");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://103.168.18.92/api/locationdurations/location/${location}`);
        const result = await response.json();
        console.log(result);
        if (result.status && Array.isArray(result.data)) {
          setDurations(result.data);
        } else {
          console.error('Unexpected API response:', result);
        }
      } catch (error) {
        console.error('Failed to fetch durations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDurations();
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    // Parse the selected value as an integer
    const selectedId = value ? parseInt(value, 10) : null;
    update({ duration: selectedId });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 2: Select Duration</h2>

      {loading ? (
        <p>Loading durations...</p>
      ) : (
        <select
        className="w-full border p-2 mb-4"
        value={data.duration ?? ''} // Make sure to handle the case when the duration is null or undefined
        onChange={handleChange}
      >
        <option value="">Select duration</option>
        {durations.map(d => (
          <option key={d.locationdurations_id} value={d.locationdurations_id}>
            {d.locationdurations_tags} (From ₹{d.locationdurations_startsfrom})
          </option>
        ))}
      </select>
      )}

      <div className="flex justify-between">
        <button onClick={back} className="bg-gray-500 text-white px-4 py-2 rounded">
          Back
        </button>
        <button
          onClick={next}
          disabled={!data.duration}
          className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2_Duration;
