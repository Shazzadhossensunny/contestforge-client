import { Link } from "react-router-dom";


export default function Register() {
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content">
      <div className="text-center lg:text-left"></div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Register!</h1>
          <form>
          <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo url"
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
            <Link className="btn-link text-gray-400" to="/login">
              Login
            </Link>

            </div>

          </p>
        </div>
      </div>
    </div>
  </div>
  )
}
