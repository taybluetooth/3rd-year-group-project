import React from "react";
import Posts from "./pages/Posts";
import UploadPost from "./pages/UploadPost";
import SignUp from "./pages/SignUp";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/upload_post">
          <UploadPost />
        </Route>
        <Route path="/posts">
          <Posts />
        </Route>
        <Route path="/">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
