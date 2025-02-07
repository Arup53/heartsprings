import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Biodata from "../pages/Biodata/Biodata";
import BiodataDetails from "../pages/Biodata/BiodataDetails";
import CheckOut from "../pages/CheckOut/CheckOut";
import Dasboard from "../layout/Dasboard";
import BiodataForm from "../pages/Dashboard/User/EditBiodata/BiodataForm";
import ViewBiodata from "../pages/Dashboard/User/ViewBioData/ViewBioData";
import MyFavourite from "../pages/Dashboard/User/MyFavourite/MyFavourite";
import MangeUsers from "../pages/Dashboard/MangeUsers/MangeUsers";
import ApprovePremium from "../pages/Dashboard/Admin/ApprovePremium/ApprovePremium";
import ApprovedContactReq from "../pages/Dashboard/Admin/ApprovedContactReq/ApprovedContactReq";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard/AdminDashboard";
import UserDashBoard from "../pages/Dashboard/User/UserDashBoard/UserDashBoard";
import SuccessStory from "../pages/Dashboard/Admin/Success_Story/SuccessStory";
import MyContactRequest from "../pages/Dashboard/User/ContactRequest/MyContactRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      // biodata
      {
        path: "/biodata",
        element: <Biodata />,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },

      // login and signup
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dasboard />
      </PrivateRoute>
    ),
    children: [
      // admin
      {
        path: "adminDashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "mangeUsers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <MangeUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "approvePremium",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ApprovePremium />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "approvedContactRequest",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ApprovedContactReq />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "success_story",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SuccessStory />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      //user
      {
        path: "userdashboard",
        element: (
          <PrivateRoute>
            <UserDashBoard />
          </PrivateRoute>
        ),
      },
      {
        path: "editBiodata",
        element: (
          <PrivateRoute>
            <BiodataForm />
          </PrivateRoute>
        ),
      },
      {
        path: "viewBiodata",
        element: (
          <PrivateRoute>
            <ViewBiodata />,
          </PrivateRoute>
        ),
      },
      {
        path: "myContactRequest",
        element: (
          <PrivateRoute>
            <MyContactRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "myFavourite",
        element: (
          <PrivateRoute>
            <MyFavourite />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
