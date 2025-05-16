// components/TransferCard.tsx
import React from "react";

type Transfer = {
  transfers_id: number;
  transfers_day: number;
  transfers_title: string;
  transfers_type: string;
  transfers_transferin: string;
  transfers_from: string;
  transfers_to: string;
  transfers_packagesid: number;
};

type Props = {
  data: Transfer[];
};

const TransferCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid gap-4 mt-10">
      {data.map((transfer) => (
        <div key={transfer.transfers_id} className="border rounded shadow-md overflow-hidden">
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Day {transfer.transfers_day}</h2>
            <h3 className="text-md font-semibold">{transfer.transfers_title}</h3>
          </div>
          <div className="p-4 space-y-2">
            <p><strong>Type:</strong> {transfer.transfers_type}</p>
            <p><strong>Transfer In:</strong> {transfer.transfers_transferin}</p>
            <p><strong>From:</strong> {transfer.transfers_from}</p>
            <p><strong>To:</strong> {transfer.transfers_to}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransferCard;
