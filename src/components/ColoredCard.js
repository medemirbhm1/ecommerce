import React, { useContext, useEffect, useState } from "react";
import { urlFor } from "../client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

function ColoredCard({ id, colors, image, desription, price, title }) {
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
      cart.push({
        id,
        colors,
        image,
        price,
        title,
        quantity: 1,
        chosenColor: colors[1],
      });
    }
    setAddedToCart((old) => !old);
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }
  return (
    <li
      className="w-full flex flex-col rounded-md p-4 md:w-72"
      style={{ backgroundColor: `#${colors[0]}` }}
    >
      <button
        className={`w-7 h-7 text-sm rounded-full flex justify-center items-center self-end bg-disabled text-regular ${
          liked ? "bg-third !text-disabled" : ""
        }`}
        onClick={handleLike}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <img src={urlFor(image)} className="self-center w-40" alt="" />
      <p className="mt-5 mb-2 text-sm text-text">Colors</p>
      <div className="flex gap-2 flex-wrap">
        {colors.slice(1).map((color) => (
          <span
            style={{ backgroundColor: `#${color}` }}
            key={color}
            className="w-4 h-4 rounded-full"
          ></span>
        ))}
      </div>
      <p className=" mt-6 mb-6 text-text">{desription}</p>
      <div className="flex items-center justify-between mt-auto">
        <p className="text-text">{price} $</p>
        <button
          className={`w-8 h-8 text-sm rounded-full flex justify-center items-center self-end bg-disabled text-regular ${
            addedToCart ? "bg-third !text-disabled" : ""
          }`}
          onClick={handleAddToCart}
        >
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
      </div>
    </li>
  );
}

export default ColoredCard;
