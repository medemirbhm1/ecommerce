import React, { useEffect, useState } from "react";
import { client } from "../client";
import SimpleCard from "../components/SimpleCard";

function Likes() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const arr = JSON.parse(window.localStorage.getItem("likes"));
    arr.forEach(async (id) => {
      const res = await client.fetch(
        `*[_type == 'product' && _id == "${id}"][0]`
      );
      setProducts((old) => [...old, res]);
    });
  }, []);
  return (
    <div>
      <ul className="flex flex-wrap mt-8 gap-5">
        {products.map(({ _id, image, desription, price }) => (
          <SimpleCard
            key={_id}
            id={_id}
            image={image}
            desription={desription}
            price={price}
          />
        ))}
      </ul>
    </div>
  );
}

export default Likes;
