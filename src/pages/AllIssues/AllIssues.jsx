import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const AllIssues = () => {

  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('');
  useEffect(() => {

    axios.get(
  
      `http://localhost:5000/issues?search=${search}&category=${category}&status=${status}&sort=${sort}`
  
    )
    .then(res => {
  
      setIssues(res.data);
    });
  
  }, [search, category, status, sort]);

  return (

    <div className="max-w-7xl mx-auto py-20">

      <h1 className="text-5xl font-bold text-center mb-16">
        All Issues
      </h1>
      <div className="grid md:grid-cols-4 gap-4 mb-10">

{/* SEARCH */}
<input
  type="text"
  placeholder="Search issues..."
  className="input input-bordered w-full"
  onChange={(e) => setSearch(e.target.value)}
/>



{/* CATEGORY */}
<select
  className="select select-bordered w-full"
  onChange={(e) => setCategory(e.target.value)}
>

  <option value="">
    All Categories
  </option>

  <option value="Road">
    Road
  </option>

  <option value="Water">
    Water
  </option>

  <option value="Electricity">
    Electricity
  </option>

  <option value="Garbage">
    Garbage
  </option>

</select>



{/* STATUS */}
<select
  className="select select-bordered w-full"
  onChange={(e) => setStatus(e.target.value)}
>

  <option value="">
    All Status
  </option>

  <option value="pending">
    Pending
  </option>

  <option value="resolved">
    Resolved
  </option>

  <option value="in-progress">
    In Progress
  </option>

</select>



{/* SORT */}
<select
  className="select select-bordered w-full"
  onChange={(e) => setSort(e.target.value)}
>

  <option value="">
    Default Sort
  </option>

  <option value="newest">
    Newest
  </option>

  <option value="upvotes">
    Most Upvotes
  </option>

</select>

</div>
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

              <div className="badge badge-warning">
  {issue.priority}
</div>
<div className="badge badge-info">
  {issue.status}
</div>
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

        {
  issues.length === 0 && (

    <div className="text-center py-20">

      <h2 className="text-3xl font-bold">
        No Issues Found
      </h2>

    </div>
  )
}
      </div>

    </div>
  );
};

export default AllIssues;