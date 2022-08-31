import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { urlFor } from "../client";

function SimpleCard({ image, description, price }) {
  return (
    <li className="w-72 flex flex-col rounded-md p-4 bg-disabled flex-shrink-0 text-text shadow">
      <button className="w-8 h-8 text-sm rounded-full flex justify-center items-center self-end text-regular border-border border-2">
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <img src={urlFor(image)} className="w-40 self-center" />
      <p className="mt-4 text-sm mb-6">{description}</p>
      <div className="mt-auto flex justify-between items-center">
        <p className="font-medium">{price} $</p>
        <button className="w-8 h-8 text-sm rounded-full flex justify-center items-center self-end text-regular border-border border-2">
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
      </div>
    </li>
  );
}

export default SimpleCard;
