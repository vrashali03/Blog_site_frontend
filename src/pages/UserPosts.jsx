import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { BASE_URL } from "../Helper";

const UserPosts = () => {
  const [postsInfo, setPostsInfo] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    fetch(`${BASE_URL}/posts/${userId}`, { method: "GET" }).then((response) => {
      response.json().then((posts) => {
        setPostsInfo(posts);
      });
    });
  }, []);
  if (postsInfo.length === 0) {
    return "No Posts";
  }

  return (
    <>{postsInfo.length > 0 && postsInfo.map((post) => <Post {...post} />)}</>
  );
};
export default UserPosts;
