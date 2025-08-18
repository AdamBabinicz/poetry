import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "ytao10t5",
  dataset: "react-blog",
  apiVersion: "2025-08-17",
  useCdn: true,
});
