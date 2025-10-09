'use client';

import { useEffect, useState } from 'react';

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  profiles: {
    full_name: string | null;
  } | null;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading)
    return <p className="text-center mt-8 text-gray-600">Loading blogs...</p>;

  if (error)
    return (
      <p className="text-center mt-8 text-red-600">
        Error loading blogs: {error}
      </p>
    );

  if (blogs.length === 0)
    return (
      <p className="text-center mt-8 text-gray-500">
        No blogs found. Be the first to create one!
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>
      <ul className="space-y-6">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="border border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {blog.content}
            </p>
            <div className="text-sm text-gray-500 flex justify-between gap-2">
              <span>By: {blog.profiles?.full_name ?? 'Unknown author'}</span>
              <span>{new Date(blog.created_at).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
