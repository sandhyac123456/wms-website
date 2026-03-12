import React, { useState,useEffect } from "react";
import { createBlog, getSingleBlogAdmin, updateBlog } from "../Service/Operation/blogApi";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, getAllCategories } from "../Service/Operation/categoryApi";

const BlogPostForm = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const token = localStorage.getItem("adminToken");
const [formData, setFormData] = useState({
  title: "",
  category: "",
  description: "",
  content: "",
  keywords: "",
  image: "",
  status: "draft",
});

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
  if (id) {
    fetchBlog();
  }
}, [id]);

useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  const res = await getAllCategories();
  if (res?.categories) {
    setCategories(res.categories);
  }
};

const fetchBlog = async () => {
  try {
    const res = await getSingleBlogAdmin(id, token);
   if (res?.blog) {
 setFormData({
  title: res.blog.title,
  category: res.blog.category?._id || res.blog.category,
  description: res.blog.description,
  content: res.blog.content,
  keywords: res.blog.keywords?.join(", ") || "",
  image: res.blog.image,
  status: res.blog.status,
});
}
  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (statusType) => {
  try {

    setLoading(true);

    let finalCategory = formData.category;

    // 🔥 If dropdown empty but new category typed
    if (!finalCategory && newCategory.trim()) {

      const categoryRes = await createCategory(
        { name: newCategory.trim() },
        token
      );

      if (!categoryRes?.success) {
        alert(categoryRes?.message || "Category creation failed");
        setLoading(false);
        return;
      }

      finalCategory = categoryRes.category._id;
    }

    // ❌ If still empty
    if (!finalCategory) {
      alert("Please select or create a category");
      setLoading(false);
      return;
    }

    const form = new FormData();

    form.append("title", formData.title);
    form.append("category", finalCategory);
    form.append("description", formData.description);
    form.append("content", formData.content);
    form.append("status", statusType);
    form.append("keywords", formData.keywords);

    if (formData.image && typeof formData.image !== "string") {
      form.append("image", formData.image);
    }

    let res;

    if (id) {
      res = await updateBlog(id, form, token);
    } else {
      res = await createBlog(form, token);
    }

    if (res?.success) {
      navigate("/admin/blogs");
    }

  } catch (error) {
    console.log(error);
  }

  setLoading(false);
};

  return (
  <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-cyan-100 py-8 sm:py-12 md:py-16 px-4 sm:px-6">

    {/* Back Button */}
    <div className="max-w-4xl mx-auto mb-6">
      <button
        onClick={() => navigate("/admin/blogs")}
        className="px-5 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition-all duration-300"
      >
        ← Back
      </button>
    </div>

    {/* Card */}
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl">

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent">
        {id ? "Edit Blog" : "Create New Blog"}
      </h2>

      <div className="space-y-6">

        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

       {/* Category */}
<div>
  <label className="block mb-2 text-sm font-semibold text-gray-600">
    Category
  </label>

  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="w-full border border-gray-300 p-4 rounded-xl"
  >
    <option value="">Select Category</option>
    {categories.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>

  {/* Add New Category */}
 <input
  type="text"
  placeholder="Or add new category"
  className="mt-3 w-full border border-gray-300 p-3 rounded-xl"
  onChange={(e) => setNewCategory(e.target.value)}
/>
</div>

        {/* Image */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.files[0],
              })
            }
            className="w-full border border-gray-300 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
          />

          {formData.image && (
            <div className="mt-4 overflow-hidden rounded-xl">
              <img
                src={
                  typeof formData.image === "string"
                    ? formData.image
                    : URL.createObjectURL(formData.image)
                }
                alt="preview"
                className="w-full h-48 sm:h-56 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Short Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            rows="3"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Full Blog Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            rows="8"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            SEO Keywords (comma separated)
          </label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="react, web development, javascript"
            className="w-full border border-gray-300 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
          />
          <p className="text-xs text-gray-400 mt-1">
            Separate keywords with comma
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t">

          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white rounded-xl shadow hover:bg-gray-700 transition-all duration-300"
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("published")}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            {loading
              ? id
                ? "Updating..."
                : "Publishing..."
              : id
              ? "Update Blog"
              : "Publish"}
          </button>

        </div>
      </div>
    </div>
  </div>
);
};

export default BlogPostForm;