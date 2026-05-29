import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider"; 
import Swal from "sweetalert2";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile matching the MongoDB schema structure
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users/profile/${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setProfileData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching admin data:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value; // 👈 Maps to 'photo' in MongoDB

    const updatedInfo = { name, photo };

    fetch(`http://localhost:5000/users/profile/${user.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('access-token')}`
      },
      body: JSON.stringify(updatedInfo)
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle both standard match updates or modified responses cleanly
        if (data.modifiedCount > 0 || data.matchedCount > 0) {
          setProfileData({ ...profileData, ...updatedInfo });
          setIsEditing(false);
          Swal.fire({
            title: "Success!",
            text: "Profile updated successfully.",
            icon: "success",
            confirmButtonColor: "#7C3AED"
          });
        }
      })
      .catch(err => console.error("Error updating profile setup:", err));
  };

  if (loading) return <div className="p-10 text-center"><span className="loading loading-spinner text-purple-600"></span></div>;

  return (
    <div className="max-w-4xl mx-auto bg-base-200 p-8 rounded-3xl shadow-sm border border-base-300">
      
      {/* HEADER CONTENT DISPLAY PANEL */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-6 border-b border-base-300">
        <img 
          src={profileData?.photo || "https://placehold.co/150"} // 👈 Using your 'photo' key from MongoDB
          alt="Admin" 
          className="w-32 h-32 rounded-2xl object-cover ring-4 ring-[#7C3AED]/20 shadow-md"
        />
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">{profileData?.name || "Admin Account"}</h1>
          
          <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1">
            <span className="text-xs font-semibold text-[#7C3AED] uppercase bg-[#7C3AED]/10 px-3 py-1 rounded-full">
              System {profileData?.role || "admin"}
            </span>
            
            {/* Real-time Status Badges matching your DB image fields */}
            <span className={`text-xs font-semibold uppercase px-3 py-1 rounded-full ${profileData?.premium ? 'bg-amber-500/10 text-amber-600' : 'bg-base-300 text-base-content/50'}`}>
              {profileData?.premium ? 'Premium Account' : 'Standard Tier'}
            </span>

            {profileData?.blocked && (
              <span className="text-xs font-semibold uppercase bg-error/10 text-error px-3 py-1 rounded-full">
                Suspended
              </span>
            )}
          </div>
          
          <p className="text-sm text-base-content/60 mt-1">{profileData?.email}</p>
        </div>
      </div>

      {/* INTERACTIVE DATA UPDATE FORM */}
      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          
          <div className="form-control">
            <label className="label font-bold text-sm">Full Name</label>
            <input 
              type="text" 
              name="name" 
              defaultValue={profileData?.name} 
              disabled={!isEditing} 
              className="input input-bordered rounded-xl disabled:bg-base-300" 
              required 
            />
          </div>

          <div className="form-control">
            <label className="label font-bold text-sm">Profile Image URL (`photo`)</label>
            <input 
              type="text" 
              name="photo" 
              defaultValue={profileData?.photo} // 👈 Populates image URL from DB key
              disabled={!isEditing} 
              className="input input-bordered rounded-xl disabled:bg-base-300" 
              required
            />
          </div>

        </div>

        {/* PROFILE ACTIONS BUTTON CONTAINER */}
        <div className="flex justify-end gap-3 pt-4">
          {!isEditing ? (
            <button 
              type="button" 
              onClick={() => setIsEditing(true)} 
              className="btn bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl px-6 font-bold shadow-md shadow-[#7C3AED]/20"
            >
              Edit Profile Settings
            </button>
          ) : (
            <>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="btn btn-outline border-base-300 rounded-xl px-6 font-bold"
              >
                Cancel Changes
              </button>
              <button 
                type="submit" 
                className="btn bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl px-6 font-bold shadow-md shadow-[#7C3AED]/20"
              >
                Save Profile Parameters
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;