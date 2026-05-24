import { useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const IssueDetails = () => {

  const { id } = useParams();
  const { user } = useAuth();
  const [issue, setIssue] = useState({});

  useEffect(() => {

    axios.get(
      `http://localhost:5000/issues/${id}`
    )
    .then(res => {
      setIssue(res.data);
    });

  }, [id]);

  const handleUpvote = async () => {

    const res = await axios.patch(
      `http://localhost:5000/issues/upvote/${id}`,
      {
        email: user.email
      }
    );
  
    if (res.data.modifiedCount > 0) {
  
      Swal.fire({
        icon: 'success',
        title: 'Upvoted Successfully'
      });
  
      setIssue({
        ...issue,
        upvotes: issue.upvotes + 1
      });
    }
    if (res.data.message === 'already upvoted') {

      return Swal.fire({
        icon: 'error',
        title: 'You already upvoted this issue'
      });
    }
  };
  return (

    <div className="max-w-5xl mx-auto py-20">

      <img
        src={issue.image}
        alt=""
        className="w-full h-[500px] object-cover rounded-xl"
      />

      <div className="mt-10 space-y-5">

        <h1 className="text-5xl font-bold">
          {issue.title}
        </h1>

        <p className="text-xl">
          {issue.description}
        </p>

        <p>
          Category: {issue.category}
        </p>

        <p>
          Location: {issue.location}
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

        <button
  onClick={handleUpvote}
  className="btn btn-primary"
>
  Upvote
</button>
      </div>

    </div>
  );
};

export default IssueDetails;