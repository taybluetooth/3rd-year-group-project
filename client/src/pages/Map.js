import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import Appbar from "../components/Appbar";
import ImageMarker from "../components/ImageMarker";

function Map() {
  const [viewport, setViewport] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const photoData = [
    {
      latitude: 55.953251,
      longitude: -3.188267,
      url:
        "https://images.unsplash.com/photo-1609252871434-4e282b868d9a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", // url,
    },
    {
      latitude: 30.033333,
      longitude: 31.233334,
      url:
        "https://images.unsplash.com/photo-1570026517541-258404ea3bfc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setViewport({ zoom: 8, latitude, longitude });
        setLocationError(false);
      },
      () => setLocationError(true)
    );
  }, []);

  const onViewportChange = (nextViewport) => {
    const { width, height, ...etc } = nextViewport;
    setViewport(etc);
  };

  return selectedImage !== "" ? (
    <div>
      <img src={selectedImage} alt="" />
      <button onClick={() => setSelectedImage("")}>Go back</button>
    </div>
  ) : locationError === false ? (
    <>
      <ReactMapGL
        width="100vw"
        height="100vh"
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={onViewportChange}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {photoData.map((marker, idx) => (
          <ImageMarker
            key={idx}
            {...marker}
            viewport={viewport}
            setSelectedImage={setSelectedImage}
          />
        ))}
      </ReactMapGL>
      <Appbar />
    </>
  ) : locationError === true ? (
    <div>
      <h1>Sorry, something went wrong, we couldn't access your location</h1>
    </div>
  ) : (
    <></>
  );
}

export default Map;
