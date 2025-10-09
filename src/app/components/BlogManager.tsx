'use client';

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch only the current user's blogs
  useEffect(() => {
    fetch('/api/blogs?mine=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs) setBlogs(data.blogs);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = editingId ? 'PUT' : 'POST';
    const endpoint = editingId ? `/api/blogs/${editingId}` : '/api/blogs';

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setForm({ title: '', content: '' });
      setEditingId(null);
      const refreshed = await fetch('/api/blogs?mine=true').then((r) =>
        r.json(),
      );
      setBlogs(refreshed.blogs || []);
    } else {
      console.error(data.error);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const handleEdit = (blog) => {
    setForm({ title: blog.title, content: blog.content });
    setEditingId(blog.id);
  };

  const cancelEdit = () => {
    setForm({ title: '', content: '' });
    setEditingId(null);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Blogs</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {editingId ? 'Update Post' : 'Create Post'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="mb-6 border-b border-gray-200 pb-4">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-700 mt-2 whitespace-pre-wrap">
              {blog.content}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(blog.created_at).toLocaleString()}
            </p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleEdit(blog)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
