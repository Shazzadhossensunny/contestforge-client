import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="text-center lg:text-left"></div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <button className="flex items-center gap-2 justify-center my-4 border p-3 rounded-md text-xl font-semibold hover:bg-gray-200">
            <FcGoogle /> Login in with Google
            </button>
            <div className="divider"> OR Login with email</div>
            <form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-[#00c1f1] text-white text-lg">
                  Login
                </button>
              </div>
            </form>
            <p>
              <div className="divider text-gray-400">OR
              <Link className="btn-link text-gray-400" to="/register">
                Register
              </Link>

              </div>

            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
