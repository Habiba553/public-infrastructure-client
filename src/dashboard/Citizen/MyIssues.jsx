import { useEffect, useState } from "react";

import axios from "axios";

import useAuth from "../../hooks/useAuth";

const MyIssues = () => {

  const { user } = useAuth();

  const [issues, setIssues] = useState([]);

  useEffect(() => {

    axios.get(
      `http://localhost:5000/my-issues/${user.email}`
    )
    .then(res => {
      setIssues(res.data);
    });

  }, [user]);

  return (

    <div>

      <h1 className="text-4xl font-bold mb-10">
        My Issues
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

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
                  {issue.category}
                </p>

                <p>
                  Status: {issue.status}
                </p>

                <p>
                  Priority: {issue.priority}
                </p>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default MyIssues;