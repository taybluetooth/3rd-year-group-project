import React from "react";
import axios from 'axios';
import Posts from "./pages/Posts";
import UploadPost from "./pages/UploadPost";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './utils/Common';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/upload_post">
          <UploadPost />
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/profiletest">
          <Profile />
        </Route>
        <Route path="/">
          <Posts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
