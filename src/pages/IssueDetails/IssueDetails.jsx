import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useParams,
  Link,
  useNavigate
} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [issue, setIssue] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:5000/issues/${id}`)
      .then(res => {
        setIssue(res.data);
      });
  }, [id]);

  const handleUpvote = async () => {

    if (!user) {
      return Swal.fire({
        icon: 'error',
        title: 'Please login first'
      });
    }
  
    try {
  
      const token =
        localStorage.getItem('access-token');
  
      const res = await axios.patch(
  
        `http://localhost:5000/issues/upvote/${id}`,
  
        {},
  
        {
          headers: {
            authorization: `Bearer ${token}`
          }
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
  
    }
  
    catch (error) {
  
      Swal.fire({
        icon: 'error',
        title:
          error.response?.data?.message ||
          'Something went wrong'
      });
    }
  };
  const handleDelete = async () => {

    const confirm =
      await Swal.fire({
  
        title: 'Are you sure?',
  
        text: 'This issue will be deleted',
  
        icon: 'warning',
  
        showCancelButton: true
      });
  
    if (!confirm.isConfirmed) {
  
      return;
    }
  
    const token =
      localStorage.getItem('access-token');
  
    const res = await axios.delete(
  
      `http://localhost:5000/issues/${id}`,
  
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );
  
    if (res.data.deletedCount > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Issue Deleted'
      });
    }
    navigate('/all-issues');
  };
  const handleBoost = async () => {

    const confirm =
      await Swal.fire({
  
        title: "Confirm Payment?",
  
        text: "100 Tk will be charged.",
  
        icon: "question",
  
        showCancelButton: true,
  
        confirmButtonText:
          "Pay 100 Tk"
  
      });
  
    if (!confirm.isConfirmed) {
  
      return;
  
    }
  
    const paymentInfo = {
  
      email: user.email,
  
      name: user.displayName,
  
      amount: 100,
  
      type: "Issue Boost",
  
      transactionId:
        crypto.randomUUID(),
  
      date: new Date()
  
    };
  
    await axios.post(
      "http://localhost:5000/payments",
      paymentInfo
    );
  
    await axios.patch(
      `http://localhost:5000/issues/boost/${id}`,
      {},
      {
        headers: {
          authorization:
            `Bearer ${
              localStorage.getItem(
                "access-token"
              )
            }`
        }
      }
    );
    setIssue({
      ...issue,
      priority: 'high'
    });
    Swal.fire({
      icon: "success",
      title:
        "Issue Boosted Successfully"
  
    });
  
  };
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 bg-base-100 text-base-content transition-colors duration-300">
      
      {/* TWO-COLUMN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        
        {/* LEFT COLUMN: HERO VISUALS (5 Columns wide on desktop) */}
        <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl shadow-lg border border-base-200">
          <img
            src={issue.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt={issue.title || "Issue banner"}
            className="w-full h-[320px] md:h-[450px] object-cover"
          />
          
          {/* Floating Layout Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {issue.priority && (
              <span className={`badge border-none font-bold text-white px-3 py-2 text-xs uppercase shadow-sm ${
                issue.priority === "high" ? "bg-red-500" : "bg-amber-500"
              }`}>
                {issue.priority} Priority
              </span>
            )}
            {issue.status && (
              <span className={`badge border-none font-bold text-white px-3 py-2 text-xs uppercase shadow-sm ${
                issue.status === "resolved" ? "bg-green-500" : issue.status === "in-progress" ? "bg-blue-500" : "bg-gray-500"
              }`}>
                {issue.status}
              </span>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: CORE METADATA & ACTIONS (7 Columns wide on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            
            {/* Tag/Category Line */}
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] bg-[#7C3AED]/10 px-3 py-1.5 rounded-full inline-block">
              📁 {issue.category || "General"}
            </span>

            {/* Main Header Title */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {issue.title}
            </h1>

            {/* Location Subtitle */}
            <p className="text-sm opacity-70 flex items-center gap-1.5 font-medium">
              <span className="text-base text-red-500">📍</span> {issue.location || "Location pending"}
            </p>

            {/* Main Body Description text block */}
            <div className="bg-base-200/50 p-6 rounded-2xl border border-base-200 mt-4">
              <h3 className="text-sm font-bold opacity-60 uppercase tracking-wide mb-2">Issue Description</h3>
              <p className="text-base md:text-lg leading-relaxed opacity-90 whitespace-pre-line">
                {issue.description || "No descriptive context detailed for this infrastructure ticket."}
              </p>
            </div>
          </div>
          {
  issue.assignedStaff && (

    <div className="bg-base-200 p-5 rounded-2xl">

      <h2 className="font-bold text-xl mb-3">

        Assigned Staff

      </h2>

      <p>
        Name:
        {issue.assignedStaff.name}
      </p>

      <p>
        Email:
        {issue.assignedStaff.email}
      </p>

    </div>
  )
}
          {/* METADATA STATS ROW & ACTIONS CONTAINER */}
          <div className="pt-4 border-t border-base-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Counters Counter */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#7C3AED]/10 rounded-2xl flex items-center justify-center text-xl">
                👍
              </div>
              <div>
                <p className="text-xs opacity-60 font-semibold uppercase tracking-wider">Total Endorsements</p>
                <h3 className="text-2xl font-black text-[#7C3AED]">{issue.upvotes || 0} Upvotes</h3>
              </div>
            </div>
            {
  user?.email === issue.userEmail &&
  issue.status === 'pending' && (

    <Link
      to={`/dashboard/update-issue/${issue._id}`}
      className="btn btn-info"
    >

      Edit Issue

    </Link>
  )
}
{
  user?.email === issue.userEmail && (

    <button
      onClick={handleDelete}
      className="btn btn-error"
    >

      Delete Issue

    </button>
  )
}
{
  issue.priority !== 'high' && (

    <button
  onClick={handleBoost}
  className="btn btn-warning"
>
  Boost Priority (100 TK)
</button>
  )
}
            {/* Upvote Interactive Component Action Trigger */}
            <button
              onClick={handleUpvote}
              className="btn bg-[#7C3AED] hover:bg-[#6D28D9] border-none text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer h-12"
            >
              <span>👍</span> Upvote Issue
            </button>

          </div>

        </div>
        <div className="mt-20">

<h2 className="text-4xl font-bold mb-10">

  Issue Timeline

</h2>

<div className="space-y-6">

  {
    issue.timeline?.slice().reverse().map((item, index) => (

      <div
        key={index}
        className="border-l-4 border-[#7C3AED] pl-6 py-3 bg-base-200 rounded-xl"
      >

        <div className="flex items-center gap-3 mb-2">

        <div
  className={`badge ${
    item.status === 'pending'
      ? 'badge-warning'
      : item.status === 'in-progress'
      ? 'badge-info'
      : item.status === 'working'
      ? 'badge-secondary'
      : item.status === 'resolved'
      ? 'badge-success'
      : item.status === 'closed'
      ? 'badge-neutral'
      : item.status === 'boosted'
      ? 'badge-error'
      : item.status === 'rejected'
      ? 'badge-error'
      : 'badge-primary'
  }`}
>

  {item.status}

</div>

          <p className="text-sm opacity-70">

            {new Date(item.time).toLocaleString()}

          </p>

        </div>

        <h3 className="font-bold text-lg">

          {item.message}

        </h3>

        <p className="opacity-70">
          Updated By:
          {item.updatedBy}
        </p>
      </div>
    ))
  }
</div>
</div>
      </div>

    </div>
  );
};

export default IssueDetails;