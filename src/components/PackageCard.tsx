// PackageCard.tsx
import { useRouter } from 'next/navigation';

type Package = {
  packages_id: number;
  packages_name: string;
  packages_actualprice: number;
  packages_offerprice: number;
  packages_locationsid: number;
  packages_locationdurations: number;
  packages_destinationroutesid: number;
  packages_staycategoriesid: number;
  packages_isactive: number;
};

const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => {
  const router = useRouter();
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-bold">{pkg.packages_name}</h2>
      <p>Actual Price: ₹{pkg.packages_actualprice}</p>
      <p>Offer Price: ₹{pkg.packages_offerprice}</p>
      {/* <p>Duration: {pkg.packages_locationdurations} days</p> */}
      <p>Status: {pkg.packages_isactive ? 'Active' : 'Inactive'}</p>
      <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-black transition cursor-pointer"
          onClick={() => router.push(`/packages/editdetails/${pkg.packages_id}`)}
        >
          Edit Tour Details
        </button>
    </div>
  );
};

export default PackageCard;
