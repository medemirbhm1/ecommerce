import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import CatgLinks from "../components/CatgLinks";
import ColoredCard from "../components/ColoredCard";

function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(19);
  const [id, setId] = useState("");
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    setProducts([]);
    setShowButton(true);
    getCategory().then((res) => {
      setId(res._id);
      getProducts(res._id, true);
    });
  }, [slug]);
  async function getCategory() {
    const res = await client.fetch(
      `*[_type == 'category' && slug.current == "${slug}" ][0]`
    );
    return res;
  }
  async function getProducts(id, firstRun) {
    let res;
    if (firstRun) {
      res = await client.fetch(
        `*[_type == 'product' && category._ref == "${id}"][${0}..${19}]`
      );
      setStart(20);
      setEnd(39);
    } else {
      res = await client.fetch(
        `*[_type == 'product' && category._ref == "${id}"][${start}..${end}]`
      );
      setStart((old) => old + 20);
      setEnd((old) => old + 20);
    }
    setProducts((old) => old.concat(res));
    if (res.length < 20) {
      setShowButton(false);
    }
  }
  return (
    <div>
      <CatgLinks location={slug} />
      <ul className="flex flex-wrap mt-8 gap-5">
        {products.map(({ _id, colors, image, desription, price }) => (
          <ColoredCard
            key={_id}
            id={_id}
            colors={colors}
            image={image}
            desription={desription}
            price={price}
          />
        ))}
        {showButton ? (
          <button
            onClick={getProducts.bind(null, id, false)}
            className="w-10 h-10 bg-third flex items-center justify-center rounded-full text-softbackground md:ml-0 md:order-1 self-center"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        ) : null}
      </ul>
    </div>
  );
}
export default Category;
