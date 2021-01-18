import React from "react";
import axios from 'axios';
import Posts from "./pages/Posts";
import UploadPost from "./pages/UploadPost";
import SignIn from "./pages/SignIn";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

function App() {

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:5000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/upload_post">
          <UploadPost />
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/">
          <Posts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
