import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import postService from "../services/postService";
import PostCard from "./PostCard";
import { getUser } from "../utils/Common";

const heart = <FontAwesomeIcon icon={faHeart} />;
const star = <FontAwesomeIcon icon={faStar} />;

function ProfilePostCard(props) {
  const [modalIsOpen,setIsOpen] = React.useState(false);

  const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'none',
    outline: 'none',
  }
};

  const renderPost = () => {
    let post = props.post
    return (
      <PostCard
        key={post._id}
        _id={post._id}
        user={props.username}
        location={post.location}
        description={post.description}
        image={post.image}
        likes={post.likes}
        points={post.points}
        post={post}
        userImg={props.profileImage}
      />
    );
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex items-center flex-col">
      {renderPost()}
      </div>
    </Modal>
      <div onClick={openModal} className="gallery-item square-box">
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
