import React from "react";
import Image from 'next/image';

type Stay = {
  stays_id: number;
  stays_day: string;
  stays_stysat: string;
  stays_checkin: string;
  stays_checkout: string;
  stays_numofnight: string;
  stays_title: string;
  stays_isbreakfastinclude: number;
  stays_islunchinclude: number;
  stays_isdinnerinclude: number;
  stays_image1: string;
  stays_image2: string;
  stays_packageid: number;
};

type Props = {
  data: Stay[];
};

const StayCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid gap-4 mt-10">
      {data.map((stay) => (
        <div key={stay.stays_id} className="border rounded shadow-md overflow-hidden">
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Day {stay.stays_day}</h2>
            <h3 className="text-md font-semibold">{stay.stays_title}</h3>
          </div>
          <div className="p-4 space-y-2">
            <p><strong>Stay At:</strong> {stay.stays_stysat}</p>
            <p><strong>Check-in:</strong> {stay.stays_checkin} | <strong>Check-out:</strong> {stay.stays_checkout}</p>
            <p><strong>Nights:</strong> {stay.stays_numofnight}</p>
            <p><strong>Meals:</strong> 
              {stay.stays_isbreakfastinclude ? " Breakfast" : ""}
              {stay.stays_islunchinclude ? ", Lunch" : ""}
              {stay.stays_isdinnerinclude ? ", Dinner" : ""}
            </p>
            <div className="flex space-x-4 mt-2">
            <Image
                src={`http://103.168.18.92${stay.stays_image1}`}
                alt="Stay 1"
                width={96}
                height={64}
                className="rounded object-cover"
              />
              <Image
                src={`http://103.168.18.92${stay.stays_image2}`}
                alt="Stay 2"
                width={96}
                height={64}
                className="rounded object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StayCard;

