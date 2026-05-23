import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Navbar = () => {

  const {
    user,
    logoutUser
  } = useAuth();

  const handleLogout = () => {

    logoutUser()
      .then(() => {})
      .catch(() => {});
  };

  return (

    <div className="navbar bg-base-100 shadow-sm px-10">

      <div className="flex-1">

        <Link
          to='/'
          className="text-2xl font-bold"
        >
          Infrastructure Reporter
        </Link>

      </div>

      <div className="flex gap-5 items-center">

        <Link to='/'>
          Home
        </Link>

        <Link to='/all-issues'>
          All Issues
        </Link>

        {
          user ? (

            <>

            <>

<Link to='/dashboard'>
  Dashboard
</Link>

<img
  src={user.photoURL}
  alt=""
  className="w-10 h-10 rounded-full"
/>

<button
  onClick={handleLogout}
  className="btn btn-sm"
>
  Logout
</button>

</>

            </>

          ) : (

            <Link to='/login'>
              Login
            </Link>
            

          )
        }

      </div>

    </div>
  );
};

export default Navbar;