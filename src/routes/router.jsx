import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllIssues from "../pages/AllIssues/AllIssues";
import IssueDetails from "../pages/IssueDetails/IssueDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import CitizenHome from "../dashboard/Citizen/CitizenHome";
import MyIssues from "../dashboard/Citizen/MyIssues";
import ReportIssue from "../dashboard/Citizen/ReportIssue";
import Profile from "../dashboard/Citizen/Profile";
import StaffHome from "../dashboard/Staff/StaffHome";
import AssignedIssues from "../dashboard/Staff/AssignedIssues";
import StaffProfile from "../dashboard/Staff/StaffProfile";
import AdminRoute from "./AdminRoute";
import ManageStaff from "../dashboard/Admin/ManageStaff";
import Payments from "../dashboard/Admin/Payments";
import AdminHome from "../dashboard/Admin/AdminHome";
import ManageUsers from "../dashboard/Admin/ManageUsers";
import ManageIssues from "../dashboard/Admin/ManageIssues";
import AdminProfile from "../dashboard/Admin/AdminProfile";
import Payment from "../dashboard/Citizen/Payment";
import UpdateIssue from "../dashboard/Citizen/UpdateIssue";

// 1. IMPORT YOUR USE_ROLE HOOK
import useRole from "../hooks/useRole"; 

// 2. CREATE THE DYNAMIC GATEKEEPER COMPONENT
const DashboardIndex = () => {
  const [role, isBlocked, loading] = useRole();

  console.log("ROLE =", role);

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center p-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Redirect based strictly on authenticated role parameters
  if (role === 'admin') return <Navigate to="admin-home" replace />;
  if (role === 'staff') return <Navigate to="staff-home" replace />;
  
  // Default citizen fallback
  return <CitizenHome />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/all-issues',
        element: <AllIssues />
      },
      {
        path: '/issue-details/:id',
        element: <IssueDetails />
      }
    ]
  }, 
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      
      {
        index: true,
        element: <DashboardIndex />
      },
      {
        path: 'my-issues',
        element: <MyIssues />
      },
      {
        path: 'report-issue',
        element: <ReportIssue />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'admin-home',
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        )
      },
      {
        path: 'manage-users', 
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        )
      },
      {
        path: 'manage-issues', 
        element: (
          <AdminRoute>
            <ManageIssues />
          </AdminRoute>
        )
      },
      {
        path: 'admin-profile',
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        )
      },
      {
        path: "manage-staff",
        element: (
          <AdminRoute>
            <ManageStaff />
          </AdminRoute>
        )
      },
      {
        path: "payments",
        element: (
          <AdminRoute>
            <Payments />
          </AdminRoute>
        )
      },
      {
        path: 'payment', // 👈 Clean relative path
        element: <Payment />
      },
      {
        path: 'update-issue/:id', // 👈 Clean relative path
        element: <UpdateIssue />
      },
      {
        path: 'staff-home',
        element: <StaffHome />
      },
      {
        path: 'assigned-issues',
        element: <AssignedIssues />
      },
      {
        path: 'staff-profile',
        element: <StaffProfile />
      }
    ]
  }
]);

export default router;