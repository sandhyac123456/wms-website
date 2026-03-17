import { useState } from "react";
import { createProject } from "../Service/Operation/projectApi";
import { useNavigate } from "react-router-dom";

const AdminProjects = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectLink: "",
    status: "draft"
  });

  const [images, setImages] = useState([]);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("projectLink", formData.projectLink);
      data.append("status", formData.status);

      images.forEach((img) => {
        data.append("images", img);
      });

      const token = localStorage.getItem("token");

      await createProject(data, token);

      // reset
      setFormData({
        title: "",
        description: "",
        projectLink: "",
        status: "draft"
      });
      setImages([]);

      navigate("/admin/projects-list");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        {/* HEADER */}
        <div className="relative flex items-center justify-between mb-6">

          <button
            onClick={() => navigate("/admin/projects-list")}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            ← Back
          </button>

          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl font-bold text-gray-800">
            Add Project
          </h2>

          <div></div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Link */}
          <input
            type="text"
            name="projectLink"
            placeholder="Project Link (https://...)"
            value={formData.projectLink}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          {/* Image Upload */}
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border p-2 rounded-lg bg-white"
          />

          {/* Image Preview 🔥 */}
          {images.length > 0 && (
            <div className="flex gap-3 flex-wrap mt-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="h-20 w-20 object-cover rounded"
                />
              ))}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">

            <button
              type="button"
              onClick={() => navigate("/admin/projects-list")}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 w-1/2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-1/2"
            >
              Add Project
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AdminProjects;