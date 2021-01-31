import React from "react";
import {Image} from 'cloudinary-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'


const heart = <FontAwesomeIcon icon={faHeart} />
const star = <FontAwesomeIcon icon={faStar} />

function ProfilePostCard (props) {

  return (
    <div className='gallery-item square-box'>
      <div className='square-content'>
        <Image className="gallery-image" cloudName="bluetooth" publicId={props.image} secure="true"></Image>
        <div className="gallery-item-info mx-auto">
          <ul>
            <li>
              <span className="font-extrabold text-sm md:text-xl"> {heart} 0 </span>
            </li>
            <li>
              <span className="font-extrabold text-sm md:text-xl"> {star} 0 </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostCard;
