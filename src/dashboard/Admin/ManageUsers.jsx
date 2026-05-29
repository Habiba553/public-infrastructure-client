import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUserShield, FaUserCheck, FaUserSlash, FaTrashAlt, FaCrown, FaUser, FaUsers, FaLock, FaCheckCircle } from "react-icons/fa";

// Instantiate secure communication layer out of cycle loops
const token = localStorage.getItem('access-token');
const secureAxios = axios.create({
  headers: {
    authorization: `Bearer ${token}`
  }
});

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from MongoDB
  const fetchUsers = () => {
    secureAxios.get('http://localhost:5000/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error reading users:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Operation 1: Promote user to admin role safely
  const handleMakeAdmin = async (id) => {
    const result = await Swal.fire({
      title: 'Promote to Admin?',
      text: "This user will gain administrative access to control modules.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#7C3AED',
      cancelButtonColor: '#3D4451',
      confirmButtonText: 'Yes, promote'
    });

    if (result.isConfirmed) {
      const res = await secureAxios.patch(`http://localhost:5000/users/admin/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({ 
          icon: 'success', 
          title: 'Promoted!',
          text: 'User promoted to Admin successfully.',
          confirmButtonColor: '#7C3AED'
        });
        setUsers(users.map(u => u._id === id ? { ...u, role: 'admin' } : u));
      }
    }
  };

  // Operation 2: Toggle Block / Unblock states interactively (UI & Database Synchronization)
  const handleToggleBlock = async (user) => {
    const currentBlockStatus = user.blocked || false; // Safe fallback for older documents
    const nextBlockStatus = !currentBlockStatus; 
    const actionText = nextBlockStatus ? "Block" : "Unblock";

    const result = await Swal.fire({
      title: `${actionText} User Account?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} ${user.name || 'this citizen'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: nextBlockStatus ? '#EF4444' : '#10B981',
      cancelButtonColor: '#3D4451',
      confirmButtonText: `Yes, ${actionText}`
    });

    if (result.isConfirmed) {
      // Pass the explicit toggle variant inside the body array to write directly to DB
      const endpoint = `http://localhost:5000/users/block/${user._id}`;
      const res = await secureAxios.patch(endpoint, { blocked: nextBlockStatus });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: `Action Processed`,
          text: `User has been ${actionText.toLowerCase()}ed successfully.`,
          confirmButtonColor: '#7C3AED'
        });
        
        // Match state cleanly to reflect mutation in client window immediately
        setUsers(users.map(u => u._id === user._id ? { ...u, blocked: nextBlockStatus } : u));
      }
    }
  };

  // Operation 3: Terminate user document reference cleanly
  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Delete user account record permanently?',
      text: "This action cannot be rolled back from the database clusters.",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#3D4451',
      confirmButtonText: 'Permanently Erase'
    });

    if (result.isConfirmed) {
      const res = await secureAxios.delete(`http://localhost:5000/users/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire({ 
          icon: 'success', 
          title: 'Deleted!',
          text: 'User record has been permanently deleted.',
          confirmButtonColor: '#7C3AED'
        });
        setUsers(users.filter(u => u._id !== id));
      }
    }
  };

  if (loading) return <div className="p-10 text-center"><span className="loading loading-spinner text-purple-600 loading-lg"></span></div>;

  return (
    <div className="bg-base-100 p-4 md:p-8 rounded-3xl shadow-sm min-h-screen">
      
      {/* HEADER SECTION PANEL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
            <FaUsers className="text-[#7C3AED]" /> Manage System Citizens
          </h1>
          <p className="text-sm text-base-content/60">Review subscription models, authorize system management tags, or switch global execution clearance states status blocks.</p>
        </div>
        <div className="stats shadow-sm bg-base-200 border border-base-300 rounded-2xl">
          <div className="stat px-6 py-3">
            <div className="stat-title text-xs font-bold uppercase tracking-wider text-base-content/50">Total Citizens</div>
            <div className="stat-value text-3xl font-black text-[#7C3AED]">{users.length}</div>
          </div>
        </div>
      </div>

      {/* CORE DATA DISPLAY TABLE */}
      <div className="overflow-x-auto border border-base-300 rounded-2xl shadow-sm bg-base-100">
        <table className="table w-full border-collapse">
          
          <thead>
            <tr className="bg-base-200 text-base-content/80 text-sm font-bold border-b border-base-300">
              <th className="py-4 pl-6 rounded-tl-2xl">Identity Credentials</th>
              <th>System Role</th>
              <th>Subscription Info</th>
              <th>Account Status</th>
              <th className="text-right py-4 rounded-tr-2xl pr-6">Administrative Controls</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-base-content/40 font-medium">No recorded citizens discovered inside clusters.</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id} className="hover:bg-base-200/40 transition-colors">
                  
                  {/* 1. Identity Columns */}
                  <td className="py-4 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="bg-base-200 border border-base-300 text-base-content rounded-2xl w-12 h-12 shadow-sm object-cover">
                          {user.photo ? <img src={user.photo} alt={user.name} /> : <FaUser className="text-base-content/40 text-xl" />}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base text-base-content flex items-center gap-2">
                          {user.name || "Anonymous User"}
                        </div>
                        <div className="text-xs text-base-content/50 font-medium tracking-wide mt-0.5">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* 2. Authorization Level */}
                  <td className="align-middle">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg ${
                      user.role === 'admin' 
                        ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' 
                        : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                    }`}>
                      {user.role || 'citizen'}
                    </span>
                  </td>

                  {/* 3. Subscription State Column */}
                  <td className="align-middle">
                    {user.premium ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full w-fit">
                        <FaCrown className="text-sm" /> Premium Tier
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-base-content/50 bg-base-200 px-3 py-1 rounded-full w-fit border border-base-300">
                        Standard Tier
                      </span>
                    )}
                  </td>

                  {/* 4. Real-time Status Column */}
                  <td className="align-middle">
                    {user.blocked ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-error bg-error/10 border border-error/20 px-2.5 py-1 rounded-full w-fit">
                        <FaLock className="text-[10px]" /> Blocked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full w-fit">
                        <FaCheckCircle className="text-[10px]" /> Active
                      </span>
                    )}
                  </td>

                  {/* 5. Action Directives Interface */}
                  <td className="text-right pr-6 align-middle">
                    <div className="flex items-center justify-end gap-2.5">
                      
                      {/* Role Promotion Switch */}
                      {user.role !== 'admin' ? (
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          className="btn btn-sm bg-[#7C3AED]/5 border border-[#7C3AED]/10 hover:bg-[#7C3AED] hover:border-[#7C3AED] text-[#7C3AED] hover:text-white rounded-xl font-bold transition-all duration-200"
                        >
                          <FaUserShield className="text-sm" /> Make Admin
                        </button>
                      ) : (
                        <span className="text-xs text-base-content/40 font-bold bg-base-200 px-3 py-1.5 rounded-xl border border-base-300">System Admin</span>
                      )}

                      {/* Suspension Toggle Switch */}
                      <button
                        onClick={() => handleToggleBlock(user)}
                        className={`btn btn-sm rounded-xl font-bold transition-all duration-200 border ${
                          user.blocked 
                            ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/10 hover:bg-emerald-500 hover:text-white" 
                            : "bg-amber-500/5 text-amber-600 border-amber-500/10 hover:bg-amber-500 hover:text-white"
                        }`}
                      >
                        {user.blocked ? (
                          <>
                            <FaUserCheck className="text-sm" /> Unblock User
                          </>
                        ) : (
                          <>
                            <FaUserSlash className="text-sm" /> Block User
                          </>
                        )}
                      </button>

                      {/* Deletion Routine Trigger */}
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="btn btn-sm btn-square bg-error/5 border border-error/10 text-error hover:bg-error hover:text-white rounded-xl transition-all duration-200"
                        title="Delete User Record"
                      >
                        <FaTrashAlt />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageUsers;