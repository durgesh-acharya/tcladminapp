// components/ItineraryCard.tsx
import React from "react";

type Itinerary = {
  itineraries_id: number;
  itineraries_day: number;
  itineraries_tiitle: string;
  itineraries_description: string;
  itineraries_paackagesid: number;
};

type Props = {
  data: Itinerary[];
};

const ItineraryCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid gap-4">
      {data.map((item) => (
        <div key={item.itineraries_id} className="border rounded shadow-md overflow-hidden">
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Day {item.itineraries_day}</h2>
            <h3 className="text-md font-semibold">{item.itineraries_tiitle}</h3>
          </div>
          <div className="p-4">
            <p className="text-gray-700">{item.itineraries_description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryCard;
