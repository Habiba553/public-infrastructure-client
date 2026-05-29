import { Link, NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaExclamationTriangle,
  FaUsers,
  FaTasks,
  FaMoneyBill,
  FaArrowLeft,
  FaShieldAlt,
  FaUserCog
} from "react-icons/fa";

const DashboardLayout = () => {
  const [role] = useRole();

  // Helper function to cleanly manage active styling configurations across tabs
  const linkStyles = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
      isActive
        ? "bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/20"
        : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
    }`;

  return (
    <div className="flex min-h-screen bg-base-100 text-base-content font-sans antialiased">
      
      {/* SIDEBAR NAVIGATION BLOCK */}
      <aside className="w-64 md:w-72 bg-base-200 border-r border-base-300 flex flex-col justify-between sticky top-0 h-screen overflow-y-auto">
        
        <div className="p-6 space-y-6">
          {/* Header Identity Display Panel */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-[#7C3AED] text-white rounded-xl flex items-center justify-center text-xl shadow-md">
              {role === 'admin' ? <FaShieldAlt /> : role === 'staff' ? <FaUserCog /> : <FaUser />}
            </div>
            <div>
              <h2 className="font-extrabold text-md tracking-tight uppercase">IMS Panel</h2>
              <p className="text-xs font-bold text-[#7C3AED] capitalize tracking-wide">{role || "User"} Account</p>
            </div>
          </div>

          <hr className="border-base-300" />

          {/* Navigation Links List */}
          <nav>
            <ul className="space-y-2">
              
              {/* CITIZEN INTERFACE */}
              {role === 'citizen' && (
                <>
                  <li>
                    <NavLink to='/' className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#7C3AED] hover:bg-[#7C3AED]/10 transition-colors mb-4">
                      <FaArrowLeft className="text-xs" /> Back To Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard' end className={linkStyles}>
                      <FaHome className="text-lg" /> Dashboard Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/profile' className={linkStyles}>
                      <FaUser className="text-lg" /> Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/my-issues' className={linkStyles}>
                      <FaClipboardList className="text-lg" /> My Issues
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/report-issue' className={linkStyles}>
                      <FaExclamationTriangle className="text-lg" /> Report Issue
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/payment' className={linkStyles}>
                      <FaMoneyBill className="text-lg" /> Payment
                    </NavLink>
                  </li>
                </>
              )}

              {/* ADMIN INTERFACE */}
              {role === 'admin' && (
                <>
                  <li>
                    <NavLink to='/' className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#7C3AED] hover:bg-[#7C3AED]/10 transition-colors mb-4">
                      <FaArrowLeft className="text-xs" /> Back To Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/admin-home' className={linkStyles}>
                      <FaHome className="text-lg" /> Admin Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/manage-users' className={linkStyles}>
                      <FaUsers className="text-lg" /> Manage Users
                    </NavLink>
                    <li>
  <NavLink to='admin-profile' className={linkStyles}>
    <FaUser className="text-lg" /> Profile Settings
  </NavLink>
</li>
                  </li>
                  <li>
                    <NavLink to='/dashboard/manage-issues' className={linkStyles}>
                      <FaClipboardList className="text-lg" /> Manage Issues
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='manage-staff' className={linkStyles}>
                      <FaTasks className="text-lg" /> Manage Staff
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='payments' className={linkStyles}>
                      <FaMoneyBill className="text-lg" /> Payments
                    </NavLink>
                  </li>
                </>
              )}

              {/* STAFF INTERFACE */}
              {role === 'staff' && (
                <>
                <li>
                    <NavLink to='/' className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#7C3AED] hover:bg-[#7C3AED]/10 transition-colors mb-4">
                      <FaArrowLeft className="text-xs" /> Back To Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/staff-home' className={linkStyles}>
                      <FaHome className="text-lg" /> Staff Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/assigned-issues' className={linkStyles}>
                      <FaTasks className="text-lg" /> Assigned Issues
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/staff-profile' className={linkStyles}>
                      <FaUser className="text-lg" /> Profile
                    </NavLink>
                  </li>
                </>
              )}

            </ul>
          </nav>
        </div>

        {/* Optional Branding Footer Signature */}
        <div className="p-6 text-center text-xs opacity-40 font-medium">
          © 2026 City Infrastructure
        </div>
      </aside>

      {/* CORE ROUTING OUTPUT CONTAINER */}
      <main className="flex-1 overflow-y-auto h-screen bg-base-100 p-6 md:p-10 lg:p-12">
        <div className="max-w-6xl mx-auto bg-base-100 min-h-full rounded-3xl">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;