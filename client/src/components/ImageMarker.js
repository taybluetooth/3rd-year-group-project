import React, { useState } from "react";
import { Marker } from "react-map-gl";
import { Image } from "cloudinary-react";

function ImageMarker({
  latitude,
  longitude,
  viewport,
  url,
  alt,
  setSelectedPost,
  postIndex,
}) {
  const [ringColour, setRingColour] = useState("white");
  const size = 6 * viewport.zoom > 35 ? 6 * viewport.zoom : 35;

  return (
    <Marker latitude={parseFloat(latitude)} longitude={parseFloat(longitude)}>
      <div
        className="mkr"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onMouseEnter={() => setRingColour("plum")}
        onMouseLeave={() => setRingColour("white")}
        onClick={() => {
          setRingColour("plum");
          setTimeout(() => {
            setSelectedPost(postIndex);
            setRingColour("white");
          }, 500);
        }}
      >
        <Image
          cloudName="bluetooth"
          publicId={url}
          secure="true"
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
          alt={alt}
        />
      </div>
    </Marker>
  );
}

export default ImageMarker;
