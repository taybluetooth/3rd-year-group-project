import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import Appbar from "../components/Appbar";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function Feed() {
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (notification === false) {
      createNotification();
      setNotification(true);
    }
  }, []);

  const createNotification = () => {
    store.addNotification({
      title: "Today's Challenge is Mountains!",
      message:
        "Create a post by 12pm GMT containing a picture of a mountain to earn 500 points!",
      type: "default",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
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
