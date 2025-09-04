import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Header from "./Header";

export default function ListProjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/projects`
        );
        setData(response.data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
        <span className="ml-2 text-gray-600">Loading Projects...</span>
      </div>
    );

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-6">Projects</h1>

        {data.length === 0 ? (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-500">
            No projects found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((project) => (
              <div
                key={project.key}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <Link to={`/project?key=${project.key}`} className="text-lg font-semibold">{project.name}</Link>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${project.status === "NS"
                      ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      : project.status === "IP"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                      }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-col justify-between flex-1 overflow-hidden">
                  <div className="overflow-hidden">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                      {project.description || "No description provided."}
                    </p>
                  </div>
                  { /* Add Buttons here */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
