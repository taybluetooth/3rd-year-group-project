import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";

import { Image } from "cloudinary-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import postService from "../services/postService";
import PostCard from "./PostCard";
import { getUser } from "../utils/Common";

const heart = <FontAwesomeIcon icon={faHeart} />;
const star = <FontAwesomeIcon icon={faStar} />;

function ProfilePostCard(props) {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          modal: "post-modal",
        }}
      >
        <div className="flex justify-center items-center w-12/12">
          <div className="border-b w-full lg:w-4/12 md:w-6/12 bg-white mx-0 md:mx-0 lg:mx-0">
            <PostCard
              key={props.post._id}
              _id={props.post._id}
              user={props.username}
              location={props.post.location}
              description={props.post.description}
              image={props.post.image}
              likes={props.post.likes}
              points={props.post.points}
              post={props.post}
              userImg={props.profileImage}
              isLoggedInUser={props.isLoggedInUser}
              event={props.post.event}
              eventID={props.post.eventID}
            />
          </div>
        </div>
      </Modal>

      <div onClick={onOpenModal} className="gallery-item square-box">
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
    </>
  );
}

export default ProfilePostCard;
