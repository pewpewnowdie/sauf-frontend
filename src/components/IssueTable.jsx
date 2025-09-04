// components/IssueTable.jsx
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Circle, Bug, CheckCircle2 } from "lucide-react";

export default function IssueTable({ issues }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "in progress":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "closed":
      case "done":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getIssueIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "BUG":
        return <Bug className="w-4 h-4 text-red-500" />;
      case "TASK":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!issues.length) {
    return <p className="text-gray-500 dark:text-gray-400">No issues found.</p>;
  }

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="px-4 py-2 font-medium">Key</th>
            <th className="px-4 py-2 font-medium">Summary</th>
            <th className="px-4 py-2 font-medium">Type</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, index) => (
            <tr
              id={issue.key || "UNKNOWN"}
              className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              {/* Key */}
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                  {issue.key || "UNKNOWN"}
              </td>

              {/* Summary */}
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                {issue.title || "Untitled Issue"}
              </td>

              {/* Type */}
              <td className="px-4 py-2">{getIssueIcon(issue.type)}</td>

              {/* Status */}
              <td className="px-4 py-2">
                <Badge className={`${getStatusColor(issue.status)}`}>
                  {issue.status || "Unknown"}
                </Badge>
              </td>

              {/* Assignee */}
              <td className="px-4 py-2">
                {issue.assignee || "Unkown"} 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
