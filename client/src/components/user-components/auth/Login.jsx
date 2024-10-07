import React, { useEffect, useState } from "react";
// import png from "../../../images/favicon.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/user-features/userAuthSlice";
import { toast } from "react-toastify";
import InputBox from "../../InputBox";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userAuth);
  const { isLoading, error, isUserVerified, isUserLogin } = data;

  useEffect(() => {
    if (isUserLogin) {
      navigate("/user/home");
      toast.success("User login successfully");

      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });
    }
  }, [isUserLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        login({
          email: formData.email,
          password: formData.password,
        })
      );
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <div className="flex w-full flex-wrap px-4 bg-custom-green min-h-screen">
      <div className="w-full px-4 my-auto">
        <div className="relative mx-auto max-w-[525px] rounded-xl border-4 bg-custom-light border-solid px-10 py-16 text-center sm:px-12 md:px-[60px]">
          <div className="mb-5 mt-0 text-center md:mb-5">
            <h1 className="text-custom-green mt-0 text-center font-extrabold text-2xl ">
              Pathology Solution <br /> Online+
            </h1>

            <h2 className="text-black font-medium text-xl mt-5">
              Welcome Back
            </h2>
          </div>
          {isUserVerified === false ? (
            <p className="text-start text-sm capitalize text-red-400">
              Please Verify your account. A verification link already sent to
              your email address
            </p>
          ) : (
            error && (
              <p className="text-xl text-red-400">
                {/* 'Please Fill Details Properly' */}
                {error}
              </p>
            )
          )}
          <div className="mt-2">
            <InputBox
              lable="Email"
              type="email"
              className="border-custom-green"
              name="email"
              placeholder="Enter Email..."
              value={formData.email}
              onChange={handleChange}
            />
            <InputBox
              lable="Password"
              type="text"
              className="border-custom-green"
              name="password"
              placeholder="Enter Password..."
              value={formData.password}
              onChange={handleChange}
            />

            <div className="mb-10">
              <button
                type="submit" // Change type to button
                onClick={handleSubmit} // Handle click event directly
                className="w-full rounded-md  bg-custom-green px-5 py-3 font-medium text-white transition hover:bg-opacity-90"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </div>

          {/* Link to registration page */}
          <p className="text-body-color text-base">
            <span className="pr-0.5">Don’t have an account?</span>
            <Link to="/user/register" className="text-red-400 hover:underline">
              {" "}
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
