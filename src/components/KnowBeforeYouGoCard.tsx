import React from 'react';

interface KnowBeforeYouGoCardProps {
  point: string;
}

const KnowBeforeYouGoCard: React.FC<KnowBeforeYouGoCardProps> = ({ point }) => {
  return (
    <div className="bg-black border border-gray-300 p-4 rounded shadow-sm mb-3">
      <p className="text-white">{point}</p>
    </div>
  );
};

export default KnowBeforeYouGoCard;
