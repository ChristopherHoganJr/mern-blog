import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import EntryPreview from "../components/entries/EntryPreview";

const Home = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    axios.get("/api/post/").then((p) => setPosts(p.data));
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map((e, i) => <EntryPreview key={i} {...e} />)}
    </>
  );
};

export default Home;
