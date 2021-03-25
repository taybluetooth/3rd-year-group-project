import React, { useEffect } from "react";
import axios from "axios";
import UploadPost from "./pages/UploadPost";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import EditProfile from "./pages/EditProfile";
import Leaderboard from "./pages/Leaderboard";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getToken, removeUserSession, setUser } from "./utils/Common";
import PrivateRoute from "./utils/PrivateRoute";
import CreateChannel from "./pages/CreateChannel";

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
        })
        .catch((error) => {
          console.dir(error);
          removeUserSession();
        });

    verifyToken();
  }, []);

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/create_channel" component={CreateChannel} />
        <PrivateRoute path="/upload_post" component={UploadPost} />
        <Route path="/signup">
          <SignIn isLogin={false} />
        </Route>
        <Route path="/profile/:username">
          {getToken() ? (
            <Profile isChannel={false} />
          ) : (
            <SignIn isLogin={true} />
          )}
        </Route>
        <Route path="/channel/:username">
          {getToken() ? (
            <Profile isChannel={true} />
          ) : (
            <SignIn isLogin={true} />
          )}
        </Route>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <PrivateRoute path="/editprofile/" component={EditProfile} />
        <PrivateRoute path="/feed" component={Feed} />
        <Route path="/">
          {getToken() ? <Redirect to="/feed" /> : <SignIn isLogin={true} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
