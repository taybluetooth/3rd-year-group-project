import React, { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { getToken } from "../utils/Common";

function UploadPost() {
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e) => {
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

  return (
    <>
      <div className="h-screen">
        <div className="flex justify-center mx-auto pt-20">
          <form encType="multipart/form-data">
            <div className="flex flex-col p-5 items-center">
              <h1 className="pb-5 text-2xl text-white text-bold"> Hey! I see you wanna make a post... </h1>
              <div>
                <span className="text-bold text-lg text-white"> Description: </span>
                <br></br>
                <textarea
                  type="text"
                  onChange={OnTextChange}
                  value={description}
                  style={{resize: "none"}}
                  className="border-2 rounded p-10"
                />
              </div>
              <div className="p-6">
                <input type="file" id="files" onChange={onImageFileChange} className="hidden"/>
                <label className="rounded p-4 text-md bg-white text-black" for="files"> Select Image </label>
              </div>
              <button className="rounded py-4 px-8 text-md gradient text-white" onClick={onSubmit}>Submit!</button>
            </div>
          </form>
        </div>
        <Appbar />
      </div>
    </>
  );
}

export default UploadPost;
