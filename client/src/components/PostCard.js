import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
// TEMP SOLUTION!
import image from "../../public/london.jpg";

const element = <FontAwesomeIcon icon={faEllipsisH} />

export default (props) => {

  return (
    <div class="rounded overflow-hidden border w-full lg:w-4/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
    <div class="w-full flex justify-between p-3">
      <div class="flex">
        <div class="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
          <img src="https://avatars0.githubusercontent.com/u/38799309?v=4" alt="profilepic"></img>
        </div>
        <span class="pt-1 ml-2 font-bold text-sm">CallumTaylor</span>
        <span class="pt-1 ml-3 text-sm">{props.location}</span>
      </div>
      <span class="px-2 hover:bg-gray-300 cursor-pointer rounded">{element}</span>
    </div>
    <img class="w-full bg-cover" src={image}></img>
    <div class="px-3 pb-2">
      <div class="pt-2">
        <i class="far fa-heart cursor-pointer"></i>
        <span class="text-sm text-gray-400 font-medium">5 likes</span>
      </div>
      <div class="pt-1">
        <div class="mb-2 text-sm">
          <span class="font-medium mr-2">Callum Taylor</span> {props.description}
        </div>
      </div>
    </div>
  </div>
  );
};
