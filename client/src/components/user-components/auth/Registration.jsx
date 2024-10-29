import React, { useEffect, useState } from "react";
import logo from "../../../assets/image.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../../features/user-features/userAuthSlice.js";
import InputBox from "../../InputBox.jsx";
import { useDispatch, useSelector } from "react-redux";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const discpatch = useDispatch();
  const { isLoading, error, isUserVerified, isUserLogin } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (isUserVerified === false) {
      navigate("/user/login");
      toast.success("User register successfully");
      toast.info(
        "Please Verify your account. A verification link already sent to your email address",
        { position: "top-center" }
      );
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });
    }
  }, [isUserVerified]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      discpatch(
        register({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="my-4 flex w-full min-h-screen flex-wrap px-4 mt-0 bg-custom-green">
      <div className="w-full px-4 my-auto ">
        <div className="relative max-w-[700px] md:max-w-[525px] lg:max-w-[525px] rounded-xl border-2 mx-auto border-solid bg-custom-light px-10 py-8 text-center sm:px-12 md:px-[60px]">
          <div className="mb-5 flex flex-col items-center text-center md:mb-5">
            <img src={logo} alt="Logo" />

            <h2 className="text-black font-medium text-xl mt-5">
              Create New Account
            </h2>
          </div>

          <p className="text-lg text-red-400">{error && error}</p>

          <InputBox
            lable="Full Name"
            type="text"
            className="border-custom-green"
            name="name"
            placeholder="Enter Full Name..."
            value={formData.name}
            onChange={handleChange}
          />
          <InputBox
            lable="Username"
            type="text"
            className="border-custom-green"
            name="username"
            placeholder="Enter Username..."
            value={formData.username}
            onChange={handleChange}
          />
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
              {isLoading ? "Loading..." : "Register"}
            </button>
          </div>
          <div>
            Already Have Account?{" "}
            <Link to={"/user/login"} className="text-red-400">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
