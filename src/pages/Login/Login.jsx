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

    <div className="hero min-h-screen bg-base-200">

      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">

        <div className="card-body">

          <h1 className="text-4xl font-bold text-center">
            Login
          </h1>

          <form
            onSubmit={handleLogin}
            className="space-y-4 mt-5"
          >

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />

            <button className="btn btn-primary w-full">
              Login
            </button>

          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full mt-4"
          >
            Google Login
          </button>

          <p className="text-center mt-4">

            Don't have an account?

            <Link
              to='/register'
              className="text-primary ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;