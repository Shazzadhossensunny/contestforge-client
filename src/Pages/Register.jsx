import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useForm } from "react-hook-form";
import UseAuth from "../Hooks/UseAuth";
import { toast } from "react-toastify";

export default function Register() {
  const [disabled, setDisabled] = useState(true);
  const { createUser, updateUserProfile, user, setUser} = UseAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
 const navigate = useNavigate();
 const location = useLocation();
 useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

 useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
const from = location.state || "/";
console.log(from)




  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name, data.photo).then(() => {
          setUser({
            ...result?.user,
            photoURL: data.photo,
            displayName: data.name,
          });
          toast.success('Successfully Register');
          navigate(from, { replace: true });

        });
      })
      .catch((error) => {
        console.log(error.message);
      });
    reset();
  };

  const handleCaptha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value) == true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="text-center lg:text-left"></div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Register!</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
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
                {errors.password?.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  {...register("photo", { required: true })}
                  type="text"
                  placeholder="Photo url"
                  className="input input-bordered"
                />
                {errors.photo && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleCaptha}
                  type="text"
                  placeholder="Type Captcha"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-6">
                <button
                  disabled={disabled}
                  className="btn bg-[#00c1f1] text-white text-lg"
                >
                  Register
                </button>
              </div>
            </form>
            <p>
              <div className="divider text-gray-400">
                OR
                <Link className="btn-link text-gray-400" to="/login">
                  Login
                </Link>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
