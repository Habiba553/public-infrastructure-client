import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const StaffProfile = () => {

  const { user, updateUserProfile } = useAuth();

  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios.get(
      `http://localhost:5000/users/profile/${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${
            localStorage.getItem("access-token")
          }`
        }
      }
    )
    .then(res => {

      setUserInfo(res.data);
      setLoading(false);

    });

  }, [user]);

  const handleUpdateProfile = async (e) => {

    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const photo = form.photo.value;

    await updateUserProfile(name, photo);

    const updatedData = {
      name,
      photo
    };

    const result = await axios.put(
      `http://localhost:5000/users/profile/${user.email}`,
      updatedData,
      {
        headers: {
          authorization: `Bearer ${
            localStorage.getItem("access-token")
          }`
        }
      }
    );

    if (result.data.modifiedCount > 0) {

      setUserInfo({
        ...userInfo,
        name,
        photo
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated Successfully"
      });
    }
  };

  if (loading) {

    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (

    <div className="max-w-5xl mx-auto">

      <h1 className="text-5xl font-bold mb-10">
        Staff Profile
      </h1>

      {/* PROFILE CARD */}

      <div className="bg-base-100 rounded-3xl shadow-xl p-10">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <img
            src={userInfo.photo}
            alt=""
            className="w-40 h-40 rounded-full border-4 border-secondary"
          />

          <div>

            <h2 className="text-4xl font-bold">

              {userInfo.name}

              <span className="badge badge-secondary ml-4">
                STAFF
              </span>

            </h2>

            <p className="text-lg mt-3">
              {userInfo.email}
            </p>

            <p className="mt-2">
              Phone: {userInfo.phone}
            </p>

            <p className="mt-2 capitalize">
              Role: {userInfo.role}
            </p>

          </div>

        </div>

      </div>

      {/* UPDATE PROFILE */}

      <div className="bg-base-100 shadow-xl rounded-3xl p-10 mt-10">

        <h2 className="text-3xl font-bold mb-8">
          Update Profile
        </h2>

        <form
          onSubmit={handleUpdateProfile}
          className="space-y-6"
        >

          <div>

            <label className="font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              defaultValue={userInfo.name}
              className="input input-bordered w-full"
            />

          </div>

          <div>

            <label className="font-semibold">
              Photo URL
            </label>

            <input
              type="text"
              name="photo"
              defaultValue={userInfo.photo}
              className="input input-bordered w-full"
            />

          </div>

          <button
            type="submit"
            className="btn btn-secondary cursor-pointer"
          >
            Update Profile
          </button>

        </form>

      </div>

    </div>
  );
};

export default StaffProfile;