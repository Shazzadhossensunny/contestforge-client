import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import UseAuth from "../Hooks/UseAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import UseAxiosCommon from "../Hooks/UseAxiosCommon";
import Loading from "../components/Loading";


export default function Login() {
  const { logInUser, googleSignIn, loading } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const axiosCommon = UseAxiosCommon();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    logInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully login");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
    reset();
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          image: result.user?.photoURL,
          role: "User",
          status: "Unblock",
        };
        axiosCommon.post("/users", userInfo).then((res) => {
          console.log(res.data);
          toast.success("Successfully login");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if(loading) return <Loading></Loading>

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="text-center lg:text-left"></div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center gap-2 justify-center my-4 border p-3 rounded-md text-xl font-semibold hover:bg-gray-200"
            >
              <FcGoogle /> Login in with Google
            </button>
            <div className="divider"> OR Login with email</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-[#00c1f1] text-white text-lg">
                  Login
                </button>
              </div>
            </form>
            <p>
              <div className="divider text-gray-400">
                OR
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
