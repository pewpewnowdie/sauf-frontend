import { useState } from "react";
import Header from "./Header";
import { ChartBar, FileText, Users, Settings } from "lucide-react";
import ListProjects from "./ListProjects";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarItems = [
    { title: "Dashboard", icon: <ChartBar className="h-5 w-5" />, id: "dashboard" },
    { title: "Team", icon: <Users className="h-5 w-5" />, id: "team" },
    { title: "Settings", icon: <Settings className="h-5 w-5" />, id: "settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <Header />

      {/* Main body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 flex flex-col gap-4 flex-shrink-0">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 p-2 rounded-md w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                activeTab === item.id ? "bg-gray-200 dark:bg-gray-700 font-semibold" : "font-normal"
              }`}
            >
              {item.icon}
              {item.title}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {activeTab === "dashboard" && (
            <ListProjects/>
          )}

          {activeTab === "team" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Alice", "Bob", "Charlie", "David"].map((member) => (
                <div
                  key={member}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    {member[0]}
                  </div>
                  <div>{member}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h2 className="font-semibold text-lg mb-2">Settings</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Dashboard configuration and preferences go here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
