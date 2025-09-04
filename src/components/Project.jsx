import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Project() {
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key")
  const saufQL = key ? `project=${key}` : null;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!saufQL) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/issues`, {
          params: { query: saufQL }
        }
        );

        setData(response.data.result || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [saufQL]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
        <span className="ml-2 text-gray-600">Loading Projects...</span>
      </div>
    );

  if (error) return <p className="text-red-500">Error: {error}</p>;

  if (!data.length) return <p>No Issues found for project: {key}</p>;

  return (
    <div className="text-gray-600 space-y-2">
      {data.map((item, index) => (
        <div key={index} className="p-2 border rounded bg-gray-50">
          {JSON.stringify(item)}
        </div>
      ))}
    </div>
  );
}
