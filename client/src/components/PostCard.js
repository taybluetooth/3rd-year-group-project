import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Image } from "cloudinary-react";

const ellipsis = <FontAwesomeIcon icon={faEllipsisH} />;
const heart = <FontAwesomeIcon icon={faHeart} color="#FF1493" size="lg" />;
const star = <FontAwesomeIcon icon={faStar} color="#CCCC00" size="lg" />;

export default (props) => {
  return (
    <div className="overflow-hidden border-b w-full lg:w-4/12 md:w-6/12 bg-white mx-0 md:mx-0 lg:mx-0">
      <div className="w-full flex justify-between p-3">
        <div className="flex">
          <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img
              src="https://avatars0.githubusercontent.com/u/39353470?s=460&u=c82cc7e746e25bdab580cdb83ec41dbb938a7d71&v=4"
              alt="profilepic"
            ></img>
          </div>
          <span className="pt-1 ml-2 font-bold text-sm">{props.user}</span>
        </div>
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
        <div className="pt-2">
          <span className="text-sm font-medium mr-1">{star}</span>
          <span className="text-sm text-gray-400 font-medium">
            {props.points} points
          </span>
          <br />
          <span className="text-sm font-medium mr-1">{heart}</span>
          <span className="text-sm text-gray-400 font-medium">
            {props.likes} likes
          </span>
        </div>
        <div className="pt-1">
          <div className="mb-2 text-sm">
            <span className="font-medium mr-2">{props.user}</span>
            <br />
            <span className="text-sm text-gray-400 font-medium">
              {props.location}
            </span>
            <br />
            {props.description}
          </div>
        </div>
      </div>
    </div>
  );
};
