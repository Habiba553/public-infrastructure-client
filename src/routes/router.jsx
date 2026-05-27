import {
  createBrowserRouter,
} from "react-router-dom";

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

import AdminRoute from "./AdminRoute";

import AdminHome from "../dashboard/Admin/AdminHome";
import ManageUsers from "../dashboard/Admin/ManageUsers";
import ManageIssues from "../dashboard/Admin/ManageIssues";
import Payment from "../dashboard/Citizen/Payment";
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
  }, // <-- THIS COMMA WAS MISSING

  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [

      {
        path: '/dashboard',
        element: <CitizenHome />
      },
    
      {
        path: '/dashboard/my-issues',
        element: <MyIssues />
      },
    
      {
        path: '/dashboard/report-issue',
        element: <ReportIssue />
      },
    
      {
        path: '/dashboard/profile',
        element: <Profile />
      },
    
      {
        path: '/dashboard/admin-home',
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        )
      },
    
      {
        path: '/dashboard/manage-users',
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        )
      },
    
      {
        path: '/dashboard/manage-issues',
        element: (
          <AdminRoute>
            <ManageIssues />
          </AdminRoute>
        )
      },
      {
        path: '/dashboard/payment',
        element: <Payment />
      }
    
    ]
  }
]);

export default router;