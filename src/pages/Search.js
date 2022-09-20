import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import ColoredCard from "../components/ColoredCard";
function Search() {
  const { category, text } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getResults();
  }, [category, text]);

  async function getResults() {
    if (category !== "All") {
      var { _id } = await client.fetch(
        `*[_type == "category" && slug.current == "${category}"][0]`
      );
    }
    const res = await client.fetch(
      `*[_type == "product"][title match "${text}" || title match "${text}*"] ${
        category !== "All" ? `[category._ref == "${_id}"]` : ""
      }`
    );
    setProducts(res);
  }
  return (
    <ul className="flex flex-wrap mt-8 gap-5">
      {products.length ? (
        products.map(({ _id, colors, image, desription, price, title }) => (
          <ColoredCard
            key={_id}
            id={_id}
            colors={colors}
            image={image}
            desription={desription}
            price={price}
            title={title}
          />
        ))
      ) : (
        <h2 className="w-full text-center font-medium text-2xl">Nothing found !</h2>
      )}
    </ul>
  );
}

export default Search;
