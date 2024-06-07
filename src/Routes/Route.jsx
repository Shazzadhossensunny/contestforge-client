import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root.jsx";
import Error from "../Pages/Error.jsx";
import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import Dashboard from "../Root/Dashboard.jsx";
import AddContest from "../Pages/Dhasboard/AddContest.jsx";
import AllContest from "../Pages/AllContest.jsx";
import ContentDetail from "../Pages/ContentDetail.jsx";
import ManageUser from "../Pages/Dhasboard/ManageUser.jsx";
import Payment from "../Pages/Payment.jsx";
import MyCreatedContest from "../Pages/Dhasboard/MyCreatedContest.jsx";
import ContestUpdate from "../Pages/Dhasboard/ContestUpdate.jsx";
import ContestSubmitted from "../Pages/Dhasboard/ContestSubmitted.jsx";
import ManageContest from "../Pages/Dhasboard/ManageContest.jsx";
import ParticipatedContest from "../Pages/Dhasboard/ParticipatedContest.jsx";
import SubmittedUser from "../Pages/Dhasboard/SubmittedUser.jsx";
import WinningContest from "../Pages/Dhasboard/WinningContest.jsx";
import MyProfile from "../Pages/Dhasboard/MyProfile.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: "/allContest",
          element: <AllContest></AllContest>

        },
        {
          path: "/contentDetail/:id",
          element: <PrivateRoute><ContentDetail></ContentDetail></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/addContest/${params.id}`)
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
          path: "/payment",
          element:<PrivateRoute><Payment></Payment></PrivateRoute>

        }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [

        // contest creator
        {
            path: 'addContest',
            element: <PrivateRoute><AddContest></AddContest></PrivateRoute>
        },
        {
          path: 'myCreatedContest',
          element: <PrivateRoute><MyCreatedContest></MyCreatedContest></PrivateRoute>

        },
        {
          path: 'contestUpdate/:id',
          element: <PrivateRoute><ContestUpdate></ContestUpdate></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/addContest/${params.id}`)

        },
        {
          path: 'contestSubmitted',
          element: <PrivateRoute><ContestSubmitted></ContestSubmitted></PrivateRoute>

        },
        {
          path: 'submittedUser/:name',
          element: <PrivateRoute><SubmittedUser></SubmittedUser></PrivateRoute>

        },
        // admin
        {
          path: 'manageUser',
          element: <PrivateRoute><ManageUser></ManageUser></PrivateRoute>
        },
        {
          path: 'manageContest',
          element: <PrivateRoute><ManageContest></ManageContest></PrivateRoute>
        },
        // user
        {
          path: 'participatedContest',
          element: <PrivateRoute><ParticipatedContest></ParticipatedContest></PrivateRoute>
        },
        {
          path: 'winningContest',
          element: <PrivateRoute><WinningContest></WinningContest></PrivateRoute>
        },
        {
          path: 'myProfile',
          element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
        }

    ]
  }
]);
