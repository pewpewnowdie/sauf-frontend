// SearchIssues.jsx
import { useState } from "react";
import axios from "axios";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import IssueTable from "./IssueTable";

export default function SearchIssues() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/issues`,
        { params: { query: search } }
      );

      setData(response.data.result || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />

      <div className="flex flex-1">
        <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 flex-shrink-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">Sidebar</p>
        </aside>

        <main className="flex-1 p-6 space-y-6">
          {/* Search Section */}
          <div className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <Input
                type="text"
                placeholder="Search issues..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="flex items-center gap-1"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Results */}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && <IssueTable issues={data} />}
        </main>
      </div>
    </div>
  );
}
