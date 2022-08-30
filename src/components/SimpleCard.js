import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { urlFor } from "../client";

function SimpleCard({ image, description, price }) {
  return (
    <li className="w-72 flex flex-col rounded-md p-4 bg-disabled flex-shrink-0 text-text">
      <button className="w-7 h-7 text-sm rounded-full flex justify-center items-center self-end bg-disabled text-regular">
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <img src={urlFor(image)} className="w-40 self-center" />
      <p className="mt-4 text-sm mb-6">{description}</p>
      <p className="mt-auto font-medium">{price} $</p> 
    </li>
  );
}

export default SimpleCard;
