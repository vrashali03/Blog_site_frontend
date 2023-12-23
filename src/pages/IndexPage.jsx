import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { BASE_URL } from "../Helper";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/post`, { method: "GET" }).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post, idx) => <Post key={idx} {...post} />)}
    </>
  );
};

export default IndexPage;
