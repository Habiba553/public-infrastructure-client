import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const AllIssues = () => {

  const [issues, setIssues] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:5000/issues')
      .then(res => {
        setIssues(res.data);
      });

  }, []);

  return (

    <div className="max-w-7xl mx-auto py-20">

      <h1 className="text-5xl font-bold text-center mb-16">
        All Issues
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

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
                  Category: {issue.category}
                </p>

                <p>
                  Status: {issue.status}
                </p>

                <p>
                  Priority: {issue.priority}
                </p>

                <p>
                  Upvotes: {issue.upvotes}
                </p>
                <Link
  to={`/issue-details/${issue._id}`}
  className="btn btn-primary mt-4"
>
  View Details
</Link>
              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default AllIssues;