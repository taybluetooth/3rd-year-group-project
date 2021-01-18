import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form } from 'formik';
import axios from 'axios';
import { setUserSession } from '../utils/Common'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const user = <FontAwesomeIcon icon={faUser} class="text-gray-400 text-xs"/>

const SignIn = (props) => {

  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:5000/api/user/login', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }


  return (
    <div>
      <div class="flex items-center h-screen w-full bg-indigo-700">
        <div class="max-w-xs w-full m-auto bg-white rounded p-5">
          <Formik initialValues={{username: '', password: '',}}
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
                <input class="rounded border py-2 px-3 text-grey-darkest text-xs" type="text" {...username} autoComplete="new-username" />
              </div>

              <div class="flex flex-col mb-4">
                <label htmlFor="password" class="text-gray-400 text-xs">Password</label>
                <input class="rounded border py-2 px-3 text-grey-darkest text-xs" type="text" {...password} autoComplete="new-password"  />
              </div>

              <div class="flex flex-col mb-4">
                <button type="submit" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} class="rounded p-2 bg-indigo-700 text-white text-md">Login</button>
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

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default SignIn;
