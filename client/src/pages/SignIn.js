import React, { useState, useEffect } from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { setUserSession } from "../utils/Common";
import { Redirect } from "react-router-dom";
import { Image } from "cloudinary-react";

import ReactNotification from 'react-notifications-component'
import {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


const SignIn = ({ isLogin, ...props }) => {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(false);
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const successNotification = () => {
    if(notification === false) {
      store.addNotification({
        title: "Login Successful",
        message: "Welcome back!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        },
      });
      setNotification(true);
    }
  }

  const handleLogin = async (values) => {
    setError(null);
    axios
      .post(`/api/user/${isLogin ? "login" : "signup"}`, values)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setError(false);
        console.dir(response);
        successNotification();
      })
      .catch((error) => {
        console.dir(error);
        setError(error.response.data.message);
      });
  };

  return error === false ? (
    <Redirect to="/feed" />
  ) : (
    <div className="overflow-hidden flex items-center h-screen w-full bg-custom-grey-A">
      <div className="max-w-xs shadow-md w-full m-auto bg-custom-grey-B rounded p-5">
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
              <form
                className="bg-custom-grey-B mb-6 p-8"
                onSubmit={handleSubmit}
              >
                <div className="w-20 h-10 flex mb-8 mx-auto justify-center">
                  <Image
                    cloudName="bluetooth"
                    className="bg-cover"
                    publicId="flock-logo-grey"
                    secure="true"
                  ></Image>
                </div>

                {!isLogin ? (
                  <div className="flex flex-col mb-4">
                    <label
                      htmlFor="displayName"
                      className="text-gray-400 text-xs"
                    >
                      Name
                    </label>
                    <Field
                      className="border-field py-2 px-3 text-white text-xs"
                      type="text"
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
                  <Field
                    className="border-field py-2 px-3 text-white text-xs"
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
                    <Field
                      className="border-field py-2 px-3 text-white text-xs"
                      type="email"
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
                  <Field
                    className="border-field py-2 px-3 text-white text-xs"
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

                <div className="flex flex-col justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded p-2 text-md gradient text-white"
                  >
                    {isSubmitting
                      ? "Loading..."
                      : isLogin
                      ? "Login"
                      : "Sign Up"}
                  </button>

                  <button
                    type="submit"
                    className="rounded p-2 text-md bg-color-custom-pink text-white"
                    onClick={() =>
                      (window.location.href = `/${
                        isLogin ? "signup" : "login"
                      }`)
                    }
                  >
                    {isLogin ? "Or Sign Up" : "Or Login"}
                  </button>
                </div>
              </form>
              {error ? <div style={{color: "red"}}>{error}</div> : null}
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
