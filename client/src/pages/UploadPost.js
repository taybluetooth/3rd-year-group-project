import React, { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { getToken } from "../utils/Common";
import { Redirect } from "react-router-dom";

function UploadPost() {
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const token = getToken();


  const onSubmit = (e) => {
    setError(null);
    e.preventDefault();
    let formData = new FormData();
    const obj = { imageUrl, description, token: getToken() };
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
        setError(false)
      })
      .catch((err) => console.error(err));
  };

  const OnTextChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const onImageFileChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      let { result } = reader;
      setImageUrl(result);
      console.log({ file, result });
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
        <div className="flex justify-center mx-auto pt-20">
          <form encType="multipart/form-data">
            <div className="flex flex-col p-5">
              <h1 className="pb-5 text-2xl text-white text-bold"> Hey! &#128075; I see you wanna make a post... </h1>
              <textarea
                type="text"
                onChange={OnTextChange}
                value={description}
                style={{resize: "none"}}
                className="border-2 rounded p-10"
              />
              <div className="mx-auto p-6">
                <input type="file" id="files" onChange={onImageFileChange} className="hidden"/>
                <label className="rounded p-4 text-md bg-white text-black" for="files"> Select Image </label>
              </div>
              {(imageUrl === "" || description === "")
                ?
                <button className="rounded py-4 px-8 text-md disabled bg-gray-500 text-white" onClick={onSubmit}>Your description or image is empty!</button>
                :
                <button className="rounded py-4 px-8 text-md gradient text-white" onClick={onSubmit}>Submit!</button>
              }
              <div className='mt-2 rounded gallery-item square-box border-solid border-4'>
                <div className='square-content'>
                  <img src={imageUrl} className="gallery-image" />
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
