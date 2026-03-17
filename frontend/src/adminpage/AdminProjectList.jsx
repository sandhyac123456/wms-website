import { useEffect, useState } from "react";
import { getAllProjectsAdmin, deleteProject } from "../Service/Operation/projectApi";
import { useNavigate } from "react-router-dom";

const AdminProjectList = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    setLoading(true);
    const res = await getAllProjectsAdmin(token);
    if (res?.projects) {
      setProjects(res.projects);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    await deleteProject(id, token);
    fetchProjects();
  };

  // 🔥 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="w-full px-3 sm:px-6 lg:px-10">

        {/* ✅ HEADER (FIXED RESPONSIVE) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-5 py-2 rounded-xl bg-gray-800 text-white shadow hover:bg-black transition w-full sm:w-auto"
          >
            ← Back
          </button>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Admin Projects
          </h1>

          <button
            onClick={() => navigate("/admin/projects")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto"
          >
            + Add Project
          </button>

        </div>

        {/* NO DATA */}
        {projects.length === 0 ? (
          <div className="text-center text-gray-500 text-base sm:text-lg mt-10">
            No projects found 🚫
          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">

            {projects.map((project) => (
              <div
                key={project._id}
                className="w-full max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >

                {/* IMAGES */}
                <div className="flex overflow-x-auto gap-2 p-2">
                  {project.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img.replace("/upload/", "/upload/w_400,q_auto/")}
                      alt="project"
                      loading="lazy"
                      className="h-28 sm:h-32 w-40 sm:w-44 object-cover rounded"
                    />
                  ))}
                </div>

                <div className="p-4">

                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                    {project.title}
                  </h2>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {project.description}
                  </p>

                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 text-sm mt-2 inline-block hover:underline"
                    >
                      View Project →
                    </a>
                  )}

                  {/* BUTTONS */}
                  <div className="flex justify-between items-center mt-4">

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/projects/edit/${project._id}`)}
                        className="bg-yellow-400 text-white px-3 py-1 text-sm rounded hover:bg-yellow-500"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(project._id)}
                        className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>

                    <span className={`text-xs px-3 py-1 rounded-full ${
                      project.status === "published"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {project.status}
                    </span>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjectList;