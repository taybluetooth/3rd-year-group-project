import React from "react";
import {Image} from 'cloudinary-react';

export default (props) => {

  return (
    <div class='gallery-item square-box'>
      <div class='square-content'>
        <Image className="gallery-image" cloudName="bluetooth" publicId={props.image} secure="true"></Image>
      </div>
    </div>
  );
};
