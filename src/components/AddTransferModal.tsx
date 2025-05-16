'use client';

import React, { useState } from "react";

// Define the fields the user fills in (no package ID here)
type TransferFormData = {
  transfers_day: number;
  transfers_title: string;
  transfers_type: string;
  transfers_transferin: string;
  transfers_from: string;
  transfers_to: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TransferFormData) => void;
};

const AddTransferModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    transfers_day: "",
    transfers_title: "",
    transfers_type: "",
    transfers_transferin: "",
    transfers_from: "",
    transfers_to: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "transfers_day" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData: TransferFormData = {
      transfers_day: Number(formData.transfers_day),
      transfers_title: formData.transfers_title,
      transfers_type: formData.transfers_type,
      transfers_transferin: formData.transfers_transferin,
      transfers_from: formData.transfers_from,
      transfers_to: formData.transfers_to,
    };

    onSave(formattedData); // Parent will add package ID
    setFormData({
      transfers_day: "",
      transfers_title: "",
      transfers_type: "",
      transfers_transferin: "",
      transfers_from: "",
      transfers_to: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Transfer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="transfers_day"
            placeholder="Day"
            value={formData.transfers_day}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
          <input
            name="transfers_title"
            placeholder="Title"
            value={formData.transfers_title}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
          <input
            name="transfers_type"
            placeholder="Type"
            value={formData.transfers_type}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
          <input
            name="transfers_transferin"
            placeholder="Transfer In"
            value={formData.transfers_transferin}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
          <input
            name="transfers_from"
            placeholder="From"
            value={formData.transfers_from}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
          <input
            name="transfers_to"
            placeholder="To"
            value={formData.transfers_to}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransferModal;
