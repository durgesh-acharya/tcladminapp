import React from 'react';

interface PackageInclusionCardProps {
  inclusion: string;
}

const PackageInclusionCard: React.FC<PackageInclusionCardProps> = ({ inclusion }) => {
  return (
    <div className="bg-black border border-gray-300 p-4 rounded shadow-sm mb-3 mt-3">
      <p className="text-white font-medium">{inclusion}</p>
    </div>
  );
};

export default PackageInclusionCard;
