import React from 'react';
import PackageCard from './PackageCard';

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

interface PackageListProps {
  packages: Package[];
}

const PackageList: React.FC<PackageListProps> = ({ packages }) => {
  if (!packages || packages.length === 0) {
    return <p className="text-gray-500 mt-4">No tours available for this destination.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {packages.map((pkg) => (
        <PackageCard key={pkg.packages_id} pkg={pkg} />
      ))}
    </div>
  );
};

export default PackageList;
