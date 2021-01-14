import React from "react";

export default (props) => {
  return (
    <div class="bg-white rounded shadow border p-6 w-64">
      <p class="text-gray-700 text-sm">{props.location} </p>
      <p class="text-gray-700 text-sm">{props.description}< /p>
    </div>
  );
};
