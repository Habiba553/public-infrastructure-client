import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUserPlus, FaUserEdit, FaTrashAlt, FaPhoneAlt, FaEnvelope, FaUserTie } from "react-icons/fa";

// Instantiate secure communication layer outside the component rendering cycle
const token = localStorage.getItem('access-token');
const secureAxios = axios.create({
  headers: { authorization: `Bearer ${token}` }
});

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load staff records from Express API
  const loadStaff = () => {
    // Update this URL path to hit the specific staff endpoint
    secureAxios.get('http://localhost:5000/admin/staff') 
      .then(res => {
        // Since this collection contains only staff, you don't even need to .filter() it anymore!
        setStaff(res.data); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error reading staff data:", err);
        setLoading(false);
      });
  };

  useEffect(() => { 
    loadStaff(); 
  }, []);

  // Creation Handler (Deploys account record to Firebase & MongoDB via Backend)
  const handleAddStaffSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // FIXED: Added role field explicitly to avoid filtering drop-outs on refresh
    const staffPayload = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      photo: form.photo.value,
      password: form.password.value,
      role: "staff" 
    };

    try {
      const res = await secureAxios.post('http://localhost:5000/admin/staff/create', staffPayload);
      if(res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Staff Deployed!',
          text: 'Account provisioned successfully in Firebase Auth and MongoDB.',
          confirmButtonColor: '#7C3AED'
        });
        form.reset();
        document.getElementById('add_staff_modal').close();
        loadStaff();
      }
    } catch(err) {
      Swal.fire({
        icon: 'error',
        title: 'Provisioning Failed',
        text: err.response?.data?.message || 'Error occurred while creating credentials.',
        confirmButtonColor: '#EF4444'
      });
    }
  };

  // Update Handler (Modifies specific demographic records)
  const handleUpdateStaffSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatePayload = {
      name: form.name.value,
      phone: form.phone.value,
      photo: form.photo.value
    };

    try {
      const res = await secureAxios.put(`http://localhost:5000/admin/staff/${editingStaff._id}`, updatePayload);
      if(res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Staff parameters altered accurately.',
          confirmButtonColor: '#7C3AED'
        });
        setEditingStaff(null);
        document.getElementById('edit_staff_modal').close();
        loadStaff();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Deletion Handler (Wipes database entry & authentication identity references)
  const handleDeleteStaff = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Remove this Staff member?',
      text: "This action completely revokes system clearance and erases database logs!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#3D4451',
      confirmButtonText: 'Yes, delete permanently!'
    });

    if(confirmation.isConfirmed) {
      const res = await secureAxios.delete(`http://localhost:5000/admin/staff/${id}`);
      if(res.data.deletedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Staff Wiped',
          text: 'Account cleared from environment systems.',
          confirmButtonColor: '#7C3AED'
        });
        loadStaff();
      }
    }
  };

  if (loading) return <div className="p-10 text-center"><span className="loading loading-spinner text-purple-600 loading-lg"></span></div>;

  return (
    <div className="bg-base-100 p-2 md:p-6 rounded-3xl">
      
      {/* ACTION HEADER PANEL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-1">Manage Field Staff</h1>
          <p className="text-sm text-base-content/60">Provision account identities, tweak operational metadata, or remove active crew permissions.</p>
        </div>
        <button 
          className="btn bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl shadow-md shadow-[#7C3AED]/20 gap-2 w-fit" 
          onClick={() => document.getElementById('add_staff_modal').showModal()}
        >
          <FaUserPlus className="text-lg" /> Add Staff Member
        </button>
      </div>

      {/* CORE TABULAR REGISTRY */}
      <div className="overflow-x-auto border border-base-300 rounded-2xl shadow-sm bg-base-200">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-300/50 text-base-content/80 text-sm border-b border-base-300">
              <th className="py-4 rounded-tl-2xl">Staff Profile Info</th>
              <th>Contact Node Email</th>
              <th>Phone Label</th>
              <th className="text-center py-4 rounded-tr-2xl px-6">Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300/40">
            {staff.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-base-content/50 font-medium">No personnel registered in system clusters.</td>
              </tr>
            ) : (
              staff.map(member => (
                <tr key={member._id} className="hover:bg-base-300/30 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-base-300 text-base-content rounded-xl w-10 h-10 object-cover">
                          {member.photo ? <img src={member.photo} alt={member.name} /> : <FaUserTie className="text-base-content/40 text-lg" />}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base">{member.name}</div>
                        <span className="badge bg-blue-500/10 text-blue-600 text-[10px] font-bold uppercase py-0.5 px-2 rounded-md">Field Agent</span>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium text-sm text-base-content/70">
                    <span className="flex items-center gap-1.5"><FaEnvelope className="opacity-40" /> {member.email}</span>
                  </td>
                  <td className="font-medium text-sm text-base-content/70">
                    <span className="flex items-center gap-1.5"><FaPhoneAlt className="opacity-40" /> {member.phone}</span>
                  </td>
                  <td className="text-center px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => { setEditingStaff(member); setTimeout(() => document.getElementById('edit_staff_modal').showModal(), 50); }} 
                        className="btn btn-sm btn-ghost text-amber-600 bg-amber-500/5 hover:bg-amber-500 hover:text-white rounded-xl font-bold"
                      >
                        <FaUserEdit /> Update
                      </button>
                      <button 
                        onClick={() => handleDeleteStaff(member._id)} 
                        className="btn btn-sm btn-square btn-ghost text-error bg-error/5 hover:bg-error hover:text-white rounded-xl shadow-sm"
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

      {/* MODAL WINDOW: ADD NEW SYSTEM STAFF */}
      <dialog id="add_staff_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 p-6 rounded-2xl border border-base-300 shadow-xl max-w-md">
          <div className="flex items-center gap-2 mb-4 text-[#7C3AED]">
            <FaUserPlus className="text-2xl" />
            <h3 className="font-extrabold text-xl">Provision Staff Identity</h3>
          </div>
          <form onSubmit={handleAddStaffSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60">Full Name</label>
              <input type="text" name="name" placeholder="John Doe" className="input input-bordered rounded-xl" required />
            </div>
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60">Corporate Email Address</label>
              <input type="email" name="email" placeholder="agent@cityinfra.com" className="input input-bordered rounded-xl" required />
            </div>
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60">Contact Phone Number</label>
              <input type="text" name="phone" placeholder="+1 (555) 019-2834" className="input input-bordered rounded-xl" required />
            </div>
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60">Photo URL Avatar String</label>
              <input type="url" name="photo" placeholder="https://images.unsplash.com/..." className="input input-bordered rounded-xl" required />
            </div>
            <div className="form-control">
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60">Temporary System Password</label>
              <input type="password" name="password" placeholder="••••••••" className="input input-bordered rounded-xl" required />
            </div>
            <div className="modal-action gap-2 pt-2">
              <button type="button" className="btn btn-outline border-base-300 rounded-xl px-5 font-bold" onClick={() => document.getElementById('add_staff_modal').close()}>Cancel</button>
              <button type="submit" className="btn bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl px-5 font-bold shadow-md shadow-[#7C3AED]/20">Deploy Profile</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* MODAL WINDOW: UPDATE PRE-EXISTING STAFF PARAMETERS */}
      <dialog id="edit_staff_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 p-6 rounded-2xl border border-base-300 shadow-xl max-w-md">
          <div className="flex items-center gap-2 mb-4 text-amber-600">
            <FaUserEdit className="text-2xl" />
            <h3 className="font-extrabold text-xl">Modify Staff Parameters</h3>
          </div>
          {editingStaff && (
            <form onSubmit={handleUpdateStaffSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60">Full Name</label>
                <input type="text" name="name" defaultValue={editingStaff.name} className="input input-bordered rounded-xl" required />
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60">Contact Phone Number</label>
                <input type="text" name="phone" defaultValue={editingStaff.phone} className="input input-bordered rounded-xl" required />
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60">Photo Avatar String URL</label>
                <input type="url" name="photo" defaultValue={editingStaff.photo} className="input input-bordered rounded-xl" required />
              </div>
              <div className="modal-action gap-2 pt-2">
                <button type="button" className="btn btn-outline border-base-300 rounded-xl px-5 font-bold" onClick={() => { setEditingStaff(null); document.getElementById('edit_staff_modal').close(); }}>Cancel</button>
                <button type="submit" className="btn bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-5 font-bold shadow-md">Save Adjustments</button>
              </div>
            </form>
          )}
        </div>
      </dialog>

    </div>
  );
};

export default ManageStaff;