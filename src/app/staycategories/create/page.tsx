'use client';

import StayCategoryForm from '@/components/StayCategoryForm';
import { useRouter } from "next/navigation";

const CreateStayCategoryPage = () => {
  const router = useRouter();

  const handleFormSubmit = async (data: { categoryName: string; isActive: 1 | 0 }) => {
    try {
      const response = await fetch('http://103.168.18.92/api/staycategories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staycategories_name: data.categoryName,
          is_active: data.isActive, // Adjust to match your API's expected keys
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Category created:', result);
        alert('Category created successfully!');
        router.push("/staycategories"); // Redirect after creating the category
      } else {
        console.error('Error:', result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Request failed:', error);
      alert('Something went wrong while submitting the form.');
    }
  };

   // Set default initial data for creating a new category
   const initialFormData: { categoryName: string; isActive: 0 | 1 } = {
    categoryName: "",
    isActive: 1, // Default value to Active
  };

  return (
    <div className="p-4">
      {/* Pass initial data (empty by default) to the form */}
      <StayCategoryForm onSubmit={handleFormSubmit} initialData={initialFormData} />
    </div>
  );
};

export default CreateStayCategoryPage;
