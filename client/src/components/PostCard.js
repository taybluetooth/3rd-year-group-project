import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faCalendarTimes,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken, getUser } from "../utils/Common";
import likeService from "../services/likeService";

function PostCard(props) {
  const [liked, setLiked] = useState(false);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const like = () => {
    axios
      .post(`/api/like`, {
        token: getToken(),
        likedPost: props.post,
      })
      .then((res) => {
        console.dir(res);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("Sorry, something went wrong. Please try again");
      });
  };

  const eventReq = (eventID, userID) => {
    console.dir({ eventID, userID });
    axios
      .post(`/api/event/${isAttendingEvent() ? "un" : ""}attend`, {
        userID,
        eventID,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert("Sorry, something went wrong, please try again.");
      });
  };

  const printDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", dateOptions);
  };

  const isAttendingEvent = () => {
    return props.event !== null && props.event.attending.length > 0;
  };

  const deletePost = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this post? This can't be undone!"
      )
    ) {
      axios
        .delete(`/api/post/${id}`, {})
        .then((res) => {
          console.dir(res);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          alert("Sorry, something went wrong. Please try again");
        });
    }
  };

  return (
    <>
      <div className="w-full flex justify-between p-3">
        <div className="flex">
          <div className="h-8 w-8 flex items-center justify-center overflow-hidden">
            <Image
              className="gallery-image rounded-full"
              cloudName="bluetooth"
              alt="profilepic"
              publicId={props.userImg}
              secure="true"
            ></Image>
          </div>
          <div className="block">
            <Link
              to={`/profile/${props.user}`}
              style={{ textDecoration: "none", outline: "none" }}
            >
              <span className="pt-3 ml-2 font-bold text-sm">{props.user}</span>
            </Link>
            <br></br>
            <span className="ml-2 text-sm text-gray-400">{props.location}</span>
          </div>
        </div>
        {props.isLoggedInUser === null ? null : props.isLoggedInUser ? (
          <button
            onClick={() => {
              deletePost(props._id);
            }}
            className="hover:bg-gray-300 p-3 cursor-pointer rounded"
          >
            <FontAwesomeIcon icon={faTrash} color="#FF0000" size="lg" />
          </button>
        ) : (
          <div className="hidden"></div>
        )}
      </div>
      <div className="gallery-item square-box">
        <div className="square-content">
          <Image
            cloudName="bluetooth"
            className="w-full bg-cover gallery-image"
            publicId={props.image}
            secure="true"
          ></Image>
        </div>
      </div>
      <div className="px-3 pb-2">
        {props.event !== null ? (
          <div className="flex flex-row pt-2">
            <h3>{`${printDate(props.event.startDate)} · ${printDate(
              props.event.endDate
            )}`}</h3>
          </div>
        ) : null}
        <div className="flex flex-row pt-2">
          <button onClick={like} className="text-lg mr-2">
            <FontAwesomeIcon icon={faHeart} color="#FF1493" size="lg" />
          </button>
          {props.event !== null ? (
            <button
              onClick={() => eventReq(props.eventID, getUser()._id)}
              className="text-lg mx-2"
            >
              <FontAwesomeIcon
                icon={isAttendingEvent() ? faCalendarTimes : faCalendarPlus}
                color="#FF1493"
                size="lg"
              />
            </button>
          ) : null}
        </div>
        <div className="flex flex-row pt-2">
          <span className="text-sm text-gray-400 mr-2">
            {props.likes} likes
          </span>
          <span className="text-sm mr-2 text-gray-400">
            {props.points} points
          </span>
          {props.event ? (
            <span className="text-sm text-gray-400">
              {props.event.numAttending} attending
            </span>
          ) : null}
        </div>
        <div className="flex flex-row text-sm pt-2">
          <div className="h-5 w-5 mr-1 flex items-center justify-center overflow-hidden">
            <Image
              className="gallery-image rounded-full"
              cloudName="bluetooth"
              alt="profilepic"
              publicId={props.userImg}
              secure="true"
            ></Image>
          </div>
          <span className="font-bold text-md mr-2">{props.user}</span>
          {props.description}
        </div>
      </div>
    </>
  );
}

export default PostCard;
