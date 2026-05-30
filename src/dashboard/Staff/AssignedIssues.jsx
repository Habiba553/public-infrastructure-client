import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AssignedIssues = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    axios.get(
      `http://localhost:5000/assigned-issues/${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      const sorted = res.data.sort((a, b) => {
        if (a.priority === "high" && b.priority !== "high") {
          return -1;
        }
        if (a.priority !== "high" && b.priority === "high") {
          return 1;
        }
        return 0;
      });

      setIssues(sorted);
    });
  }, [user]);

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "pending":
        return ["in-progress"];
      case "in-progress":
        return ["working"];
      case "working":
        return ["resolved"];
      case "resolved":
        return ["closed"];
      default:
        return [];
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("access-token");

    const res = await axios.patch(
      `http://localhost:5000/issues/status/${id}`,
      {
        status: newStatus,
        updatedBy: "Staff"
      },
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Status Updated Successfully"
      });

      const updatedIssues = issues.map(issue => {
        if (issue._id === id) {
          return {
            ...issue,
            status: newStatus
          };
        }
        return issue;
      });

      setIssues(updatedIssues);
    }
  };

  const filteredIssues = issues.filter(issue => {
    const statusMatch = !statusFilter || issue.status === statusFilter;
    const priorityMatch = !priorityFilter || issue.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-base-content bg-base-100 transition-colors duration-300">
      
      {/* Header View Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Assigned <span className="text-[#7C3AED]">Issues</span>
        </h1>
        <p className="text-xs md:text-sm opacity-60 mt-2">
          Manage, track, and update public infrastructure problems allocated to your profile.
        </p>
      </div>

      {/* FILTER CONTROLS TOOLBAR PANEL */}
      <div className="bg-base-200 p-4 rounded-2xl md:rounded-3xl shadow-sm mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:w-auto">
          <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-60 px-1">Filter by Status</label>
          <select
            className="select select-bordered w-full sm:w-56 focus:outline-none focus:border-[#7C3AED] bg-base-100 h-11 text-sm"
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="working">Working</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-xs font-bold uppercase tracking-wider block mb-1.5 opacity-60 px-1">Filter by Priority</label>
          <select
            className="select select-bordered w-full sm:w-56 focus:outline-none focus:border-[#7C3AED] bg-base-100 h-11 text-sm"
            onChange={(e) => setPriorityFilter(e.target.value)}
            value={priorityFilter}
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
          </select>
        </div>
      </div>

      {/* RESPONSIVE TABLE CONTAINER DISPLAY FRAME */}
      {filteredIssues.length === 0 ? (
        <div className="text-center py-16 bg-base-200 rounded-3xl border border-dashed border-base-300">
          <h3 className="text-xl font-bold opacity-60">No Assigned Tasks Found</h3>
          <p className="text-xs opacity-50 mt-1">There are no reports matching your query criteria.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-2xl md:rounded-3xl shadow-md border border-base-200">
          <table className="table w-full border-collapse">
            
            {/* Table Column Headings */}
            <thead className="bg-base-200 text-base-content/80 text-sm font-bold border-b border-base-300">
              <tr>
                <th className="py-4 px-6 rounded-tl-2xl">Image</th>
                <th className="py-4 px-6">Issue Context</th>
                <th className="py-4 px-6 text-center">Priority</th>
                <th className="py-4 px-6 text-center">Current Status</th>
                <th className="py-4 px-6 text-center rounded-tr-2xl">Action Trigger</th>
              </tr>
            </thead>

            {/* Table Dynamic Content Rows */}
            <tbody className="divide-y divide-base-200 text-sm">
              {filteredIssues.map(issue => (
                <tr key={issue._id} className="hover:bg-base-200/40 transition-colors duration-150">
                  
                  {/* Thumbnail Image Cell */}
                  <td className="py-4 px-6">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-xl overflow-hidden ring-1 ring-base-300 shadow-sm bg-base-300">
                        <img
                          src={issue.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                          alt={issue.title || "Issue asset"}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </td>

                  {/* Context Title & Location Info Cell */}
                  <td className="py-4 px-6 min-w-[200px]">
                    <div className="space-y-1">
                      <h2 className="font-bold text-base tracking-tight line-clamp-1">
                        {issue.title}
                      </h2>
                      <p className="text-xs opacity-60 flex items-center gap-1 font-medium">
                        <span>📍</span> {issue.location || "Unspecified location"}
                      </p>
                    </div>
                  </td>

                  {/* Priority Indicator Badge Cell */}
                  <td className="py-4 px-6 text-center">
                    <span className={`badge border-none font-extrabold text-white px-3 py-2 text-xs uppercase rounded-lg tracking-wide shadow-sm ${
                      issue.priority === "high" ? "bg-red-500" : "bg-amber-500"
                    }`}>
                      {issue.priority}
                    </span>
                  </td>

                  {/* Status Indicator Badge Cell */}
                  <td className="py-4 px-6 text-center">
                    <span className={`badge border-none font-extrabold text-white px-3 py-2 text-xs uppercase rounded-lg tracking-wide shadow-sm ${
                      issue.status === "resolved" 
                        ? "bg-green-500" 
                        : issue.status === "closed" 
                        ? "bg-gray-600" 
                        : issue.status === "working" || issue.status === "in-progress"
                        ? "bg-blue-500"
                        : "bg-orange-500"
                    }`}>
                      {issue.status}
                    </span>
                  </td>

                  {/* Actions Dropdown Toggle Selection Menu Cell */}
                  <td className="py-4 px-6 text-center min-w-[160px]">
                    {issue.status !== "closed" ? (
                      <select
  className="select select-bordered select-sm w-full max-w-[140px] focus:outline-none focus:border-[#7C3AED] bg-base-100 font-semibold text-xs rounded-xl cursor-pointer"
  value=""
  onChange={(e) =>
    handleStatusChange(
      issue._id,
      e.target.value
    )
  }
>
                        <option disabled value="">
                          Advance state
                        </option>
                        {getNextStatus(issue.status).map(status => (
                          <option key={status} value={status} className="font-semibold capitalize">
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs font-bold uppercase tracking-wider opacity-40 flex items-center justify-center gap-1">
                        ✅ Task Finalized
                      </span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
};

export default AssignedIssues;