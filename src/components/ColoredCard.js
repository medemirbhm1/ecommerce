import React from "react";
import { urlFor } from "../client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

function ColoredCard({ _id, colors, image, desription, price }) {
  return (
    <li
      className="w-full flex flex-col rounded-md p-4 md:w-72"
      style={{ backgroundColor: `#${colors[0]}` }}
    >
      <button className="w-7 h-7 text-sm rounded-full flex justify-center items-center self-end bg-disabled text-regular">
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <img src={urlFor(image)} className="self-center w-40" alt="" />
      <p className="mt-5 mb-2 text-sm text-text">Colors</p>
      <div className="flex gap-2 flex-wrap">
        {colors.slice(1).map((color) => (
          <span
            style={{ backgroundColor: `#${color}` }}
            className="w-4 h-4 rounded-full"
          ></span>
        ))}
      </div>
      <p className=" mt-6 mb-6 text-text">{desription}</p>
      <div className="flex items-center justify-between mt-auto">
        <p className="text-text">{price} $</p>
        <button className="w-8 h-8 text-sm rounded-full flex justify-center items-center self-end bg-disabled text-regular">
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
      </div>
    </li>
  );
}

export default ColoredCard;
