import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

const ellipsis = <FontAwesomeIcon icon={faEllipsisH} />;
const heart = <FontAwesomeIcon icon={faHeart} color="#FF1493" size="lg" />;

export default (props) => {
  return (
    <div className="overflow-hidden border-b w-full lg:w-4/12 md:w-6/12 bg-white mx-0 md:mx-0 lg:mx-0">
      <div className="w-full flex justify-between p-3">
        <Link to={`/profile/${props.user}`}>
          <div className="flex">
            <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
              <img
                src="https://avatars0.githubusercontent.com/u/39353470?s=460&u=c82cc7e746e25bdab580cdb83ec41dbb938a7d71&v=4"
                alt="profilepic"
              ></img>
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
        <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
          {ellipsis}
        </span>
      </div>
      <Image
        cloudName="bluetooth"
        className="w-full bg-cover"
        publicId={props.image}
        secure="true"
      ></Image>

      <div className="px-3 pb-2">
        <div className="flex flex-row pt-2">
          <button className="text-lg">{heart}</button>
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
          <div className="mr-1 rounded-full h-5 w-5 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img
              src="https://avatars0.githubusercontent.com/u/39353470?s=460&u=c82cc7e746e25bdab580cdb83ec41dbb938a7d71&v=4"
              alt="profilepic"
            ></img>
          </div>
          <span className="font-bold text-md mr-2">{props.user}</span>
          {props.description}
        </div>
      </div>
    </div>
  );
};
