import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import useAuth from "../../hooks/useAuth";

const Login = () => {

  const {
    signInUser,
    signInWithGoogle
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || '/';

  const handleLogin = e => {

    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {

        Swal.fire({
          icon: 'success',
          title: 'Login Successful'
        });

        navigate(from);

      })
      .catch(error => {

        Swal.fire({
          icon: 'error',
          title: error.message
        });

      });
  };

  const handleGoogleLogin = () => {

    signInWithGoogle()
      .then(() => {

        Swal.fire({
          icon: 'success',
          title: 'Google Login Successful'
        });

        navigate(from);

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
  
        {/* Logo / Heading */}
  
        <div className="text-center mb-8">
  
          <h1 className="text-5xl font-extrabold text-primary">
  
            CivicTrack
  
          </h1>
  
          <p className="text-gray-600 mt-3">
  
            Report • Track • Resolve Community Issues
  
          </p>
  
        </div>
  
        {/* Login Card */}
  
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white">
  
          <h2 className="text-3xl font-bold text-center mb-2">
  
            Welcome Back 👋
  
          </h2>
  
          <p className="text-center text-gray-500 mb-8">
  
            Login to continue
  
          </p>
  
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
  
            <div>
  
              <label className="font-semibold">
                Email Address
              </label>
  
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full mt-2"
                required
              />
  
            </div>
  
            <div>
  
              <label className="font-semibold">
                Password
              </label>
  
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full mt-2"
                required
              />
  
            </div>
  
            <button
              className="btn btn-primary w-full text-lg"
            >
  
              Login
  
            </button>
  
          </form>
  
          <div className="divider">
  
            OR
  
          </div>
  
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
  
            Continue with Google
  
          </button>
  
          <p className="text-center mt-6">
  
            Don't have an account?
  
            <Link
              to="/register"
              className="text-primary font-bold ml-2"
            >
  
              Register
  
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

export default Login;