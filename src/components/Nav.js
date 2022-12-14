import {
  faCartShopping,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../client";
import Modal from "../Modal";
import Cart from "./Cart";

function Nav() {
  const [menuActive, setMenuActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  useState(async () => {
    const res = await client.fetch("*[_type == 'category']");
    setCategories(res);
  }, []);
  function toggleModal() {
    setShowModal((old) => !old);
    const body = document.querySelector("body");
    body.classList.add("modal-active");
  }
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${category}/${searchText}`);
  }
  function handleShowMenu(method) {
    const body = document.querySelector("body");
    body.classList.toggle("modal-active");
    setMenuActive((old) => !old);
  }
  return (
    <nav className="py-6 flex items-center justify-between flex-wrap gap-y-5">
      <Link
        to="/"
        className="h-fit text-primary text-md md:text-lg uppercase font-medium"
      >
        E-commerce
      </Link>
      <div className="ml-auto flex gap-2 md:ml-0 md:order-1">
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-third border border-third">
          <Link to="/likes">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </button>
        <button
          className="w-10 h-10 bg-third flex items-center justify-center rounded-full text-softbackground"
          onClick={toggleModal}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
      <form
        className="w-full text-sm bg-disabled items-center gap-x-4 p-3 rounded-full flex md:w-fit"
        onSubmit={handleSubmit}
      >
        <select
          className="hidden w-30 p-2 rounded-full focus:outline-none md:block"
          id=""
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map(({ title, _id, slug }) => (
            <option key={_id} value={slug.current}>
              {title}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="flex flex-col gap-1 md:hidden"
          onClick={handleShowMenu}
        >
          <span className=" w-4 h-[2px] bg-medium"></span>
          <span className=" w-3 h-[2px] bg-medium"></span>
          <span className=" w-2 h-[2px] bg-medium"></span>
        </button>
        <input
          required
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="search"
          type="text"
          id="searchInp"
          className="focus:outline-none flex-1"
        />
        <button type="submit" className="ml-auto text-medium">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      {menuActive && (
        <ul className="fixed h-screen w-screen flex flex-col top-0 left-0 gap-6 p-7 font-mediu text-softblack bg-softbackground z-50">
          <li className="text-3xl self-end mb-7">
            <button className="text-primary" onClick={handleShowMenu}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </li>
          {categories.map(({ title, _id, slug }) => (
            <li
              key={_id}
              className="relative w-fit before:w-0 hover:before:w-full before:h-[1.5px] before:absolute before:left-0 before:bottom-[-4px] before:bg-third before:transition-width before:duration-300 before:ease-linear"
            >
              <Link to={`/${slug.current}`} onClick={handleShowMenu}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {showModal ? (
        <Modal>
          <Cart setShowModal={setShowModal} />
        </Modal>
      ) : null}
    </nav>
  );
}

export default Nav;
