import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import { Link } from "react-router-dom";

export default function AllPost() {
  const [allPostsData, setAllPosts] = useState(null);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
            title,
            slug,
            mainImage{
               asset->{
                  _id,
                  url
               }
            }
         }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);
  return (
    <div className="bg-black bg-opacity-25 min-h-screen p-12">
      <div className="container mx-auto">
        <h2 className="text-5xl flex justify-center text-black text-opacity-75">
          Blo
          <sub className="text-5xl mt-2 transform rotate-45 -ml-4 mr-4">k</sub>
          &nbsp;wierszowany
        </h2>
        <h3 className="text-lg text-black text-opacity-50 flex justify-center mb-12">
          blog pismacki
        </h3>
        <h4 className="mb-12 text-black text-opacity-50 grid md:grid-cols-3 gap-8">
          <p>
            Autor urodził się dokładnie 100 lat później, niż Nikola Tesla.
            <br /> Nie tytułuje się żadnym przedrostkiem. Nie ma wyuczonego
            zawodu. W swoim życiu wykonywał ich wiele.
          </p>
          <p>
            Jako subiekt przez witrynę sklepową obserwował przechodzących ludzi.
            Wtedy zauważył, że są jak „na sznurkach”.
          </p>
          <p>
            Interesuje się kosmologią i programowaniem. Nie posiada dorobku; w
            żadnej dziedzinie nie osiągnął mistrzostwa.
          </p>
        </h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:grid-cols-1">
          {allPostsData &&
            allPostsData.map((post, index) => (
              <Link to={"/" + post.slug.current} key={post.slug.current}>
                <span
                  className="block bg-white block h-64 relative rounded shadow leading-snug border-l-8 border-black border-opacity-75"
                  key={index}
                >
                  <img
                    className="w-full h-full rounded-r object-cover absolute"
                    src={post.mainImage.asset.url}
                    alt="main here image blog post"
                  />
                  <span className="block relative  h-full flex justify-end items-end pr-4 pb-4">
                    <h2 className="text-white text-opacity-75 text-lg font-bold px-3 py-4 bg-black bg-opacity-50 rounded hover:text-white text-opacity-50 transition duration-300 ease-in-out hover:bg-black">
                      {post.title}
                    </h2>
                  </span>
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
