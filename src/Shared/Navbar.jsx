import { Link, NavLink } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const { user, logOut, loading } = UseAuth();
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logout");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (loading) return <Loading></Loading>;

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
              <li className="text-xl font-semibold">
              <NavLink to="/leaderBoard">LeaderBoard</NavLink>
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
            <li className="text-xl font-semibold">
              <NavLink to="/leaderBoard">LeaderBoard</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end space-x-3">
          {/* toggle */}
          <label className="cursor-pointer grid place-items-center">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "light" ? false : true}
              className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
            />
            <svg
              className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
          {/* toggle */}

          {/* image */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-2"
              >
                <li>
                  <p className="flex justify-center">{user?.displayName || "No name found"}</p>
                </li>
                <li>
                  <Link className="bg-green-300 flex justify-center" to="dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="py-2 px-2 bg-[#00c1f1] flex justify-center text-white text-base hover:text-black"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-sm lg:btn-md bg-[#00c1f1] text-white text-lg font-semibold">
                Login
              </button>
            </Link>
          )}

          {/* image */}
        </div>
      </div>
    </div>
  );
}
