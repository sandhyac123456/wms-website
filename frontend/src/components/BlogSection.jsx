import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllBlogs } from "../Service/Operation/blogApi";
import { getAllCategories } from "../Service/Operation/categoryApi";


const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, page]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
  fetchRecentBlogs();
}, [selectedCategory]);

  const fetchCategories = async () => {
    const response = await getAllCategories();

    console.log("Categories API response",response);
    if (response?.categories) {
      setCategories(response.categories);
    }
  };

  const fetchRecentBlogs = async () => {
  try {
    const response = await getAllBlogs(selectedCategory, 1); // no category
    if (response?.blogs) {
      setRecentBlogs(response.blogs.slice(0, 5));
    }
  } catch (error) {
    console.log(error);
  }
};

  const fetchBlogs = async () => {
    setLoading(true);
    console.log("Selected Category:", selectedCategory);
    try {
      const response = await getAllBlogs(selectedCategory, page);
      console.log("Blogs received:", response?.blogs);

      if (response?.blogs) {
        setBlogs(response.blogs);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading blogs...</p>
      </div>
    );
  }



const featuredBlog = blogs.length > 0 ? blogs[0] : null;

  return (
  <div className="bg-gradient-to-br from-white via-sky-50 to-cyan-100 min-h-screen">

    {/* HEADER */}
    <div className="bg-white py-12 sm:py-16 border-b">
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
          Blog & Career Insights
        </h1>
        <p className="text-gray-500 mt-3 text-sm sm:text-base">
          Latest updates, career advice and industry news
        </p>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT SECTION */}
      <div className="lg:col-span-2 space-y-8">
        {blogs.length === 0 && (
  <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-500">
    No blogs available.
  </div>
)}

        {/* FEATURED BLOG */}
        {featuredBlog && (
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

            <img
              src={featuredBlog.image}
              alt={featuredBlog.title}
              className="w-full h-52 sm:h-64 md:h-72 object-cover hover:scale-105 transition duration-500"
            />

            <div className="p-6 sm:p-8">
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                {featuredBlog.category?.name}
              </span>

              <h2 className="text-xl sm:text-2xl font-bold mt-4 text-gray-800">
                {featuredBlog.title}
              </h2>

              <p className="text-gray-600 mt-3 text-sm sm:text-base">
                {featuredBlog.description}
              </p>

              <Link
                to={`/blog/${featuredBlog.slug}`}
                className="inline-block mt-5 text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                Read Full Article →
              </Link>
            </div>
          </div>
        )}

        {/* OTHER BLOGS */}
        {blogs.slice(1).map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col md:flex-row overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full md:w-56 h-48 object-cover"
            />

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <span className="text-xs text-blue-600 font-medium">
                  {blog.category?.name}
                </span>

                <h3 className="text-lg font-semibold mt-2 text-gray-800">
                  {blog.title}
                </h3>

                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {blog.description}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                <span>
                  {new Date(blog.createdAt).toLocaleDateString()} • {blog.views} views
                </span>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="text-blue-600 font-medium hover:text-blue-800 transition"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* PAGINATION */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-10">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-white shadow hover:bg-blue-600 hover:text-white transition disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg transition ${
                page === i + 1
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white shadow hover:bg-blue-600 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-white shadow hover:bg-blue-600 hover:text-white transition disabled:opacity-40"
          >
            Next
          </button>
        </div>

      </div>

      {/* SIDEBAR */}
      <div className="space-y-6 lg:sticky lg:top-24 h-fit">

        {/* CATEGORIES */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Categories
          </h4>

          <div className="flex flex-wrap gap-2">
            <span
              onClick={() => setSearchParams({})}
              className={`text-xs px-3 py-1 rounded-full cursor-pointer transition ${
                !selectedCategory
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-blue-600 hover:text-white"
              }`}
            >
              All
            </span>

            {categories.map((cat, index) => (
              <span
                key={index}
                onClick={() =>
                  setSearchParams({ category: cat._id })
                }
                className={`text-xs px-3 py-1 rounded-full cursor-pointer transition ${
                  selectedCategory === cat._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        {/* RECENT POSTS */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Recent Posts
          </h4>

          <div className="space-y-4">
{recentBlogs.map((blog)=>(
                  <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="block hover:text-blue-600 transition"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-700 line-clamp-1">
                    {blog.title}
                  </p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>
);
};

export default BlogSection;