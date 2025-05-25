import { useState } from 'react';
import Image from 'next/image';
type Props = {
  data: {
    title: string;
    actualPrice: string;
    discountedPrice: string;
    isActive: 'yes' | 'no';
    imageFile: File | null; // Added imageFile to the data prop
  };
  update: (data: Partial<Props['data']>) => void;
  back: () => void;
  submit: () => void;
};

const Step5_Pricing = ({ data, update, back, submit }: Props) => {
  // State for image preview (optional)
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Preview the image (optional, you can remove if not needed)
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      update({ imageFile: file });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 5: Title, Pricing & Status</h2>

      {/* Title input */}
      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2 mb-4"
        value={data.title}
        onChange={(e) => update({ title: e.target.value })}
      />

      {/* Actual price input */}
      <input
        type="text"
        placeholder="Actual Price"
        className="w-full border p-2 mb-4"
        value={data.actualPrice}
        onChange={(e) => update({ actualPrice: e.target.value })}
      />

      {/* Discounted price input */}
      <input
        type="text"
        placeholder="Discounted Price"
        className="w-full border p-2 mb-4"
        value={data.discountedPrice}
        onChange={(e) => update({ discountedPrice: e.target.value })}
      />

      {/* Image upload */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          className="w-full border p-2 mb-4"
          onChange={handleImageChange}
        />
        {/* Show image preview */}
        {imagePreview && (
  <Image
    src={imagePreview}
    alt="Image preview"
    width={128}
    height={128}
    className="object-cover"
  />
)}
      </div>

      {/* Is Active radio buttons */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Is Active?</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              value="yes"
              checked={data.isActive === 'yes'}
              onChange={() => update({ isActive: 'yes' })}
              className="mr-2"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={data.isActive === 'no'}
              onChange={() => update({ isActive: 'no' })}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      {/* Buttons for Back and Submit */}
      <div className="flex justify-between">
        <button onClick={back} className="bg-gray-500 text-white px-4 py-2 rounded">
          Back
        </button>
        <button
          onClick={submit}
          disabled={!data.actualPrice || !data.discountedPrice || !data.imageFile}
          className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step5_Pricing;
