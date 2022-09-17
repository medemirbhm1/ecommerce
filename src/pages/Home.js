import { useState } from "react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../client";
import CatgLinks from "../components/CatgLinks";
import ColoredCard from "../components/ColoredCard";
import SimpleCard from "../components/SimpleCard";

function Home() {
  const [latestFour, setLatestFour] = useState([]);
  const [features, setFeatures] = useState([]);
  const [clothesAndAccessoires, setClothesAndAccessoires] = useState([]);
  const [randomCategories, setRandomCategories] = useState([]);

  useState(() => {
    getRandomCategories();
    getLatestFour();
    getFeatures();
    getClothesAndAccessoires();
  }, []);
  async function getRandomCategories() {
    const res = await client.fetch("*[_type == 'category']");
    const shuffled = [...res].sort(() => 0.5 - Math.random()).slice(0, 3);
    setRandomCategories(shuffled);
  }
  async function getLatestFour() {
    const res = await client.fetch(
      "*[_type == 'product'] | order(_createdAt desc)[0..3]"
    );
    setLatestFour(res);
  }
  async function getFeatures() {
    const res = await client.fetch("*[_type == 'feature']");
    setFeatures(res);
  }
  async function getClothesAndAccessoires() {
    const res = await client.fetch(
      "*[_type == 'product' && (category._ref == '32a56b33-c378-4001-97f0-101d3732ed65' || category._ref == 'c0cdb779-2763-46bb-88bd-af730d66c337')]"
    );
    setClothesAndAccessoires(res);
  }
  return (
    <div>
      <CatgLinks />
      <ul className="flex justify-between gap-y-4 flex-wrap mt-6">
        {randomCategories.map(({ title, _id, image }) => (
          <li key={_id} className="w-full md:w-[30%]">
            <Link
              to={`/${title}`}
              className={`flex items-end text-disabled p-2 w-full h-36 bg-cover bg-center rounded-md relative before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-thickblack before:rounded-md before:opacity-30`}
              style={{ backgroundImage: `url('${urlFor(image)}')` }}
            >
              <span className="z-10">{title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap justify-between mt-8 gap-5">
        {latestFour.map(({ _id, colors, image, desription, price, title }) => (
          <ColoredCard
            key={_id}
            id={_id}
            colors={colors}
            image={image}
            desription={desription}
            price={price}
            title={title}
          />
        ))}
      </ul>
      <ul className="mt-12 flex flex-wrap justify-between md:justify-center gap-5">
        {features.map(({ _id, title, description, image }) => (
          <li
            key={_id}
            className="w-full lg:w-[400px] flex items-center justify-between  gap-4 bg-disabled p-5 rounded-lg"
          >
            <div>
              <h4 className="text-lg font-medium mb-3 text-middleblack">
                {title}
              </h4>
              <p className=" text-paragraph">{description}</p>
            </div>
            <img src={urlFor(image)} className=" w-24" alt="" />
          </li>
        ))}
      </ul>
      <p className="mt-12 text-xl font-medium">
        Discover unique hand-picked items
      </p>
      <ul className="vertical-scroll mt-8 mb-8 pb-4 flex overflow-x-scroll overflow-y-hidden gap-4">
        {clothesAndAccessoires.map(
          ({ _id, image, desription, price, title, colors }) => (
            <SimpleCard
              key={_id}
              id={_id}
              image={image}
              description={desription}
              price={price}
              title={title}
              colors={colors}
            />
          )
        )}
      </ul>
      <div className=" bg-[#5959D9] rounded-t-md p-6 text-disabled">
        <p className="max-w-lg">
          Yes!
          <br />
          Send me exclusive offers, unique gift ideas, and personalized tips for
          shopping and selling on Commerce.
        </p>
        <form className="mt-8 w-full flex flex-col gap-y-4 rounded-full mx-auto text-sm md:w-[700px] md:flex-row md:bg-disabled p-2">
          <input
            type="text"
            placeholder="Drop your email"
            className="rounded-full focus:outline-0 text-subtext caret-url flex-1 p-3"
          />
          <button type="submit" className="bg-third p-2 rounded-full">
            subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
