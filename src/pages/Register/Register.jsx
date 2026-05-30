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
          email: data.email.toLowerCase(),
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

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
  
      <div className="w-full max-w-md">
  
        {/* Logo */}
  
        <div className="text-center mb-8">
  
          <h1 className="text-5xl font-extrabold text-primary">
  
            CivicTrack
  
          </h1>
  
          <p className="text-gray-600 mt-3">
  
            Join the community and report issues around you
  
          </p>
  
        </div>
  
        {/* Register Card */}
  
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white">
  
          <h2 className="text-3xl font-bold text-center mb-2">
  
            Create Account 🚀
  
          </h2>
  
          <p className="text-center text-gray-500 mb-8">
  
            Register to start reporting issues
  
          </p>
  
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
  
            <div>
  
              <label className="font-semibold">
                Full Name
              </label>
  
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full mt-2"
                {...register("name")}
              />
  
            </div>
  
            <div>
  
              <label className="font-semibold">
                Photo URL
              </label>
  
              <input
                type="text"
                placeholder="Enter photo URL"
                className="input input-bordered w-full mt-2"
                {...register("photo")}
              />
  
            </div>
  
            <div>
  
              <label className="font-semibold">
                Email Address
              </label>
  
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full mt-2"
                {...register("email")}
              />
  
            </div>
  
            <div>
  
              <label className="font-semibold">
                Password
              </label>
  
              <input
                type="password"
                placeholder="Create password"
                className="input input-bordered w-full mt-2"
                {...register("password")}
              />
  
            </div>
  
            <button
              className="btn btn-primary w-full text-lg"
            >
  
              Create Account
  
            </button>
  
          </form>
  
          <p className="text-center mt-6">
  
            Already have an account?
  
            <Link
              to="/login"
              className="text-primary font-bold ml-2"
            >
  
              Login
  
            </Link>
  
          </p>
  
        </div>
  
        <p className="text-center text-sm text-gray-500 mt-6">
  
          Public Infrastructure Issue Reporting System
  
        </p>
  
      </div>
  
    </div>
  
  );
};

export default Register;