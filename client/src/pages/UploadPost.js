import React, { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { getToken } from "../utils/Common";
import { Redirect } from "react-router-dom";

function UploadPost() {
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [channelUsername, setChannelUsername] = useState("");
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState("");
  const token = getToken();

  const onSubmit = (e) => {
    setError(null);
    e.preventDefault();
    let formData = new FormData();
    const obj = { imageUrl, description, token, channelUsername };
    console.log(obj);
    Object.keys(obj).forEach((key, i) => {
      formData.append(key, obj[key]);
    });
    console.log(formData);

    axios
      .post("/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          lat: 55.953251,
          lon: -3.188267, //static for now
        },
      })
      .then((response) => {
        setError(false);
      })
      .catch((err) => console.error(err));
  };

  const onTextChange = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const onImageFileChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let extension = file.name.split(".").pop();

    reader.onloadend = () => {
      if(extension === "png" || extension === "jpg") {
        if(file.size <= (1 * 1024 * 1024)) {
          console.log(file.size);
          setFile(file);
          let { result } = reader;
          setImageUrl(result);
          console.log({ file, result });
          setImgError("");
        } else {
          console.log(file.size);
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

  return error === false ? (
    <Redirect to="/feed" />
  ) : token == null ? (
    <Redirect to="/" />
  ) : (
    <div className="h-full">
      <Appbar />
      <div className="flex items-center">
        <div className="flex justify-center mx-auto md:pt-20">
          <form encType="multipart/form-data">
            <div className="flex flex-col p-5">
              <h1 className="pb-5 text-2xl text-white text-bold">
                Hey! &#128075; I see you wanna make a post...
              </h1>
              <textarea
                type="text"
                onChange={(e) => onTextChange(e, setDescription)}
                value={description}
                style={{ resize: "none" }}
                className="border-2 rounded p-10"
              />
              <label className="mt-4">Channel Username</label>
              <input
                type="text"
                onChange={(e) => onTextChange(e, setChannelUsername)}
                value={channelUsername}
                className="border-2 rounded mb-4"
              />
              <div className="mx-auto p-6">
                <input
                  accept="image/x-png,image/gif,image/jpeg"
                  type="file"
                  id="files"
                  onChange={onImageFileChange}
                  className="hidden"
                />
                <label
                  className="rounded p-4 text-md bg-white text-black"
                  for="files"
                >
                  Select Image
                </label>
              </div>
              {imageUrl === "" || description === "" ? (
                <button
                  id="uploadBtn"
                  className="rounded py-4 px-8 text-md disabled bg-gray-500 text-white"
                  onClick={onSubmit}
                >
                  Your description or image is empty!
                </button>
              ) : (
                <button
                  className="rounded py-4 px-8 text-md gradient text-white"
                  onClick={onSubmit}
                >
                  Submit!
                </button>
              )}
              <div className="mt-2 rounded gallery-item square-box">
                <div className="square-content">
                  <img src={imageUrl} className="gallery-image" />
                  <h4> {imgError} </h4>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPost;
