import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { urlFor } from "../client";

function SimpleCard({ id, colors, image, description, price }) {
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => {
    const likesArr = JSON.parse(window.localStorage.getItem("likes"));
    if (likesArr.includes(id)) {
      setLiked(true);
    }
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    if (cart.some((product) => product.id === id)) {
      setAddedToCart(true);
    }
  }, []);
  function handleLike() {
    let arr = JSON.parse(window.localStorage.getItem("likes"));
    if (liked) {
      arr = arr.filter((el) => el !== id);
    } else {
      arr.push(id);
    }
    setLiked((old) => !old);
    window.localStorage.setItem("likes", JSON.stringify(arr));
  }
  function handleAddToCart() {
    let cart = JSON.parse(window.localStorage.getItem("cart"));
    if (addedToCart) {
      cart = cart.filter((el) => el.id !== id);
    } else {
      cart.push({ id, colors, image, price });
    }
    setAddedToCart((old) => !old);
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }
  return (
    <li className="w-72 flex flex-col rounded-md p-4 bg-disabled flex-shrink-0 text-text shadow">
      <button
        className={`w-8 h-8 text-sm rounded-full flex justify-center items-center self-end text-regular border-border border-2 ${
          liked ? "bg-third text-disabled" : ""
        }`}
        onClick={handleLike}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <img src={urlFor(image)} className="w-40 self-center" />
      <p className="mt-4 text-sm mb-6">{description}</p>
      <div className="mt-auto flex justify-between items-center">
        <p className="font-medium">{price} $</p>
        <button
          onClick={handleAddToCart}
          className={`w-8 h-8 text-sm rounded-full flex justify-center items-center self-end text-regular border-border border-2 ${
            addedToCart ? "bg-third text-disabled" : ""
          }`}
        >
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
      </div>
    </li>
  );
}

export default SimpleCard;
