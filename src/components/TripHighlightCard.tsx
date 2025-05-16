// components/TripHighlightCard.tsx
import React from 'react';

interface TripHighlightCardProps {
  name: string;
}

const TripHighlightCard: React.FC<TripHighlightCardProps> = ({ name }) => {
  return (
    <div className="bg-white text-black p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold text-black">{name}</h2>
    </div>
  );
};

export default TripHighlightCard;
