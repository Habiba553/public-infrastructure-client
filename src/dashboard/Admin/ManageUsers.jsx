import { useEffect, useState } from "react";

import axios from "axios";

import Swal from "sweetalert2";

const ManageUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    secureAxios.get('http://localhost:5000/users')
      .then(res => {
        setUsers(res.data);
      });

  }, []);

  const handleMakeAdmin = async id => {

    const res = await secureAxios.patch(
      `http://localhost:5000/users/admin/${id}`
    );

    if (res.data.modifiedCount > 0) {

      Swal.fire({
        icon: 'success',
        title: 'User is now Admin'
      });

      location.reload();
    }
  };

  const handleBlockUser = async id => {

    const res = await secureAxios.patch(
      `http://localhost:5000/users/block/${id}`
    );

    if (res.data.modifiedCount > 0) {

      Swal.fire({
        icon: 'success',
        title: 'User Blocked'
      });

      location.reload();
    }
  };

  const handleDeleteUser = async id => {

    const result = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true
    });

    if (result.isConfirmed) {

      const res = await secureAxios.delete(
        `http://localhost:5000/users/${id}`
      );

      if (res.data.deletedCount > 0) {

        Swal.fire({
          icon: 'success',
          title: 'User Deleted'
        });

        location.reload();
      }
    }
  };
  const token = localStorage.getItem('access-token');
const secureAxios = axios.create({

  headers: {
    authorization: `Bearer ${token}`
  }
});

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        Manage Users
      </h1>

      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {
              users.map(user => (

                <tr key={user._id}>

                  <td>
                    {user.name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    {user.role}
                  </td>

                  <td className="space-x-2">

                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Make Admin
                    </button>

                    <button
                      onClick={() => handleBlockUser(user._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Block
                    </button>

                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageUsers;