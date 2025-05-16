import { useEffect, useState } from 'react';

type Route = {
  destinationroutes_id: number;
  destinationroutes_name: string;
};

type Props = {
  data: { routes: number | null };
  update: (data: { routes: number | null }) => void;
  next: () => void;
  back: () => void;
  duration: number | null;
};

const Step3_Routes = ({ data, update, next, back, duration }: Props) => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!duration) return;

      try {
        setLoading(true);
        const response = await fetch(
          `http://103.168.18.92/api/destinationroutes/joined/location/${duration}`
        );
        const result = await response.json();
        if (result.status && Array.isArray(result.data)) {
          setRoutes(result.data);
        } else {
          console.error('Unexpected API response:', result);
        }
      } catch (error) {
        console.error('Failed to fetch routes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [duration]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value ? parseInt(e.target.value, 10) : null;
    update({ routes: selectedId });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 3: Select Route</h2>

      {loading ? (
        <p>Loading routes...</p>
      ) : (
        <select
          className="w-full border p-2 mb-4"
          value={data.routes ?? ''}
          onChange={handleChange}
        >
          <option value="">Select a route</option>
          {routes.map((route) => (
            <option
              key={route.destinationroutes_id}
              value={route.destinationroutes_id}
            >
              {route.destinationroutes_name}
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
          disabled={data.routes === null}
          className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3_Routes;
