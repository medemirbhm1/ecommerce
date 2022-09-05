import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../client";

function CatgLinks({ location }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);
  async function getCategories() {
    const res = await client.fetch("*[_type == 'category']");
    setCategories(res);
  }
  return (
    <ul className="w-full order-2 hidden  md:flex justify-center gap-x-6 gap-y-2 flex-wrap text-sm mt-2 text-text">
      {categories.map(({ title, _id, slug }) => (
        <li
          className={`transition hover:text-primary ${
            location === slug.current && "text-third"
          }`}
          key={_id}
        >
          <Link to={`/${slug.current}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default CatgLinks;
