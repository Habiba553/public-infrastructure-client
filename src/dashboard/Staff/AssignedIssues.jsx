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

    const token =
      localStorage.getItem("access-token");

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

        if (
          a.priority === "high" &&
          b.priority !== "high"
        ) {
          return -1;
        }

        if (
          a.priority !== "high" &&
          b.priority === "high"
        ) {
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

  const handleStatusChange = async (
    id,
    newStatus
  ) => {

    const token =
      localStorage.getItem("access-token");

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

      const updatedIssues =
        issues.map(issue => {

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

  const filteredIssues =
    issues.filter(issue => {

      const statusMatch =
        !statusFilter ||
        issue.status === statusFilter;

      const priorityMatch =
        !priorityFilter ||
        issue.priority === priorityFilter;

      return (
        statusMatch &&
        priorityMatch
      );
    });

  return (

    <div className="p-6">

      <h1 className="text-5xl font-bold mb-10">

        Assigned Issues

      </h1>

      {/* FILTERS */}

      <div className="flex flex-wrap gap-4 mb-8">

        <select
          className="select select-bordered"
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >

          <option value="">
            All Status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="in-progress">
            In Progress
          </option>

          <option value="working">
            Working
          </option>

          <option value="resolved">
            Resolved
          </option>

          <option value="closed">
            Closed
          </option>

        </select>

        <select
          className="select select-bordered"
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
        >

          <option value="">
            All Priority
          </option>

          <option value="high">
            High
          </option>

          <option value="normal">
            Normal
          </option>

        </select>

      </div>

      <div className="overflow-x-auto bg-white rounded-3xl shadow-xl">

        <table className="table">

          <thead>

            <tr>

              <th>Image</th>

              <th>Title</th>

              <th>Priority</th>

              <th>Status</th>

              <th>Change Status</th>

            </tr>

          </thead>

          <tbody>

            {
              filteredIssues.map(issue => (

                <tr key={issue._id}>

                  <td>

                    <img
                      src={issue.image}
                      alt=""
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                  </td>

                  <td>

                    <div>

                      <h2 className="font-bold">

                        {issue.title}

                      </h2>

                      <p className="text-sm text-gray-500">

                        {issue.location}

                      </p>

                    </div>

                  </td>

                  <td>

                    <div
                      className={`badge ${
                        issue.priority === "high"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >

                      {issue.priority}

                    </div>

                  </td>

                  <td>

                    <div
                      className={`badge ${
                        issue.status === "resolved"
                          ? "badge-success"
                          : issue.status === "closed"
                          ? "badge-neutral"
                          : "badge-info"
                      }`}
                    >

                      {issue.status}

                    </div>

                  </td>

                  <td>

                    {
                      issue.status !== "closed" && (

                        <select
                          className="select select-bordered"
                          defaultValue=""
                          onChange={(e) =>
                            handleStatusChange(
                              issue._id,
                              e.target.value
                            )
                          }
                        >

                          <option disabled value="">
                            Select
                          </option>

                          {
                            getNextStatus(
                              issue.status
                            ).map(status => (

                              <option
                                key={status}
                                value={status}
                              >

                                {status}

                              </option>
                            ))
                          }

                        </select>

                      )
                    }

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AssignedIssues;