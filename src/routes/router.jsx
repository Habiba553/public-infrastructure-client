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
  }
]);

export default router;