import { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/LoadingSpinner";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const { user } = useAuth();
const navigate = useNavigate();
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('');
  const [priority, setPriority] = useState('');
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const size = 6;

  // EFFECT 1: Handle Search Debouncing (Wait 400ms after user stops typing)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0); // Reset page safely here
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // EFFECT 2: Fetch data using the debounced search string
  useEffect(() => {
    setLoading(true);
    axios.get(
      `http://localhost:5000/issues?search=${debouncedSearch}&category=${category}&status=${status}&priority=${priority}&sort=${sort}&page=${page}&size=${size}`
    )
    .then(res => {
      setIssues(res.data.issues);
      setCount(res.data.total);
      setLoading(false);
    });
  }, [debouncedSearch, category, status, priority, sort, page]);

  const numberOfPages = Math.ceil(count / size);
  const pages = [...Array(numberOfPages).keys()];

  const handleUpvote = async (issueId) => {

    // LOGIN CHECK
    if (!user) {
  
      navigate('/login');
  
      return;
    }
  
  
  
    try {
  
      const token =
        localStorage.getItem('access-token');
  
  
  
      await axios.patch(
  
        `http://localhost:5000/issues/upvote/${issueId}`,
  
        {},
  
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
  
  
  
      // INSTANT UI UPDATE
      const updatedIssues =
        issues.map(issue => {
  
          if (issue._id === issueId) {
  
            return {
  
              ...issue,
  
              upvotes: issue.upvotes + 1
            };
          }
  
          return issue;
        });
  
  
  
      setIssues(updatedIssues);
  
  
  
      Swal.fire({
  
        icon: 'success',
  
        title: 'Upvoted Successfully'
      });
  
    }
  
    catch (error) {
  
      Swal.fire({
  
        icon: 'error',
  
        title:
          error.response.data.message
      });
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 bg-base-100 text-base-content transition-colors duration-300">
      
      {/* Header Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          All Public <span className="text-[#7C3AED]">Issues</span>
        </h1>
        <p className="text-sm md:text-base opacity-70 mt-3 max-w-md mx-auto">
          Browse, filter, and track community infrastructure reports across your area.
        </p>
      </div>

      {/* FILTER & SEARCH BAR PANEL */}
      <div className="bg-base-200 p-6 rounded-3xl gap-4 shadow-sm mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-center">
        
        {/* SEARCH INPUT */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Search issues..."
            className="input input-bordered w-full focus:outline-none focus:border-[#7C3AED] bg-base-100 text-sm h-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Smooth text input binding without page resets
          />
        </div>

        {/* CATEGORY SELECT */}
        <div className="w-full">
          <select
            className="select select-bordered w-full focus:outline-none focus:border-[#7C3AED] bg-base-100 text-sm h-12"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All Categories</option>
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Garbage">Garbage</option>
          </select>
        </div>

        {/* PRIORITY SELECT */}
        <div className="w-full">
          <select
            className="select select-bordered w-full focus:outline-none focus:border-[#7C3AED] bg-base-100 text-sm h-12"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
          </select>
        </div>

        {/* STATUS SELECT */}
        <div className="w-full">
          <select
            className="select select-bordered w-full focus:outline-none focus:border-[#7C3AED] bg-base-100 text-sm h-12"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="in-progress">In Progress</option>
            <option value="in-progress">Closed</option>
          </select>
        </div>

        {/* SORT SELECT */}
        <div className="w-full">
          <select
            className="select select-bordered w-full focus:outline-none focus:border-[#7C3AED] bg-base-100 text-sm h-12"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(0);
            }}
          >
            <option value="">Default Sort</option>
            <option value="newest">Newest</option>
            <option value="upvotes">Most Upvotes</option>
          </select>
        </div>
      </div>

      {/* ISSUES DISPLAY WORKSPACE WITH INTEGRATED LOADING OVERLAY */}
      <div className="relative min-h-[400px]">
        {loading && (
          <div className="absolute inset-0 bg-base-100/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-3xl transition-all">
            <LoadingSpinner />
          </div>
        )}

        {issues.length === 0 ? (
          <div className="text-center py-20 bg-base-200 rounded-3xl border border-dashed border-base-300">
            <h2 className="text-2xl font-bold opacity-60">No Issues Found</h2>
            <p className="text-sm opacity-50 mt-1">Try tweaking your filtering criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {issues.map(issue => (
              <div
                key={issue._id}
                className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden group"
              >
                {/* IMAGE WRAPPER */}
                <div className="relative overflow-hidden h-52 w-full bg-base-300">
                  <img
                    src={issue.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt={issue.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Absolute Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className={`badge border-none font-bold text-white px-3 py-2 text-xs uppercase ${
                      issue.priority === "high" ? "bg-red-500" : "bg-amber-500"
                    }`}>
                      {issue.priority}
                    </span>
                    <span className={`badge border-none font-bold text-white px-3 py-2 text-xs uppercase ${
                      issue.status === "resolved" ? "bg-green-500" : issue.status === "in-progress" ? "bg-blue-500" : "bg-gray-500"
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                </div>

                {/* CARD CONTENTS */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <h2 className="text-xl font-bold line-clamp-1 group-hover:text-[#7C3AED] transition-colors duration-200">
                      {issue.title}
                    </h2>
                    <p className="text-xs opacity-60 mt-1 flex items-center gap-1">
                      <span>📍</span> {issue.location}
                    </p>
                  </div>

                  {/* Structured Metadata List */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-2 border-t border-base-200 text-xs opacity-80">
                    <p><span className="font-semibold opacity-60">Category:</span> {issue.category}</p>
                    <p><span className="font-semibold opacity-60">Upvotes:</span> <button
  onClick={() =>
    handleUpvote(issue._id)
  }
  className="btn btn-outline btn-sm cursor-pointer"
>
  👍 {issue.upvotes || 0}
</button></p>
                  </div>

                  <Link
                    to={`/issue-details/${issue._id}`}
                    className="btn bg-[#7C3AED] hover:bg-[#6D28D9] border-none text-white font-bold w-full rounded-xl transition-all duration-300 mt-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PAGINATION ENGINE CONTROLS */}
      {pages.length > 1 && (
        <div className="flex justify-center mt-16 gap-2 flex-wrap">
          {pages.map(pageNumber => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`btn min-h-0 h-10 px-4 font-bold rounded-xl transition-all duration-200 ${
                page === pageNumber
                  ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-none shadow-md'
                  : 'btn-outline border-base-300 hover:bg-base-200 text-base-content'
              }`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default AllIssues;