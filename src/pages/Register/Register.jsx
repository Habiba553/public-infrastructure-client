import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import useAuth from "../../hooks/useAuth";

import axios from "axios";

const Register = () => {

  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  const {
    createUser,
    updateUser
  } = useAuth();

  const navigate = useNavigate();

  const onSubmit = data => {

    createUser(data.email, data.password)
      .then(async result => {

        await updateUser(
          data.name,
          data.photo
        );

        const userInfo = {
          name: data.name,
          email: data.email,
          photo: data.photo
        };

        await axios.post(
          'http://localhost:5000/users',
          userInfo
        );

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful'
        });

        reset();

        navigate('/');

      })
      .catch(error => {

        Swal.fire({
          icon: 'error',
          title: error.message
        });

      });
  };

  return (

    <div className="hero min-h-screen bg-base-200">

      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">

        <div className="card-body">

          <h1 className="text-4xl font-bold text-center">
            Register
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-5"
          >

            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register("name")}
            />

            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full"
              {...register("photo")}
            />

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email")}
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password")}
            />

            <button className="btn btn-primary w-full">
              Register
            </button>

          </form>

          <p className="text-center mt-4">

            Already have an account?

            <Link
              to='/login'
              className="text-primary ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;