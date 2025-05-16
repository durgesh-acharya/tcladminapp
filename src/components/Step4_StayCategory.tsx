import { useEffect, useState } from 'react';

type Category = {
  staycategories_id: number;
  staycategories_name: string;
};

type Props = {
  data: { stayCategory: number | null };
  update: (data: { stayCategory: number | null }) => void;
  next: () => void;
  back: () => void;
};

const Step4_StayCategory = ({ data, update, next, back }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('http://103.168.18.92/api/staycategories/all') // replace with actual API URL
      .then(res => res.json())
      .then(response => {
        if (response.status) {
          setCategories(response.data);
        } else {
          console.error('Failed to fetch stay categories');
        }
      })
      .catch(err => console.error('API error:', err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 4: Select Stay Category</h2>
      <select
        className="w-full border p-2 mb-4"
        value={data.stayCategory ?? ''} // Show empty string if null
        onChange={e => {
          const value = e.target.value;
          update({ stayCategory: value ? parseInt(value) : null });
        }}
      >
        <option value="">Select a category</option>
        {categories.map(cat => (
          <option key={cat.staycategories_id} value={cat.staycategories_id}>
            {cat.staycategories_name}
          </option>
        ))}
      </select>
      <div className="flex justify-between">
        <button onClick={back} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button
          onClick={next}
          disabled={data.stayCategory === null}
          className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step4_StayCategory;
