import { Link,NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";

import {

  FaHome,
  FaUser,
  FaClipboardList,
  FaExclamationTriangle,
  FaUsers,
  FaTasks,
  FaMoneyBill

} from "react-icons/fa";
const DashboardLayout = () => {

  const [role] = useRole();
  return (

    <div className="flex min-h-screen">

      {/* Sidebar */}
      <ul className="space-y-4">

  {
    role === 'citizen' && (
      <>
      <NavLink to='/'>
      Back To Home
            </NavLink>
        <li>
        <li>
  <Link to='/dashboard' className="flex items-center gap-3 hover:text-primary">
    <FaHome />
    Dashboard Home
  </Link>
</li>
        </li>

        <li>
          <NavLink to='/dashboard/profile'>
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink to='/dashboard/my-issues'>
            My Issues
          </NavLink>
        </li>

        <li>
          <NavLink to='/dashboard/report-issue'>
            Report Issue
          </NavLink>
        </li>
        <li>
        <NavLink to='/dashboard/payment'>
  Payment
</NavLink>
</li>

      </>
    )
  }

  {
    role === 'admin' && (
      <>
      <NavLink to='/'>
      Back To Home
            </NavLink>
        <li>
          <NavLink to='/dashboard/admin-home'>
            Admin Home
          </NavLink>
        </li>

        <li>
          <NavLink to='/dashboard/manage-users'>
            Manage Users
          </NavLink>
        </li>

        <li>
          <NavLink to='/dashboard/manage-issues'>
            Manage Issues
          </NavLink>
        </li>

      </>
    )
  }

</ul>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <Outlet />

      </div>

    </div>
  );
};

export default DashboardLayout;