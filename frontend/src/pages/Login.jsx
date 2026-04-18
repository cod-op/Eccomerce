import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 mx-auto mt-14 gap-4 text-gray-800 bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-5">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[2.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter your name...."
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter your email...."
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter your password...."
      />
      <div className="w-full flex justify-between text-sm mt-[-8px] font-medium">
        <p className="cursor-pointer  ">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer "
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer "
          >
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4 rounded-sm hover:bg-gray-700">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
