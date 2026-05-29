import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUserPlus, FaTimesCircle, FaCheckCircle, FaExclamationTriangle, FaUserCheck, FaTools, FaFolder, FaLayerGroup } from "react-icons/fa";


const token = localStorage.getItem('access-token');
const secureAxios = axios.create({
  headers: { authorization: `Bearer ${token}` }
});

const ManageIssues = () => {
  const [issues, setIssues] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch and cleanly sort issues from MongoDB
  const fetchIssues = () => {
    secureAxios.get('http://localhost:5000/admin/issues')
      .then(res => {
        // Core Logic: Boosted issues appear above normal issues
        const sorted = res.data.sort((a, b) => {
          const aBoost = a.priority === 'high' || a.isBoosted ? 1 : 0;
          const bBoost = b.priority === 'high' || b.isBoosted ? 1 : 0;
          return bBoost - aBoost;
        });
        setIssues(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error reading issues:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIssues();
    secureAxios.get('http://localhost:5000/admin/staff')
      .then(res => setStaffList(res.data))
      .catch(err => console.error("Error downloading staff nodes:", err));
  }, []);

  const openAssignModal = (issueId) => {
    setSelectedIssueId(issueId);
    document.getElementById('assign_modal').showModal();
  };

  // Assign staff handler
  const handleAssignStaff = async (e) => {
    e.preventDefault();
    const staffId = e.target.staffSelect.value;
    const selectedStaff = staffList.find(s => s._id === staffId);

    if (!selectedStaff) return;

    try {
      // Body payload structure tailored exactly for your MongoDB nested keys 
      const assignmentPayload = {
        status: 'pending', // Issue status remains pending
        assignedStaff: {
          id: selectedStaff._id,
          name: selectedStaff.name,
          email: selectedStaff.email
        }
      };

      const res = await secureAxios.patch(`http://localhost:5000/issues/assign/${selectedIssueId}`, assignmentPayload);

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Staff Member Allocated',
          text: `Issue allocated to ${selectedStaff.name}. Real-time sync updated on their dashboard layout.`,
          confirmButtonColor: '#7C3AED'
        });
        e.target.reset();
        document.getElementById('assign_modal').close();
        fetchIssues(); // Refresh table context safely without full page reload
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Assignment Failed',
        text: 'Could not append personnel routing payload parameters.',
        confirmButtonColor: '#EF4444'
      });
    }
  };

  // Reject issue handler
  const handleRejectIssue = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Reject this public issue report?',
      text: "This operation writes an unalterable rejected flag to the system timeline logs!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#3D4451',
      confirmButtonText: 'Yes, reject report'
    });

    if (confirmation.isConfirmed) {
      const res = await secureAxios.patch(`http://localhost:5000/issues/status/${id}`, { status: 'rejected' });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Report Terminated',
          text: 'The infrastructure claim status has been modified to rejected.',
          confirmButtonColor: '#7C3AED'
        });
        fetchIssues();
      }
    }
  };

  if (loading) return <div className="p-10 text-center"><span className="loading loading-spinner text-purple-600 loading-lg"></span></div>;

  return (
    <div className="bg-base-100 p-4 md:p-8 rounded-3xl min-h-screen shadow-sm">
      
      {/* HEADER CONTROLS HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
            <FaTools className="text-[#7C3AED]" /> Manage System Issues
          </h1>
          <p className="text-sm text-base-content/60">Triage incoming civil claims, map tasks to field technicians, or decline invalid reports.</p>
        </div>
        <div className="stats shadow-sm bg-base-200 border border-base-300 rounded-2xl">
          <div className="stat px-6 py-3">
            <div className="stat-title text-xs font-bold uppercase tracking-wider text-base-content/50">Active Incident Tickets</div>
            <div className="stat-value text-3xl font-black text-[#7C3AED]">{issues.length}</div>
          </div>
        </div>
      </div>

      {/* CORE INFRASTRUCTURE MATRIX DATA TABLE */}
      <div className="overflow-x-auto border border-base-300 rounded-2xl shadow-sm bg-base-100">
        <table className="table w-full border-collapse">
          <thead>
            <tr className="bg-base-200 text-base-content/80 text-sm font-bold border-b border-base-300">
              <th className="py-4 pl-6 rounded-tl-2xl">Issue Details</th>
              <th>Category</th>
              <th>Priority Matrix</th>
              <th>Operational Status</th>
              <th>Assigned Personnel Node</th>
              <th className="text-center py-4 rounded-tr-2xl pr-6">Management Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200">
            {issues.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-base-content/40 font-medium">No system incidents found. All parameters cleared.</td>
              </tr>
            ) : (
              issues.map(issue => {
                const staffAssigned = issue.assignedStaff && issue.assignedStaff.name;
                const isHighPriority = issue.priority === 'high' || issue.isBoosted;

                return (
                  <tr key={issue._id} className={`transition-colors hover:bg-base-200/30 ${issue.isBoosted ? "bg-amber-500/[0.03] hover:bg-amber-500/[0.06]" : ""}`}>
                    
                    {/* 1. Title Column */}
                    <td className="py-4 pl-6 max-w-xs">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold text-base text-base-content flex items-center gap-2 flex-wrap">
                            {issue.title}
                            {issue.isBoosted && (
                              <span className="badge badge-warning text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-md animate-pulse">BOOSTED</span>
                            )}
                          </div>
                          <div className="text-xs text-base-content/40 font-medium truncate mt-0.5">{issue.location || 'Unknown Coordinates'}</div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Category */}
                    <td className="align-middle">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-base-content/70">
                        <FaFolder className="opacity-40" /> {issue.category || 'Uncategorized'}
                      </span>
                    </td>

                    {/* 3. Priority Matrix */}
                    <td className="align-middle">
                      {isHighPriority ? (
                        <span className="flex items-center gap-1 text-xs font-extrabold text-error bg-error/10 border border-error/20 px-2.5 py-1 rounded-lg w-fit">
                          <FaExclamationTriangle className="text-[10px]" /> High
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-base-content/50 bg-base-200 px-2.5 py-1 rounded-lg w-fit border border-base-300">
                          Normal
                        </span>
                      )}
                    </td>

                    {/* 4. Core System Status Flags */}
                    <td className="align-middle">
                      <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        issue.status === 'resolved' 
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                          : issue.status === 'rejected'
                          ? 'bg-error/10 text-error border-error/20'
                          : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                      }`}>
                        {issue.status || 'pending'}
                      </span>
                    </td>

                    {/* 5. Assigned Staff Display Column */}
                    <td className="align-middle">
                      {staffAssigned ? (
                        <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
                          <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                          <span className="flex items-center gap-1"><FaUserCheck className="text-xs opacity-60" /> {issue.assignedStaff.name}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-base-content/30 italic font-medium">Unassigned Pool</span>
                      )}
                    </td>

                    {/* 6. Administrative Dispatch Actions */}
                    <td className="text-center pr-6 align-middle">
                      <div className="flex items-center justify-center gap-2">
                        
                        {/* Assign Staff Action Button Rule Control */}
                        {!staffAssigned ? (
                          <button
                            onClick={() => openAssignModal(issue._id)}
                            className="btn btn-sm bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl font-bold border-none shadow-sm shadow-[#7C3AED]/20 flex items-center gap-1"
                          >
                            <FaUserPlus /> Assign Staff
                          </button>
                        ) : (
                          <button
                            disabled
                            className="btn btn-sm btn-disabled rounded-xl font-bold bg-base-200 text-base-content/30 border border-base-300"
                          >
                            Staff Assigned
                          </button>
                        )}

                        {/* Reject Issue Button Rule Control */}
                        {issue.status === 'pending' ? (
                          <button
                            onClick={() => handleRejectIssue(issue._id)}
                            className="btn btn-sm bg-error/5 border border-error/10 text-error hover:bg-error hover:text-white rounded-xl font-bold"
                          >
                            <FaTimesCircle /> Reject
                          </button>
                        ) : (
                          <span className="text-[11px] text-base-content/30 font-bold tracking-wide select-none">Processed</span>
                        )}

                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ASSIGNMENT MODAL ELEMENT CONTAINER */}
      <dialog id="assign_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 border border-base-300 shadow-2xl p-6 rounded-2xl max-w-md">
          <div className="flex items-center gap-3 mb-4 text-[#7C3AED]">
            <FaLayerGroup className="text-2xl" />
            <h3 className="font-extrabold text-xl">Dispatch Personnel</h3>
          </div>
          <p className="text-sm text-base-content/60 mb-4">Select an active field agent to resolve this civic infrastructure ticket. This operation is definitive.</p>
          
          <form onSubmit={handleAssignStaff}>
            <div className="form-control w-full mb-6">
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/50 mb-1">Available Fleet Profiles</label>
              <select name="staffSelect" className="select select-bordered rounded-xl border-base-300 focus:border-[#7C3AED] focus:outline-none w-full" defaultValue="" required>
                <option value="" disabled>Choose active responder profile...</option>
                {staffList.map(staff => (
                  <option key={staff._id} value={staff._id}>
                    {staff.name} — ({staff.email})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="modal-action gap-2 border-t border-base-200 pt-4">
              <button type="button" className="btn btn-outline border-base-300 rounded-xl px-5 font-bold" onClick={() => document.getElementById('assign_modal').close()}>Cancel</button>
              <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl px-5 font-bold shadow-md">Confirm Assignment</button>
            </div>
          </form>
        </div>
      </dialog>

    </div>
  );
};

export default ManageIssues;