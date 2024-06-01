import { Link, NavLink } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import { toast } from "react-toastify";

export default function Navbar() {
    const {user, logOut} = UseAuth()
    const handleLogOut = () => {
        logOut()
        .then(()=>{
            toast.success('Successfully logout');

        })
        .catch((error)=>{
            console.log(error.message)
        })
    }

  return (
    <div className="bg-[#00c1f11f]">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="text-xl font-semibold">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="text-xl font-semibold">
                <NavLink to="/allContest">All Contest</NavLink>
              </li>
            </ul>
          </div>
          <Link to="/" className="tex-lg lg:text-3xl font-bold">
            ContestForge
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6">
            <li className="text-xl font-semibold">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="text-xl font-semibold">
              <NavLink to="/allContest">All Contest</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end space-x-3">
          {/* image */}
          {
            user && <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <p>
                 {user?.displayName || "No name found"}
                </p>
              </li>
              <li>
                <Link to="dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogOut} className="btn btn-md btn-primary">Logout</button>
              </li>
            </ul>
          </div>
          }

          {/* image */}
          <Link to='/login'>
          <button className="btn btn-sm lg:btn-md bg-[#00c1f1] text-white text-lg font-semibold">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
