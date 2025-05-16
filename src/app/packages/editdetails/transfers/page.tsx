'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AddTransferModal from '@/components/AddTransferModal';
import TransferCard from '@/components/TransferCard';

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

type ApiResponse = {
  status: boolean;
  message: string;
  data: Transfer[];
};

const TransferComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const packageId = searchParams.get('packageid');

  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  useEffect(() => {
    if (!packageId) return;

    const fetchTransfers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://103.168.18.92/api/transfers/package/${packageId}`);
        const result: ApiResponse = await res.json();

        if (result.status && Array.isArray(result.data)) {
          setTransfers(result.data);
        } else {
          setTransfers([]);
        }
      } catch (error) {
        console.error('Error fetching transfers:', error);
        setTransfers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, [packageId]);

  const handleAddTransfer = async (newTransfer: Omit<Transfer, 'transfers_id' | 'transfers_packagesid'>) => {
    if (!packageId) return;

    const payload = {
      ...newTransfer,
      transfers_packagesid: Number(packageId),
    };

    try {
      const res = await fetch('http://103.168.18.92/api/transfers/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.status) {
        const refreshed = await fetch(`http://103.168.18.92/api/transfers/package/${packageId}`);
        const refreshedData = await refreshed.json();
        setTransfers(refreshedData.data || []);
        setIsTransferModalOpen(false);
      } else {
        console.error('Failed to create transfer:', result.message);
      }
    } catch (error) {
      console.error('Error adding transfer:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transfers</h1>
        <button
          onClick={() => setIsTransferModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add Transfer
        </button>
      </div>

      <p className="mb-4 text-gray-700">Package ID: {packageId}</p>

      {loading ? (
        <p>Loading transfers...</p>
      ) : transfers.length > 0 ? (
        <TransferCard data={transfers} />
      ) : (
        <p className="text-gray-500">No transfers found for this package.</p>
      )}

      <AddTransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onSave={handleAddTransfer}
      />
    </div>
  );
};

const TransferPageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading transfers...</div>}>
      <TransferComponent />
    </Suspense>
  );
};

export default TransferPageWithSuspense;
