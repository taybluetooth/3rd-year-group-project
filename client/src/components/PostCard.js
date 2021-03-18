import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken, getUser } from "../utils/Common";
import likeService from "../services/likeService";

function PostCard(props) {

  const [liked, setLiked] = useState(false);

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
  }

  const deletePost = (id) => {
    if(window.confirm("Are you sure you want to delete this post? This can't be undone!")) {
      axios.delete(`/api/post/${id}`, {
      })
      .then((res) => {
        console.dir(res);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("Sorry, something went wrong. Please try again");
      });
    }
  }

  return (
    <div className="border-b w-full lg:w-4/12 md:w-6/12 bg-white mx-0 md:mx-0 lg:mx-0">
      <div className="w-full flex justify-between p-3">
        <Link to={`/profile/${props.user}`}>
          <div className="flex">
            <div className="h-8 w-8 flex items-center justify-center overflow-hidden">
              <Image className="gallery-image rounded-full" cloudName="bluetooth" alt="profilepic" publicId={props.userImg} secure="true"></Image>
            </div>
            <div className="block">
              <span className="pt-3 ml-2 font-bold text-sm">{props.user}</span>
              <br></br>
              <span className="ml-2 text-sm text-gray-400">
                {props.location}
              </span>
            </div>
          </div>
        </Link>
        {props.isLoggedInUser === null ? null : props.isLoggedInUser ? (
          <button onClick={() => {deletePost(props._id)}} className="hover:bg-gray-300 p-3 cursor-pointer rounded">
            <span>X</span>
          </button>
        ):(<div className="hidden"></div>)
        }
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
        <div className="flex flex-row pt-2">
          <button onClick={like} className="text-lg"><FontAwesomeIcon icon={faHeart} color="#FF1493" size="lg" /></button>
        </div>
        <div className="flex flex-row pt-2">
          <span className="text-sm text-gray-400 mr-2">
            {props.likes} likes
          </span>
          <span className="text-sm text-gray-400">
            {props.points} points
          </span>
        </div>
        <div className="flex flex-row text-sm pt-2">
          <div className="h-5 w-5 mr-1 flex items-center justify-center overflow-hidden">
            <Image className="gallery-image rounded-full" cloudName="bluetooth" alt="profilepic" publicId={props.userImg} secure="true"></Image>
          </div>
          <span className="font-bold text-md mr-2">{props.user}</span>
          {props.description}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
