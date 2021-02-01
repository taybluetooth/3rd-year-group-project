import React, { useEffect } from "react";
import axios from "axios";
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
        <PrivateRoute path="/create_channel" component={CreateChannel} />
        <PrivateRoute path="/upload_post" component={UploadPost} />
        <Route path="/signup">
          <SignIn isLogin={false} />
        </Route>
        <Route path="/profile/:username">
          <Profile isChannel={false} />
        </Route>
        <Route path="/channel/:username">
          <Profile isChannel={true} />
        </Route>
        {/* <Route path="/feed">
          <Feed />
        </Route> */}
        <PrivateRoute path="/feed" component={Feed} />
        <Route path="/">
          {getToken() ? <Redirect to="/feed" /> : <SignIn isLogin={true} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
