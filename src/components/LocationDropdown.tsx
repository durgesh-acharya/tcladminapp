import React from 'react';

type Location = {
  locations_id: number;
  locations_name: string;
};

type Props = {
  locations: Location[];
  selectedId: number | null;
  onChange: (id: number | null) => void;
};

const LocationDropdown: React.FC<Props> = ({ locations, selectedId, onChange }) => {
  return (
    <select
      value={selectedId ?? ''}
      onChange={(e) => {
        const value = e.target.value;
        onChange(value ? parseInt(value) : null);
      }}
      className="p-2 border rounded-md shadow-sm"
    >
      <option value="">Select a Destination</option>
      {locations.map((location) => (
        <option key={location.locations_id} value={location.locations_id}>
          {location.locations_name}
        </option>
      ))}
    </select>
  );
};

export default LocationDropdown;
