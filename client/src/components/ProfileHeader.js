import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken, getUser } from "../utils/Common";
import { Image } from "cloudinary-react";
import Loading from "./Loading";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function ProfileHeader({
  _id,
  username,
  isLoggedInUser,
  displayName,
  bio,
  numFollows,
  numFollowing,
  isFollowing,
  isChannel,
  profileImage,
  channelUserID,
}) {
  const [file, setFile] = useState();
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState("");
  const [imageLoading, setImageLoading] = useState(null);

  useEffect(() => {
    if (getUser()._id === _id || getUser()._id === channelUserID) {
      document.getElementById("profile-img").classList.add("profile-pic");
    }
  }, []);

  const onImageFileChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (!file) return;
    let extension = file.name.split(".").pop().toLowerCase();

    reader.onloadend = () => {
      if (
        extension === "heic" ||
        extension === "jpeg" ||
        extension === "png" ||
        extension === "jpg"
      ) {
        if (file.size <= 1 * 1024 * 1024) {
          setFile(file);
          let { result } = reader;
          let dataURI = result;
          setImgError("");
          setImageLoading(true);
          axios
            .post(`/api/${isChannel ? "channel" : "user"}/profilepic/${_id}`, {
              dataURI,
            })
            .then((response) => {
              setError(false);
              console.log(response);
              window.location.reload();
            })
            .catch((err) => {
              console.error(err);
              alert("Could not change profile picture to this image.");
            })
            .finally(() => setImageLoading(false));
        } else {
          setImgError("File is too large to upload");
          console.log("File is too large to upload.");
        }
      } else {
        setImgError("File must be a .png or .jpg image!");
        console.log("File must be a .png or .jpg image!");
      }
    };

    reader.readAsDataURL(file);
  };

  const followOrUnfollow = () => {
    axios
      .post(
        `/api/${isFollowing ? "unfollow" : "follow"}/${
          isChannel ? "channel/" : ""
        }`,
        {
          token: getToken(),
          followingUsername: username,
        }
      )
      .then((res) => {
        console.dir(res);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("Sorry, something went wrong. Please try again");
      });
  };

  return (
    <>
      <ReactNotification />
      <div className="md:w-8/12 mx-3 text-white overflow-hidden md:mt-6">
        <div className="md:w-full container p-3">
          <div className="md:flex items-center justify-center container divider md:py-4">
            <label id="fileselect" htmlFor="files">
              <div
                id="profile-img"
                className="relative w-40 h-40 flex items-center justify-center"
                data-content="Edit"
              >
                {imageLoading === true ? (
                  <Loading />
                ) : (
                  <Image
                    className="gallery-image rounded-full"
                    cloudName="bluetooth"
                    alt="profilepic"
                    publicId={profileImage}
                    secure="true"
                    data-content="Edit"
                  />
                )}
                {isLoggedInUser === null ? null : isLoggedInUser ? (
                  <input
                    accept="image/x-png,image/gif,image/jpeg,image/heic"
                    type="file"
                    id="files"
                    onChange={onImageFileChange}
                    className="hidden"
                  />
                ) : (
                  <div className="hidden"></div>
                )}
              </div>
            </label>
            <div className="pt-4 md:pt-0 md:ml-10">
              <div className="md:text-2xl text-md pt-5 pb-2">
                <span> {username} </span>
              </div>
              {isLoggedInUser === null ? null : isLoggedInUser ? (
                <Link to={`/editprofile${isChannel ? `/channel/${_id}` : ""}`}>
                  <button className="px-3 py-2 mb-2 rounded-md text-xs bg-white text-black">
                    EDIT PROFILE
                  </button>
                </Link>
              ) : (
                <button
                  href="#"
                  className="px-3 py-2 mb-2 rounded-md text-xs bg-white text-black"
                  onClick={() => {
                    followOrUnfollow();
                  }}
                >
                  {isFollowing ? "UNFOLLOW" : "FOLLOW"}
                </button>
              )}
              <div className="md:text-lg text-sm gap-5 sm:gap-10 grid grid-flow-col auto-cols-max">
                <div>{numFollows} follower(s)</div>
                {numFollowing === null ? null : (
                  <div>{numFollowing} following</div>
                )}
              </div>
              <div className="md:text-lg text-sm pb-8 pt-3">
                <span> {displayName} </span>
                <br />
                <span> {bio} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
