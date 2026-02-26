import React from "react";

export const spritObject = (arr, callback, separator = ", ") => {
  if (!Array.isArray(arr)) return "";

  return arr.map((obj, index) => (
    <React.Fragment key={index}>
      {callback ? callback(obj) : obj}
      {index < arr.length - 1 && separator}
    </React.Fragment>
  ));
};
