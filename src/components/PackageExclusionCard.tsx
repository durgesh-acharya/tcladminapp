import React from 'react';

interface PackageExclusionCardProps {
  exclusion: string;
}

const PackageExclusionCard: React.FC<PackageExclusionCardProps> = ({ exclusion }) => {
  return (
    <div className="bg-black border border-gray-300 p-4 rounded shadow-sm mb-3">
      <p className="text-white font-medium">{exclusion}</p>
    </div>
  );
};

export default PackageExclusionCard;
