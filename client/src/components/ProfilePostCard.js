import React from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";

const heart = <FontAwesomeIcon icon={faHeart} />;
const star = <FontAwesomeIcon icon={faStar} />;

function ProfilePostCard(props) {
  return (
    <>
    <Link to={`/`}>
      <div className="gallery-item square-box">
        <div className="square-content">
          <Image
            className="gallery-image"
            cloudName="bluetooth"
            publicId={props.image}
            secure="true"
          ></Image>
          <div className="gallery-item-info mx-auto">
            <ul>
              <li>
                <span className="font-extrabold text-sm md:text-xl">
                  {heart} {props.likes}
                </span>
              </li>
              <li>
                <span className="font-extrabold text-sm md:text-xl">
                  {star} {props.points}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Link>
    </>
  );
}

export default ProfilePostCard;
