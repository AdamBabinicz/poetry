import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import { Link } from "react-router-dom";
import heroImage from "../assets/1.avif";

export default function AllPost() {
  const [allPostsData, setAllPosts] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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
    <main>
      <div className="container mx-auto">
        <section className="flex flex-col lg:flex-row lg:items-start pt-12 px-6 lg:pt-24 lg:px-8 lg:gap-x-12">
          <div className="lg:w-1/3 w-full mb-8 lg:mb-0">
            <img
              src={heroImage}
              alt="Okładka tomiku Wiersze Antypowabne"
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </div>

          <div className="lg:w-2/3 w-full">
            <h2 className="text-5xl flex justify-center lg:justify-start text-black text-opacity-75 flex-wrap">
              Blo
              <sub
                className="text-5xl mt-2 transform rotate-45 -ml-4 mr-4 text-white"
                style={{
                  textShadow: "0.05rem 0.05rem 0.05rem rgba(0, 0, 0, 0.72)",
                }}
              >
                k
              </sub>
              &nbsp;<span className="text-center">wierszowany</span>
            </h2>
            <h3 className="text-3xl text-white text-opacity-90 flex justify-center lg:justify-start mt-2 mb-8">
              blog pismacki
            </h3>

            <div className="space-y-4 text-black text-opacity-60">
              <div className="bg-white p-4 bg-opacity-25 rounded-lg space-y-4">
                <p>
                  Autor urodził się dokładnie 100 lat później, niż Nikola Tesla.
                  Nie tytułuje się żadnym przedrostkiem. Nie ma wyuczonego
                  zawodu.
                </p>
                <p>
                  Jako subiekt przez witrynę sklepową obserwował przechodzących
                  ludzi. Wtedy zauważył, że są jak „na sznurkach”.
                </p>
                <p>
                  Interesuje się kosmologią i{"\u00A0"}programowaniem. Nie
                  posiada dorobku; w{"\u00A0"}żadnej dziedzinie nie osiągnął
                  mistrzostwa.
                </p>
              </div>
              <div className="bg-white p-4 bg-opacity-25 rounded-lg">
                <p>
                  Adam Gierczak w swoim tomiku z 2016 roku zabiera nas w podróż
                  przez codzienność, która staje się pretekstem do największych
                  pytań egzystencjalnych. To poezja bez ozdobników - uczciwa,
                  refleksyjna, czasem ironiczna.
                </p>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-white bg-opacity-40 text-black text-opacity-75 px-4 py-2 rounded-lg hover:bg-opacity-60 transition-colors duration-300 cursor-pointer focus:outline-none"
              >
                {isExpanded ? "Zwiń ..." : "Więcej ..."}
              </button>

              {isExpanded && (
                <div className="space-y-4">
                  <div className="bg-white p-4 bg-opacity-25 rounded-lg">
                    <p className="mb-2">Co znajdziecie w tym tomiku:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Obserwacje zwykłego człowieka o niezwykłych sprawach
                      </li>
                      <li>
                        Refleksje o przemijaniu, niespełnieniu i zdziwieniu
                        życiem
                      </li>
                      <li>
                        Wiersze o kosmosie widziane z perspektywy sklepowego
                        subiekta
                      </li>
                      <li>
                        Metafory zrodzone z codzienności, które dotykają
                        uniwersalnych prawd
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 bg-opacity-25 rounded-lg">
                    <p>
                      Dla kogo ta poezja? Dla wszystkich, którzy lubią patrzeć
                      na świat z dystansu, zadawać niewygodne pytania i
                      znajdować piękno w "antypowabności" - czyli w tym, co
                      prawdziwe, nieukraszane, ludzkie.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 lg:py-24 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPostsData &&
              allPostsData.map((post) => (
                <Link to={"/" + post.slug.current} key={post.slug.current}>
                  <span className="block bg-white block h-64 relative rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-8 border-black border-opacity-75">
                    <img
                      className="w-full h-full rounded-r object-cover absolute"
                      src={post.mainImage.asset.url}
                      alt="main here image blog post"
                    />
                    <span className="block relative h-full flex justify-end items-end pr-4 pb-4">
                      <h2 className="text-white text-lg font-bold px-3 py-4 bg-black bg-opacity-60 rounded">
                        {post.title}
                      </h2>
                    </span>
                  </span>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
