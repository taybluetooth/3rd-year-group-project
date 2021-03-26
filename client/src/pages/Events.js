import axios from "axios";
import React, { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import postService from "../services/postService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarTimes } from "@fortawesome/free-solid-svg-icons";
import { getUser } from "../utils/Common";

const Events = () => {
  const [eventPosts, setEventPosts] = useState();

  useEffect(() => {
    if (!eventPosts) getEvents();
  }, []);

  const getEvents = async () => {
    const userID = getUser()._id;
    let res = await postService.getAttendingEvents(userID);
    setEventPosts(res);
  };

  const renderPost = (post) => {
    return (
      <div className="border-b w-full lg:w-4/12 md:w-6/12 bg-white mx-0 md:mx-0 lg:mx-0">
        <PostCard
          key={post._id}
          _id={post._id}
          // user={getUsername(post).username}
          user={post.user.username}
          location={post.location}
          description={post.description}
          image={post.image}
          likes={post.likes}
          points={post.points}
          post={post}
          // userImg={getUsername(post).profileImage}
          userImg={post.user.profileImage}
          event={post.event}
          eventID={post.eventID}
        />
      </div>
    );
  };

  return (
    <div className="h-screen mx-auto">
      {eventPosts ? (
        <div className="flex items-center flex-col">
          {eventPosts && eventPosts.length > 0 ? (
            eventPosts.map((post) => renderPost(post))
          ) : (
            <div className="text-center">
              <h1 className="mt-12 text-2xl text-white text-bold">
                Attend some events!
              </h1>
              <p className="text-xl text-white text-bold">
                When you click the{" "}
                <FontAwesomeIcon
                  icon={faCalendarTimes}
                  color="#FF1493"
                  size="lg"
                />
                , they'll show up here
              </p>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
      <Appbar />
    </div>
  );
};

export default Events;
