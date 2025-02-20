import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/Error404/ErrorPage";
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";



const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [{ path: "/", element: <Home /> }],
  },

  {
    path: "/",
    element: <AuthLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);

export default Routes;
