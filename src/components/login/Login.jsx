import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/user";
import { setError } from "../../reducers/userReducer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [btnPressed, setBtnPressed] = useState(false);
  const isError = useSelector((state) => state.user.error.isError);
  const errorMessage = useSelector((state) => state.user.error.message);
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    setBtnPressed(true);
    const inputErrors = {};

    if (email.trim() === "") {
      inputErrors.email = "Email is required";
    }
    if (password.trim() === "") {
      inputErrors.password = "Password is required";
    }

    if (Object.keys(inputErrors).length === 0) {
      setErrors({});
      dispatch(login(email, password));
    } else {
      setErrors(inputErrors);
    }
  };

  useEffect(() => {
    if (isError) {
      setErrors({
        error: errorMessage,
      });
      const error = {
        isError: false,
        message: "",
      };
      dispatch(setError(error));
    } else {
      if (isAuth) {
        setErrors({
          error: "",
        });
        navigate("/myTasks");
      }
    }
  }, [isError, isAuth]);

  return (
    <section className="bg-gray-50">
      <div className="flex items-center justify-center px-6 mt-28">
        <div className="w-full max-w-md bg-white rounded-lg shadow">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="name@company.com"
                required=""
                onChange={handleChange}
                value={email}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                required=""
                onChange={handleChange}
                value={password}
              />
            </div>
            <button
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleSubmit}
            >
              Sign in
            </button>
            {btnPressed && (
              <div className="text-red-700 text-sm absolute bottom-5 right-5 p-2.5 border rounded-lg select-none border-red-500">
                {errors.email ||
                  errors.password ||
                  (errors.error != "" && errors.error) && (
                    <div>
                      {errors.email && (
                        <p className="border-b">{errors.email}</p>
                      )}
                      {errors.password && (
                        <p className="border-b">{errors.password}</p>
                      )}
                      {errors.error && (
                        <p className="border-b">{errors.error}</p>
                      )}
                    </div>
                  )}
              </div>
            )}
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{" "}
              <Link
                to="/registration"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;