import Image from "next/image";
import Link from "next/link";

type Location = {
  id: number;
  name: string;
  imageUrl: string;
};

const locations: Location[] = [
  { id: 1, name: "New York", imageUrl: "https://picsum.photos/id/237/200" },
  { id: 2, name: "Paris", imageUrl: "https://picsum.photos/seed/picsum/200" },
  { id: 3, name: "Tokyo", imageUrl: "https://picsum.photos/id/237/200" },
];

const LocationList = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Locations</h1>
        <Link href="/locations/create">
          <button className="bg-black text-white py-2 px-4 rounded shadow-md hover:bg-black transition">
            Add Location
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location) => (
          <div key={location.id} className="bg-white p-4 rounded-lg shadow-lg">
            <div className="relative w-full h-48 mb-4">
              <Image
                src={location.imageUrl}
                alt={location.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h2 className="text-xl font-semibold">{location.name}</h2>
            <div className="mt-4 flex gap-3">
              <Link href={`/locations/${location.id}`}>
                <h6 className="bg-green-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-green-600 transition">
                  View
                </h6>
              </Link>
              <Link href={`/locations/edit/${location.id}`}>
                <h6 className="bg-yellow-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-yellow-600 transition">
                  Edit
                </h6>
              </Link>
              <Link href={`/locations/delete/${location.id}`}>
                <h6 className="bg-red-500 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-600 transition">
                  Delete
                </h6>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
