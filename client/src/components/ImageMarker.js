import React, { useState } from "react";
import { Marker } from "react-map-gl";

function ImageMarker({ latitude, longitude, viewport, url, setSelectedImage }) {
  const [ringColour, setRingColour] = useState("white");

  return (
    <Marker latitude={latitude} longitude={longitude}>
      <div
        className="mkr"
        style={{
          width: `${6 * viewport.zoom}px`,
          height: `${6 * viewport.zoom}px`,
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onClick={() => {
          console.log(viewport.zoom);
          setRingColour("plum");
          setTimeout(() => {
            setSelectedImage(url);
            setRingColour("white");
          }, 500);
        }}
      >
        <img
          src={url}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
            border: `${viewport.zoom <= 4 ? "2" : "4"}px solid ${ringColour}`,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 5)",
            transition: "0.5s ease",
            MozTransition: "0.5s ease",
            WebkitTransition: "0.5s ease",
          }}
          alt=""
        />
      </div>
    </Marker>
  );
}

export default ImageMarker;