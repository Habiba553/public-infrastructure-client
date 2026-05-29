import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const MyIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Issue?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7C3AED",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `http://localhost:5000/issues/${id}`,
          {
            headers: {
              authorization:
                `Bearer ${
                  localStorage.getItem("access-token")
                }`
            }
          }
        );
  
        if (res.data.deletedCount) {
          setIssues(
            issues.filter(
              issue => issue._id !== id
            )
          );
          Swal.fire(
            "Deleted!",
            "Issue deleted successfully.",
            "success"
          );
        }
      }
    });
  };

  const filteredIssues = issues.filter(issue => {
    const statusMatch =
      !statusFilter ||
      issue.status === statusFilter;
    const categoryMatch =
      !categoryFilter ||
      issue.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const handleEditClick = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleUpdateIssue = async (e) => {
    e.preventDefault();
    const form = e.target;
    let imageUrl = selectedIssue.image;
    const imageFile = form.image.files[0];

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudinaryUrl =
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`;

      const imageRes = await axios.post(
        cloudinaryUrl,
        formData
      );

      imageUrl = imageRes.data.secure_url;
    }

    const updatedIssue = {
      title: form.title.value,
      description: form.description.value,
      location: form.location.value,
      category: form.category.value,
      image: imageUrl
    };
  
    const token = localStorage.getItem('access-token');
    const res = await axios.patch(
      `http://localhost:5000/issues/${selectedIssue._id}`,
      updatedIssue,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );

    if (res.data.modifiedCount) {
      setIssues(
        issues.map(issue =>
          issue._id === selectedIssue._id
            ? { ...issue, ...updatedIssue }
            : issue
        )
      );
  
      setIsModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Issue Updated Successfully",
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* --- HEADER SECTION --- */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#7C3AED] md:text-5xl">
            My Issues
          </h1>
          <p className="text-gray-500 mt-2 text-base">
            Track, manage, and monitor your reported community concerns.
          </p>
        </div>

        {/* --- FILTERS DISPLAY --- */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="form-control">
            <select
              className="select select-bordered font-medium focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
            >
              <option value="">All Statuses</option>
              <option value="pending">⏳ Pending</option>
              <option value="in-progress">⚙️ In Progress</option>
              <option value="resolved">✅ Resolved</option>
              <option value="closed">🔒 Closed</option>
            </select>
          </div>

          <div className="form-control">
            <select
              className="select select-bordered font-medium focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
              onChange={(e) => setCategoryFilter(e.target.value)}
              value={categoryFilter}
            >
              <option value="">All Categories</option>
              <option value="Road">🛣️ Road</option>
              <option value="Water">💧 Water</option>
              <option value="Electricity">⚡ Electricity</option>
              <option value="Garbage">🗑️ Garbage</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- CARDS GRID --- */}
      {filteredIssues.length === 0 ? (
        <div className="text-center py-16 bg-base-100 rounded-3xl border border-dashed p-8">
          <p className="text-xl text-gray-400 font-medium">No records found matching the active selection.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredIssues.map(issue => (
            <div
              key={issue._id}
              className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative">
                  <img
                    src={issue.image || "https://placehold.co/600x400?text=No+Preview"}
                    alt={issue.title}
                    className="h-56 w-full object-cover"
                  />
                  {/* Status & Priority Badge overlays */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`badge px-3 py-2 font-semibold text-xs uppercase tracking-wider text-white shadow-sm ${
                      issue.status === 'resolved' ? 'badge-success' : 'badge-warning'
                    }`}>
                      {issue.status}
                    </span>
                    <span className={`badge px-3 py-2 font-semibold text-xs uppercase tracking-wider text-white shadow-sm ${
                      issue.priority === "high" ? 'badge-error' : 'badge-warning'
                    }`}>
                      {issue.priority || 'medium'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 line-clamp-1 mb-2 hover:text-[#7C3AED] transition-colors">
                    {issue.title}
                  </h2>
                  
                  <p className="text-gray-500 font-medium text-sm mb-4 flex items-center gap-1">
                    📍 <span className="truncate">{issue.location}</span>
                  </p>

                  <div className="flex justify-between items-center bg-gray-50 rounded-xl p-3 text-sm">
                    <p className="font-semibold text-gray-600">
                      Category: <span className="text-[#7C3AED] font-bold ml-1">{issue.category}</span>
                    </p>
                    <p className="font-semibold text-gray-600 flex items-center gap-1">
                      👍 Upvotes: <span className="font-extrabold text-gray-900 bg-white shadow-xs px-2 py-0.5 rounded-md border">{issue.upvotes || 0}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* --- FOOTER BUTTONS BLOCK --- */}
              <div className="px-6 pb-6 pt-2 grid grid-cols-3 gap-2 border-t border-gray-50 mt-4 bg-gray-50/40">
                <Link
                  to={`/issue-details/${issue._id}`}
                  className="btn btn-primary btn-sm rounded-xl font-bold shadow-xs text-white bg-[#7C3AED] border-none hover:bg-[#6D28D9] text-xs"
                >
                  Details
                </Link>

                {issue.status === "pending" ? (
                  <button
                    onClick={() => handleEditClick(issue)}
                    className="btn btn-warning btn-sm rounded-xl font-bold text-xs"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn btn-sm rounded-xl font-bold text-xs btn-disabled opacity-40"
                    title="Only pending issues can be modified"
                  >
                    Locked
                  </button>
                )}

                <button
                  onClick={() => handleDelete(issue._id)}
                  className="btn btn-error btn-outline btn-sm rounded-xl font-bold text-xs hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- EDIT MODAL TEMPLATE --- */}
      {isModalOpen && selectedIssue && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transform scale-100 transition-all">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h2 className="text-3xl font-extrabold text-[#7C3AED]">
                  Edit Issue
                </h2>
                <p className="text-xs text-gray-400 mt-1">Modify information for: {selectedIssue._id}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-sm btn-circle btn-ghost text-2xl font-normal text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Container Form */}
            <form onSubmit={handleUpdateIssue} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="grid md:grid-cols-5 gap-6">
                
                {/* Form Inputs (Left - 3 columns) */}
                <div className="md:col-span-3 space-y-5">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Issue Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={selectedIssue.title}
                      className="input input-bordered w-full focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={selectedIssue.description}
                      rows="4"
                      className="textarea textarea-bordered w-full min-h-[100px] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        defaultValue={selectedIssue.location}
                        className="input input-bordered w-full focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                        Category
                      </label>
                      <select
                        name="category"
                        defaultValue={selectedIssue.category}
                        className="select select-bordered w-full focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      >
                        <option value="Road">Road</option>
                        <option value="Water">Water</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Garbage">Garbage</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Media Control Section (Right - 2 columns) */}
                <div className="md:col-span-2 flex flex-col justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Current Image Attached
                    </label>
                    <img
                      src={selectedIssue.image || "https://placehold.co/600x400?text=No+Preview"}
                      alt="Current preview"
                      className="w-full h-40 object-cover rounded-xl border border-gray-200 shadow-xs mb-4 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Replace Image File
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="file-input file-input-bordered file-input-sm w-full bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Action Trigger Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-xl px-6"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-none rounded-xl px-8 shadow-md"
                >
                  Update Issue
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;