import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogsAdmin, deleteBlog } from "../Service/Operation/blogApi";
import toast from "react-hot-toast";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAllBlogsAdmin(token);
      if (res?.blogs) setBlogs(res.blogs);
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      const res = await deleteBlog(id, token);

      if (res?.success) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      }
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 py-10 px-4 sm:px-6 lg:px-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="px-6 py-2 rounded-xl bg-gray-800 text-white font-medium shadow-md hover:bg-black hover:shadow-lg transition-all duration-300"
        >
          ← Back
        </button>

       <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center flex-1 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
          Manage Blogs
        </h2>

        <Link to="/admin/blogs/create">
          <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300">
            + Add New
          </button>
        </Link>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto space-y-6">

        {loading ? (
          <div className="bg-white p-16 rounded-3xl shadow-lg text-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl shadow-lg text-center">
            <p className="text-lg font-medium text-gray-600">
              No blogs created yet.
            </p>
            <p className="text-sm mt-2 text-gray-400">
              Start by creating your first blog 🚀
            </p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row gap-6"
            >

              {/* IMAGE */}
            <div className="w-full md:w-56 overflow-hidden rounded-2xl">
                <img
                  src={blog.image}
                  alt={blog.title}
                className="w-full h-56 md:h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 capitalize">
                  {blog.category?.name}
                </p>

                <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                  {blog.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-500">

                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                      blog.status === "published"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {blog.status}
                  </span>

                  <span>👁 {blog.views} views</span>

                  <span>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex md:flex-col gap-3 justify-end">

                <button
                  onClick={() =>
                    navigate(`/admin/blogs/edit/${blog._id}`)
                  }
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium shadow hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  disabled={deletingId === blog._id}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {deletingId === blog._id ? "Deleting..." : "Delete"}
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;