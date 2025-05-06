'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DestinationRoute {
  destinationroutes_id: number;
  destinationroutes_name: string;
  destinationroutes_locationdurationsid: number;
  destinationroutes_isactive: number;
  locationdurations_tags: string;
}

const DestinationRoutesPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const [routes, setRoutes] = useState<DestinationRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchRoutes = async () => {
      try {
        const res = await fetch(`http://103.168.18.92/api/destinationroutes/joined/location/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch routes');
        }

        const json = await res.json();
        setRoutes(json.data || []);
      } catch (error) {
        console.error('Error fetching routes:', error);
        setRoutes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [id]);

  const handleCreateRoute = () => {
    router.push(`/locationdurations/${id}/destinationroutes/create`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Routes for Location Duration ID: {id}
        </h1>
        <button
          onClick={handleCreateRoute}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Create Route
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : routes.length === 0 ? (
        <div className="text-gray-600 text-center mt-10">
          No routes found for this location duration.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {routes.map((route) => (
            <div
              key={route.destinationroutes_id}
              className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition"
            >
              <h2 className="text-lg font-medium text-gray-800">
                {route.destinationroutes_name}
              </h2>
              {/* <p className="text-sm text-gray-500">
                Route ID: {route.destinationroutes_id}
              </p> */}
              <p className="text-sm text-gray-500 mt-1">
                Tags: {route.locationdurations_tags}
              </p>
              <p className={`text-xs mt-2 ${route.destinationroutes_isactive ? 'text-green-600' : 'text-red-600'}`}>
                {route.destinationroutes_isactive ? 'Active' : 'Inactive'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationRoutesPage;
