import { useEffect, useState } from "react";

import axios from "axios";

import Swal from "sweetalert2";

const ManageIssues = () => {

  const [issues, setIssues] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:5000/admin/issues')
      .then(res => {
        setIssues(res.data);
      });

  }, []);

  const handleStatusChange = async (id, status) => {

    const res = await axios.patch(
      `http://localhost:5000/issues/status/${id}`,
      { status }
    );

    if (res.data.modifiedCount > 0) {

      Swal.fire({
        icon: 'success',
        title: 'Status Updated'
      });

      location.reload();
    }
  };

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        Manage Issues
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {
          issues.map(issue => (

            <div
              key={issue._id}
              className="card bg-base-100 shadow-xl"
            >

              <figure>

                <img
                  src={issue.image}
                  alt=""
                  className="h-56 w-full object-cover"
                />

              </figure>

              <div className="card-body">

                <h2 className="card-title">
                  {issue.title}
                </h2>

                <p>
                  {issue.location}
                </p>

                <p>
                  Status: {issue.status}
                </p>

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() =>
                      handleStatusChange(
                        issue._id,
                        'resolved'
                      )
                    }
                    className="btn btn-success btn-sm"
                  >
                    Resolve
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(
                        issue._id,
                        'in-progress'
                      )
                    }
                    className="btn btn-warning btn-sm"
                  >
                    In Progress
                  </button>

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default ManageIssues;