import React from "react";
import {Image} from 'cloudinary-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faComment } from '@fortawesome/free-solid-svg-icons'


const heart = <FontAwesomeIcon icon={faHeart} />
const star = <FontAwesomeIcon icon={faStar} />
const comment = <FontAwesomeIcon icon={faComment} />


export default (props) => {

  return (
    <div className='gallery-item square-box'>
      <div className='square-content'>
        <Image className="gallery-image" cloudName="bluetooth" publicId={props.image} secure="true"></Image>
        <div className="gallery-item-info">
          <ul>
            <li>
              <span> {heart} 0 </span>
            </li>
            <li>
              <span> {star} 0 </span>
            </li>
            <li>
              <span> {comment} 0 </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
