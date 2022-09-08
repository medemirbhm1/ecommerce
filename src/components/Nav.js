import {
  faCartShopping,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../client";

function Nav() {
  const [menuActive, setMenuActive] = useState(false);
  const [categories, setCategories] = useState([]);
  useState(async () => {
    const res = await client.fetch("*[_type == 'category']");
    setCategories(res);
  }, []);

  return (
    <nav className="py-6 flex items-center justify-between flex-wrap gap-y-5">
      <Link
        to="/"
        className="h-fit text-primary text-md md:text-lg uppercase font-medium"
      >
        E-commerce
      </Link>
      <button className="ml-auto w-10 h-10 bg-third flex items-center justify-center rounded-full text-softbackground md:ml-0 md:order-1">
        <FontAwesomeIcon icon={faCartShopping} />
      </button>

      <form className="w-full text-sm bg-disabled items-center gap-x-4 p-3 rounded-full flex md:w-fit">
        <select
          className="hidden w-30 p-2 rounded-full focus:outline-none md:block"
          id=""
        >
          <option value="All">All</option>
          {categories.map(({ title, _id }) => (
            <option key={_id} value={title}>
              {title}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="flex flex-col gap-1 md:hidden"
          onClick={() => setMenuActive(true)}
        >
          <span className=" w-4 h-[2px] bg-medium"></span>
          <span className=" w-3 h-[2px] bg-medium"></span>
          <span className=" w-2 h-[2px] bg-medium"></span>
        </button>
        <input
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
        <ul className="absolute h-screen w-screen flex flex-col top-0 left-0 gap-6 p-7 font-mediu text-softblack bg-softbackground z-50">
          <li className="text-3xl self-end mb-7">
            <button
              className="text-primary"
              onClick={() => setMenuActive(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </li>
          {categories.map(({ title, _id, slug }) => (
            <li
              key={_id}
              className="relative w-fit before:w-0 hover:before:w-full before:h-[1.5px] before:absolute before:left-0 before:bottom-[-4px] before:bg-third before:transition-width before:duration-300 before:ease-linear"
            >
              <Link
                to={`/${slug.current}`}
                onClick={() => setMenuActive(false)}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Nav;
