'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const WriteBlog = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('blogs_title', formData.title);
    data.append('blogs_content', formData.content);
    if (imageFile) {
      data.append('image', imageFile); // name should match multer's `.single('image')`
    }

    try {
      const response = await fetch('http://103.168.18.92/api/blogs/create', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      console.log('Blog created:', result);
      router.push('/blogs');
      
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Write a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imagePreview && (
             <div className="mt-4 h-40 w-full relative rounded border overflow-hidden">
             <Image
               src={imagePreview}
               alt="Selected Preview"
               fill
               className="object-cover"
               unoptimized
             />
           </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            rows={6}
            value={formData.content}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default WriteBlog;
