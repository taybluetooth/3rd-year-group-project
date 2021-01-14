import React from "react";
// TEMP SOLUTION!
import image from "../../public/edinburgh.jpg";

export default (props) => {

  return (
    <div class="bg-white rounded shadow border p-6 w-64">
      <img class="object-contain h-48 w-full" src={image}></img>
      <p class="text-gray-700 text-sm">{props.location} </p>
      <p class="text-gray-700 text-sm">{props.description}< /p>
    </div>
  );
};
