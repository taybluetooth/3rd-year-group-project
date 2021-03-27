import React, { useState, useEffect } from "react";
import { Field, Formik } from "formik";
import Appbar from "../components/Appbar";
import axios from "axios";
import { getToken } from "../utils/Common";
import { Redirect } from "react-router-dom";
import mapboxService from "../services/mapboxService";

function UploadPost() {
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [channelUsername, setChannelUsername] = useState("");
  const [isEvent, setIsEvent] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState("");
  const [location, setLocation] = useState("");
  const [mapboxLocals, setMapboxLocals] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(-1);
  const token = getToken();

  useEffect(() => {
    if (location.length > 0) {
      setSelectedLocation(-1);
      mapboxService
        .forwardGeocode(location)
        .then((res) => setMapboxLocals(res));
    }
  }, [location]);

  const onSubmit = (e) => {
    setError(null);
    e.preventDefault();
    let formData = new FormData();
    const { text: location, geometry } = mapboxLocals.features[
      selectedLocation
    ];
    const long = geometry.coordinates[0];
    const lat = geometry.coordinates[1];
    const obj = {
      imageUrl,
      description,
      token,
      channelUsername,
      isEvent,
      startDate,
      endDate,
      location,
      lat,
      long,
    };
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
      .then((response) => {
        console.log(response);
<<<<<<< HEAD
        if (response.challenge) {
=======
        if(response.challenge) {
>>>>>>> 1378599b18ec57900896e0c17744fa229dea8eee
          console.log("Challenge Completed!");
        }
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  const onTextChange = (e, setter) => {
    e.preventDefault();
    setter(e.target.value);
  };

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
        <div className="flex justify-center mx-auto">
          <form encType="multipart/form-data">
            <div className="flex flex-col p-5 max-w-xs md:max-w-sm">
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
              <label className="mt-4 text-white">Channel Username</label>
              <input
                type="text"
                onChange={(e) => onTextChange(e, setChannelUsername)}
                value={channelUsername}
                className="border-2 rounded mb-4"
              />
              <label className="mt-4 text-white">Location Search</label>
              <input
                type="text"
                onChange={(e) => onTextChange(e, setLocation)}
                value={location}
                placeholder="Where did you take the photo?"
                className="border-2 rounded mb-4"
              />
              {mapboxLocals ? (
                <select
                  className="border-2 rounded mb-4 truncate"
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                  }}
                  defaultValue={-1}
                >
                  <option value={-1} disabled>
                    Select an option
                  </option>
                  {mapboxLocals &&
                    mapboxLocals.features.map(({ id, place_name }, i) => (
                      <option key={id} value={i}>
                        {place_name}
                      </option>
                    ))}
                </select>
              ) : null}
              <label className="mt-4 text-white">Event Post</label>
              <input
                type="checkbox"
                onChange={(e) => setIsEvent(!isEvent)}
                value={isEvent}
                className="border-2 rounded mb-4"
              />
              {isEvent && (
                <>
                  <label className="mt-4 text-white"></label>
                  <input
                    type="date"
                    onChange={(e) => onTextChange(e, setStartDate)}
                    value={startDate}
                    className="border-2 rounded mb-4"
                  />
                  <label className="mt-4 text-white"></label>
                  <input
                    type="date"
                    onChange={(e) => onTextChange(e, setEndDate)}
                    value={endDate}
                    className="border-2 rounded mb-4"
                  />
                </>
              )}
              <div className="mx-auto p-6">
                <input
                  accept="image/x-png,image/gif,image/jpeg,image/heic"
                  type="file"
                  id="files"
                  onChange={onImageFileChange}
                  className="hidden"
                />
                <label
                  className="rounded p-4 text-md bg-white text-black cursor-pointer"
                  for="files"
                >
                  Select Image
                </label>
              </div>
              {imageUrl === "" ||
              selectedLocation === -1 ||
              description === "" ||
              (isEvent && (startDate === "" || endDate === "")) ? (
                <button
                  id="uploadBtn"
                  className="rounded py-4 px-8 text-md bg-gray-500 text-white"
                  onClick={onSubmit}
                  disabled
                >
                  {`Your description, location ${
                    isEvent ? ", start date, end date" : ""
                  } or image is empty!`}
                </button>
              ) : (
                <button
                  className="rounded py-4 px-8 text-md gradient text-white"
                  onClick={onSubmit}
                >
                  Submit!
                </button>
              )}
              {imageUrl ? (
                <div className="mt-2 rounded gallery-item square-box">
                  <div className="square-content">
                    <img src={imageUrl} className="gallery-image" />
                    <h4> {imgError} </h4>
                  </div>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPost;
