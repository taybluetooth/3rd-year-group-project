import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.js";
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


const SignIn = () => {

  return (
    <div>
      <Navbar />
      <div class="flex items-center h-screen w-full">
        <div class="mx-auto bg-white rounded shadow-lg p-3 m-4">
          <Formik initialValues={{firstName: '', lastName: '', email: '',}}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
          >
            <Form class="mb-6">
              <div class="flex flex-col mb-4">
                <label htmlFor="username">Username</label>
                <Field class="border py-2 px-3 text-grey-darkest" id="firstName" name="firstName"/>
              </div>

              <div class="flex flex-col mb-4">
                <label htmlFor="password">Password</label>
                <Field class="border py-2 px-3 text-grey-darkest" id="lastName" name="lastName" />
              </div>

              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
