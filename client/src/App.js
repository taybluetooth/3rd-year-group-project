import React, { useEffect } from "react";
import axios from "axios";
import Posts from "./pages/Posts";
import UploadPost from "./pages/UploadPost";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { getToken, removeUserSession, setUser } from "./utils/Common";

function App() {
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    const verifyToken = async () =>
      axios
        .get(`/api/verifyToken/${token}`)
        .then((response) => {
          console.dir(response);
          setUser(response.data.user);
          // setAuthLoading(false);
        })
        .catch((error) => {
          console.dir(error);
          removeUserSession();
          // setAuthLoading(false);
        });

    verifyToken();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/upload_post">
          <UploadPost />
        </Route>
        <Route path="/signup">
          <SignIn isLogin={false} />
        </Route>
        <Route path="/profile/:username">
          <Profile isChannel={false} />
        </Route>
        <Route path="/channel/:username">
          <Profile isChannel={true} />
        </Route>
        <Route path="/feed">
          <Feed />
        </Route>
        <Route path="/">
          {getToken() ? <Redirect to="/feed" /> : <SignIn isLogin={true} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
