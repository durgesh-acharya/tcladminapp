'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Blog {
  blogs_id: number;
  blogs_title: string;
  blogs_content: string;
  blogs_datetime?: string;
  blogs_imageurl?: string;
}

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setError('Blog ID not found.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://103.168.18.92/api/blogs/${id}`);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const result = await res.json();
        console.log('API Response:', result);

        if (result.status && result.data) {
            setBlog(result.data[0]);
        } else {
          setError('Blog not found.');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Fetch error:', err.message);
          } else {
            console.error('Unexpected error', err);
          }
          setError('Failed to fetch blog data.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading blog...</div>;
  }

  if (error || !blog) {
    return <div className="text-center mt-10 text-red-600">{error || 'Blog not found.'}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {blog.blogs_imageurl && (
        <div className="relative w-full h-64 md:h-96 mb-6 rounded overflow-hidden">
          <Image
            src={`http://103.168.18.92${blog.blogs_imageurl}`}
            alt={blog.blogs_title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
        {blog.blogs_title}
      </h1>

      {blog.blogs_datetime && (
        <p className="text-sm text-gray-500 mb-6">
          {new Date(blog.blogs_datetime).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      )}

      <article className="prose prose-lg max-w-none text-gray-800">
        {blog.blogs_content}
      </article>
    </div>
  );
}
