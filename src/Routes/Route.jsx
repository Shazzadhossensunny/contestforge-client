import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root.jsx";
import Error from "../Pages/Error.jsx";
import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import Dashboard from "../Root/Dashboard.jsx";
import AddContest from "../Pages/Dhasboard/AddContest.jsx";

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
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Register></Register>
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
        }

    ]
  }
]);
