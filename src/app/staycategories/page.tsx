'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type StayCategory = {
  staycategories_id: number;
  staycategories_name: string;
};

const StayCategoriesPage: React.FC = () => {
  const [stayCategories, setStayCategories] = useState<StayCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch stay categories from the API
  useEffect(() => {
    const fetchStayCategories = async () => {
      try {
        const response = await fetch('http://103.168.18.92/api/staycategories/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.status) {
          setStayCategories(data.data); // Access the "data" array from the response
        } else {
          console.error('Failed to fetch valid data');
        }
      } catch (error) {
        console.error('Error fetching stay categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStayCategories();
  }, []);

  // Handle deletion of a category
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        // Call delete API here if necessary (currently it's just filtering locally)
        setStayCategories((prev) => prev.filter((category) => category.staycategories_id !== id));
        // Add actual API delete call if required:
        // await fetch(`http://103.168.18.92/api/staycategories/delete/${id}`, { method: 'DELETE' });
      } catch (error) {
        console.error('Error deleting stay category:', error);
      }
    }
  };

  // Render the stay categories or loading state
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stay Categories List</h1>
        <Link
          href="/staycategories/create"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          + Add Stay Category
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Category Name</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {loading ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : stayCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              stayCategories.map((category, index) => (
                <tr
                  key={category.staycategories_id}
                  className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="px-6 py-4 text-left text-sm text-gray-800">
                    {category.staycategories_id}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 font-medium">
                    {category.staycategories_name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/staycategories/edit/${category.staycategories_id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 text-sm rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(category.staycategories_id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-sm rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StayCategoriesPage;
