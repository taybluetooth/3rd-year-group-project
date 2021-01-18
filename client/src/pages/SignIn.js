import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from "../components/Navbar.js";
import ReactDOM from 'react-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Formik, Field, Form } from 'formik';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const user = <FontAwesomeIcon icon={faUser} class="text-gray-400 text-xs"/>

const SignIn = () => {

  return (
    <div>
      <div class="flex items-center h-screen w-full bg-indigo-700">
        <div class="max-w-xs w-full m-auto bg-white rounded p-5">
          <Formik initialValues={{firstName: '', lastName: '', email: '',}}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
          >
            <Form class="mb-6 p-8">
              <div class="flex flex-col mb-4 text-center text-lg">
                <span class="text-indigo-700 text-md"> Flock </span>
                <span> Sign In To Your Account </span>
              </div>

              <div class="flex flex-col mb-4">
                <label htmlFor="username" class="text-gray-400 text-xs">Username</label>
                <Field class="rounded border py-2 px-3 text-grey-darkest text-xs" id="firstName" name="firstName" placeholder= "Type your username"/>
              </div>

              <div class="flex flex-col mb-4">
                <label htmlFor="password" class="text-gray-400 text-xs">Password</label>
                <Field class="rounded border py-2 px-3 text-grey-darkest text-xs" id="lastName" name="lastName" placeholder="Type your password"/>
              </div>

              <div class="flex flex-col mb-4">
                <button type="submit" class="rounded p-2 bg-indigo-700 text-white text-md">Login</button>
              </div>

              <div class="flex flex-col mb-4 pt-6">
                <label htmlFor="password" class="text-gray-400 text-xs text-center mb-4">Or Sign Up Using</label>
                <button type="submit" class="text-gray-400 text-xs">Sign Up</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
