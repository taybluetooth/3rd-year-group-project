import React from "react";
import Posts from "./Posts";
import Appbar from "../components/Appbar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome } from "@fortawesome/free-solid-svg-icons";

function Feed() {
  return (
    <>
      <main className="mx-auto">
        <Posts />
      </main>
      <Appbar />
    </>
  );
};

export default Feed;
