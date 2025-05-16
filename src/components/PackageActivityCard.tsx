// components/ActivityCard.tsx
import React from 'react';

interface PackageActivityCardProps {
  activity: {
    packageactivities_day: number;
    packageactivities_title: string;
    packageactivities_description: string;
  };
}

const PackageActivityCard: React.FC<PackageActivityCardProps> = ({ activity }) => {
  return (
    <div className="mb-4">
      <div className="flex bg-black text-white p-4 rounded-t-lg justify-between">
        <div className="font-semibold">Day {activity.packageactivities_day}</div>
        <div className="text-lg font-bold">{activity.packageactivities_title}</div>
      </div>
      <div className="bg-white text-black p-4 rounded-b-lg border border-t-0 border-black">
        {activity.packageactivities_description}
      </div>
    </div>
  );
};

export default PackageActivityCard;
