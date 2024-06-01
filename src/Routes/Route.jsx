import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root.jsx";
import Error from "../Pages/Error.jsx";
import Home from "../Pages/Home/Home.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        }
    ]
  },
]);
