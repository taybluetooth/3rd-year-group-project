import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./Posts";
import Appbar from "../components/Appbar";
import ReactNotification from "react-notifications-component";
import {getToken} from "../utils/Common";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const Feed = () => {
  const [notification, setNotification] = useState(false);
  let challenge = {name: "", description: "", points: 0}
  useEffect(() => {
    axios
      .get(`/api/user/token/${getToken()}`)
      .then((res) => {
        challenge.name = res.data.user.challenge[0]
        challenge.description = res.data.user.challenge[1]
        challenge.points = res.data.user.challenge[2]
        createNotification(challenge);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const createNotification = (challenge) => {
    store.addNotification({
      title: `Today's Challenge is ${challenge.name}!`,
      message: challenge.description,
      type: "default",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
    });
  };

  return (
    <>
      <main className="mx-auto">
        <ReactNotification />
        <Posts />
      </main>
      <Appbar />
    </>
  );
}

export default Feed;
