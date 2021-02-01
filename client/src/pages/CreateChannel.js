import { Formik, Field } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { getToken } from "../utils/Common";
import Appbar from "../components/Appbar";
import axios from "axios";

const CreateChannel = (props) => {
  const token = getToken();
  const [error, setError] = useState(null);

  const handleCreateChannel = async (values) => {
    setError(null);
    axios
      .post("/api/channel", { token, ...values })
      .then((res) => {
        setError(false);
        alert("Channel was successfully created.");
        window.location.href = `/channel/${values.username}`;
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong, please try again.");
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          displayName: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          handleCreateChannel(values).finally(() => setSubmitting(false));
        }}
        validationSchema={Yup.object({
          displayName: Yup.string()
            .required("Required")
            .max(70, "Maximum of 70 characters and minimum of 1 character"),
          username: Yup.string()
            .max(15, "Maximum of 15 characters and minimum of 5 characters")
            .min(5, "Maximum of 15 characters and minimum of 5 characters")
            .required("Required"),
        })}
      >
        {({ handleSubmit, touched, errors, getFieldProps, isSubmitting }) => (
          <>
            {/* finish styling later */}
            <div className="flex items-center h-screen">
              <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
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

                <div className="flex flex-col justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded p-2 text-md gradient text-white"
                  >
                    {isSubmitting ? "Loading..." : "Create Channel"}
                  </button>
                </div>
              </form>
            </div>
            <Appbar />
          </>
        )}
      </Formik>
    </>
  );
};

export default CreateChannel;
