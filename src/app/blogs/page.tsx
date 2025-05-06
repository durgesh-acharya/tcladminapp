"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Blog {
  blogs_id: number;
  blogs_title: string;
  blogs_content: string;
  blogs_imageurl: string;
  blogs_datetime: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://103.168.18.92/api/blogs'); 
        const data = await res.json();

        if (data.status) {
          setBlogs(data.data);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError("Something went wrong while fetching blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-end mb-6">
        <Link href="/blogs/write">
          <button className="bg-black text-white font-semibold py-2 px-4 rounded">
            Write a Blog
          </button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.blogs_id} className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <Image 
              src={`http://103.168.18.92${blog.blogs_imageurl}`} 
              alt={blog.blogs_title} 
              className="w-full h-48 object-cover"
              width={500}
              height={300}
            />
            <div className="p-6">
              <h6 className='text-md text-gray-600 mb-4'>
                {new Date(blog.blogs_datetime).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
              </h6>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{blog.blogs_title}</h2>
              <p className="text-gray-600 mb-4">{blog.blogs_content.substring(0, 150)}...</p>
              <Link href={`/blogs/${blog.blogs_id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
