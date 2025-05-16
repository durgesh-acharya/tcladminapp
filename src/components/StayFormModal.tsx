import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const StayFormModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">✕</button>
      {children}
    </div>
  </div>
  );
};

export default StayFormModal;
