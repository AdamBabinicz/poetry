import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import { IoMdArrowDropleftCircle } from "react-icons/io";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug] {
        title,
        slug,
        mainImage {
          asset->{
            _id,
            url
          }
        },
        body,
        "name": author->name,
        "authorImage": author->image,
      }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!postData)
    return (
      <div className="absolute h-full w-full flex items-center justify-center">
        Loading...
      </div>
    );
  return (
    <div className="bg-black bg-opacity-25  min-h-screen lg:px-40 lg:py-24 w-full relative">
      <Link to="/">
        <p className="fixed text-4xl z-10 text-black text-opacity-50 top-0 left-0 h-16 w-16 flex justify-center items-center hover:text-black text-opacity-25 transition duration-300 ease-in-out">
          <IoMdArrowDropleftCircle />
        </p>
      </Link>
      <div className="container shadow-lg mx-auto bg-white rounded-lg">
        <div className="relative">
          <div className="absolute h-full w-full flex items-center justify-center p-4">
            <div className="bg-white bg-opacity-75 rounded p-12">
              <h2 className="text-black text-opacity-75 text-3xl lg:text-5xl mb-4">
                {postData.title}
              </h2>
              <div className="flex justify-center text-black text-opacity-75">
                <img
                  // className="w-10"
                  src={urlFor(postData.authorImage).width(100).url()}
                  alt="Author"
                />
                <h4 className="flex items-center pl-2 text-2xl">
                  {postData.name}
                </h4>
              </div>
            </div>
          </div>
          <img
            className="w-full object-cover rounded-t"
            style={{ height: "400px" }}
            src={urlFor(postData.mainImage).width(200).url()}
            alt="main image of post"
          />
        </div>
        <div className="px-6 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full text-black text-opacity-75 flex items-center justify-center">
          <BlockContent
            blocks={postData.body}
            projectId={sanityClient.clientConfig.projectId}
            dataset={sanityClient.clientConfig.dataset}
          />
        </div>
      </div>
    </div>
  );
}
