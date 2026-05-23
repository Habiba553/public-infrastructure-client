import { Link } from "react-router-dom";

const Navbar = () => {
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

      <div className="flex gap-5">

        <Link to='/'>
          Home
        </Link>

        <Link to='/all-issues'>
          All Issues
        </Link>

        <Link to='/login'>
          Login
        </Link>

      </div>

    </div>
  );
};

export default Navbar;