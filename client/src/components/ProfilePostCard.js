import React from "react";
import {Image} from 'cloudinary-react';

export default (props) => {

  return (
    <div className="gallery-item" tabindex="0">
      <Image className="gallery-image" cloudName="bluetooth" publicId={props.image} secure="true"></Image>
    </div>
  );
};
