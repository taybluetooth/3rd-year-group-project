import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { setUserSession } from "../utils/Common";
import { Redirect } from "react-router-dom";

const user = (
  <FontAwesomeIcon icon={faUser} className="text-gray-400 text-xs" />
);

const SignIn = ({ isLogin, ...props }) => {
  const [error, setError] = useState(null);
  const [schema, setSchema] = useState({
    username: Yup.string()
      .max(15, "Maximum of 15 characters and minimum of 5 characters")
      .min(5, "Maximum of 15 characters and minimum of 5 characters")
      .required("Required"),
    password: Yup.string()
      .min(8, "Maximum of 75 characters and minimum of 8 characters")
      .max(75, "Maximum of 75 characters and minimum of 8 characters")
      .required("Required"),
  });

  useEffect(() => {
    if (!isLogin) {
      setSchema({
        ...schema,
        email: Yup.string()
          .email()
          .required("Required")
          .max(255, "Maximum of 255 characters"),
        displayName: Yup.string()
          .required("Required")
          .max(70, "Maximum of 70 characters and minimum of 1 character"),
      });
    }
  }, []);

  const handleLogin = async (values) => {
    setError(null);
    // setLoading(true);
    return axios
      .post(`/api/user/${isLogin ? "login" : "signup"}`, values)
      .then((response) => {
        // setLoading(false);
        setUserSession(response.data.token, response.data.user);
        // props.history.push("/dashboard");
        setError(false);
        console.dir(response);
      })
      .catch((error) => {
        console.dir(error);
        setError(error.response.data.message);
        // setLoading(false);
        // if (error.response.status === 401)
        //   setError(error.response.data.message);
        // else setError("Something went wrong. Please try again later.");
      });
  };

  return error === false ? (
    <Redirect to="/profiletest"></Redirect>
  ) : (
    <div className="flex items-center h-screen w-full bg-indigo-700">
      <div className="max-w-xs shadow-md w-full m-auto bg-white rounded p-5">
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
            displayName: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            handleLogin(values).finally(() => setSubmitting(false));
          }}
          validationSchema={Yup.object(schema)}
        >
          {({ handleSubmit, touched, errors, getFieldProps, isSubmitting }) => (
            <>
              <form className="mb-6 p-8" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4 text-center text-lg">
                  <span className="text-indigo-700 text-md"> Flock </span>
                  <span>
                    {isLogin ? "Login to your" : "Sign up for an"} Account
                  </span>
                </div>

                {!isLogin ? (
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="displayName"
                      className="text-gray-400 text-xs"
                    >
                      Name
                    </label>
                    <input
                      className="rounded border py-2 px-3 text-grey-darkest text-xs"
                      type="text"
                      // autoComplete="new-username"
                      {...getFieldProps("displayName")}
                    />
                    {touched.displayName && errors.displayName ? (
                      <p className="text-red-500 text-xs italic">
                        {errors.displayName}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <div className="flex flex-col mb-4">
                  <label htmlFor="username" className="text-gray-400 text-xs">
                    Username
                  </label>
                  <input
                    className="rounded border py-2 px-3 text-grey-darkest text-xs"
                    type="text"
                    autoComplete="new-username"
                    {...getFieldProps("username")}
                  />
                  {touched.username && errors.username ? (
                    <p className="text-red-500 text-xs italic">
                      {errors.username}
                    </p>
                  ) : null}
                </div>

                {!isLogin ? (
                  <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="text-gray-400 text-xs">
                      Email
                    </label>
                    <input
                      className="rounded border py-2 px-3 text-grey-darkest text-xs"
                      type="email"
                      // autoComplete="new-username"
                      {...getFieldProps("email")}
                    />
                    {touched.email && errors.email ? (
                      <p className="text-red-500 text-xs italic">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <div className="flex flex-col mb-4">
                  <label htmlFor="password" className="text-gray-400 text-xs">
                    Password
                  </label>
                  <input
                    className="rounded border py-2 px-3 text-grey-darkest text-xs"
                    type="password"
                    autoComplete="new-password"
                    {...getFieldProps("password")}
                  />
                  {errors.password && touched.password ? (
                    <p className="text-red-500 text-xs italic">
                      {errors.password}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col mb-4">
                  <button
                    type="submit"
                    // value={loading ? "Loading..." : "Login"}
                    // onClick={handleLogin}
                    disabled={isSubmitting}
                    className="rounded p-2 text-md bg-indigo-700 text-white"
                  >
                    {isSubmitting
                      ? "Loading..."
                      : isLogin
                      ? "Login"
                      : "Sign Up"}
                  </button>
                </div>

                <div className="flex flex-col">
                  <button
                    type="submit"
                    className="rounded p-2 text-md bg-gray-700 text-white"
                    onClick={() =>
                      props.history.push(`/${isLogin ? "signup" : "login"}`)
                    }
                  >
                    {isLogin ? "Or Sign Up" : "Or Login"}
                  </button>
                </div>

                {/* <div className="flex flex-col mb-4 pt-6">
                  <label
                    htmlFor="password"
                    className="text-gray-400 text-xs text-center mb-4"
                  >
                    Or Sign Up Using
                  </label>
                  <button type="submit" className="text-gray-400 text-xs">
                    Sign Up
                  </button>
                </div> */}
              </form>
              {error ? <div className="">{error}</div> : null}
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;