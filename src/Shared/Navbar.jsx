import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
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
          <Link to="/" className="text-3xl font-bold">
            ContestForge
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
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
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>
                  Profile
                </a>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
          {/* image */}
          <button className="btn">Login</button>
        </div>
      </div>
    </div>
  );
}