import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  PDFDownloadLink
} from "@react-pdf/renderer";
import InvoicePDF from
"../../components/InvoicePDF";
const Profile = () => {

  const { user, updateUserProfile } = useAuth();

  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  useEffect(() => {

    axios
      .get(
        `http://localhost:5000/users/${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              "access-token"
            )}`
          }
        }
      )
      .then((res) => {

        setUserInfo(res.data);
        setLoading(false);
      });
      axios.get(
        `http://localhost:5000/payments/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              "access-token"
            )}`
          }
        }
      )
      .then(res => {
        setPayments(res.data);
    
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

    const res = await axios.put(
      `http://localhost:5000/users/profile/${user.email}`,
      updatedData,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            "access-token"
          )}`
        }
      }
    );

    if (res.data.modifiedCount) {

      Swal.fire({
        icon: "success",
        title: "Profile Updated"
      });

      setUserInfo({
        ...userInfo,
        name,
        photo
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
        My Profile
      </h1>

      {/* BLOCK WARNING */}

      {
        userInfo.blocked && (

          <div className="alert alert-error mb-8">

          <div className="alert alert-error mb-8 shadow-lg">

<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
  />
</svg>

<div>

  <h3 className="font-bold">
    Account Blocked
  </h3>

  <div className="text-xs">
    Please contact the authorities to restore access.
  </div>

</div>

</div>

          </div>
        )
      }

      {/* PROFILE CARD */}

      <div className="bg-base-100 rounded-3xl shadow-xl p-10">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <img
            src={userInfo.photo}
            alt=""
            className="w-40 h-40 rounded-full border-4 border-primary"
          />

          <div>

            <h2 className="text-4xl font-bold">

              {userInfo.name}

              {
                userInfo.premium && (

                  <span className="badge badge-warning ml-4">
                    PREMIUM
                  </span>

                )
              }

            </h2>

            <p className="text-lg mt-3">
              {userInfo.email}
            </p>

            <p className="mt-2 capitalize">
              Role: {userInfo.role}
            </p>

          </div>

        </div>

      </div>

      {/* SUBSCRIPTION */}

      {
        !userInfo.premium && (

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-10 mt-10">

            <h2 className="text-3xl font-bold mb-3">

              Become Premium

            </h2>

            <p className="mb-5">

              Premium users can submit unlimited issues.

            </p>

            <Link
              to="/dashboard/payment"
              className="btn btn-warning"
            >
              Subscribe (1000 Tk)
            </Link>

          </div>

        )
      }

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
            className="btn btn-primary"
          >
            Update Profile
          </button>

        </form>

      </div>
      <div className="bg-base-100 shadow-xl rounded-3xl p-10 mt-10">

      <div className="mt-10">

<h2 className="text-3xl font-bold mb-6">

  Payment History

</h2>

</div>

{
  payments.length === 0 ? (

    <p className="text-gray-500">

      No payment records found.

    </p>

  ) : (

    payments.map(payment => (

      <div
  key={payment._id}
  className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 border-b py-4"
>

  <div>

    <p className="font-bold text-lg">

      ৳ {payment.amount}

    </p>

    <p className="text-sm text-gray-500">

      Transaction:
      {payment.transactionId}

    </p>

    <span className="badge badge-secondary mt-2">

      {payment.type}

    </span>

  </div>

  <div className="flex flex-col items-end gap-2">

    <p className="text-sm text-gray-500">

      {
        new Date(
          payment.createdAt || payment.date
        ).toLocaleDateString()
      }

    </p>

    <PDFDownloadLink
      document={
        <InvoicePDF payment={payment} />
      }
      fileName={`invoice-${payment.transactionId}.pdf`}
    >

      {({ loading }) => (

        <button
          className="
            px-4 py-2
            rounded-xl
            text-white
            font-semibold
            shadow-lg
            bg-gradient-to-r
            from-violet-600
            to-purple-600
            hover:from-violet-700
            hover:to-purple-700
            transition-all
            duration-300
          "
        >

          {
            loading
              ? "Preparing..."
              : "Download Invoice"
          }

        </button>

      )}

    </PDFDownloadLink>

  </div>

</div>

    ))

  )
}

</div>
    </div>
    
  );
};

export default Profile;