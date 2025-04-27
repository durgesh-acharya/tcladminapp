'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import StayCategoryForm from "@/components/StayCategoryForm";

const EditStayCategoryPage = () => {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;  // Get the category ID from the URL params

  const [initialData, setInitialData] = useState<{
    categoryName: string;
    isActive: 1 | 0;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  // Fetch data by category ID
  useEffect(() => {
    if (categoryId) {
      fetch(`http://103.168.18.92/api/staycategories/${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status && data.data && data.data.length > 0) {
            const category = data.data[0]; // Get the category by ID
            setInitialData({
              categoryName: category.staycategories_name,
              isActive: 1, // Assuming active by default, you can change this based on actual logic
            });
          } else {
            alert("Category not found");
            router.push("/staycategories");
          }
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
          alert("Failed to load category data");
        })
        .finally(() => setLoading(false));
    }
  }, [categoryId, router]);

  const handleFormSubmit = async (data: { categoryName: string; isActive: 1 | 0 }) => {
    try {
      const response = await fetch(`http://103.168.18.92/api/staycategories/update/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          staycategories_name: data.categoryName,
          is_active: data.isActive, // Adjust to match your API's expected keys
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Category updated:", result);
        alert("Category updated successfully!");
        router.push("/staycategories"); // Redirect after update
      } else {
        console.error("Error:", result.message);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during category update:", error);
      alert("Something went wrong while submitting the form.");
    }
  };

  if (loading) return <div>Loading category data...</div>;

  return (
    <div className="p-4">
      <StayCategoryForm onSubmit={handleFormSubmit} initialData={initialData} />
    </div>
  );
};

export default EditStayCategoryPage;
