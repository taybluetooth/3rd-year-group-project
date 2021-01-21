import React, { useState } from "react";
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
      <form encType="multipart/form-data">
        <input type="file" onChange={onImageFileChange} />
        <input
          type="text"
          onChange={OnTextChange}
          value={description}
          className="border-2"
        />
        <button onClick={onSubmit}>Submit!</button>
      </form>
      <h1 className="mt-12">Test</h1>
      <img src={imageUrl}></img>
    </>
  );
}

export default UploadPost;
