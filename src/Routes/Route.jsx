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
          element: <ContentDetail></ContentDetail>,
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
          element:<Payment></Payment>

        }
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
        // contest creator
        {
            path: 'addContest',
            element: <AddContest></AddContest>
        },
        {
          path: 'myCreatedContest',
          element: <MyCreatedContest></MyCreatedContest>

        },
        {
          path: 'contestUpdate/:id',
          element: <ContestUpdate></ContestUpdate>,
          loader: ({params}) => fetch(`http://localhost:5000/addContest/${params.id}`)

        },
        {
          path: 'contestSubmitted',
          element: <ContestSubmitted></ContestSubmitted>

        },
        {
          path: 'submittedUser/:name',
          element: <SubmittedUser></SubmittedUser>

        },
        // admin
        {
          path: 'manageUser',
          element: <ManageUser></ManageUser>
        },
        {
          path: 'manageContest',
          element: <ManageContest></ManageContest>
        },
        // user
        {
          path: 'participatedContest',
          element: <ParticipatedContest></ParticipatedContest>
        }

    ]
  }
]);
