import React from "react";
import { Link } from "react-router-dom";
import { utcToZonedTime, format } from "date-fns-tz";
import { BASE_URL } from "../Helper";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  const date = utcToZonedTime(createdAt, "Asia/Kolkata");
  const renderDatePicker = (date) => {
    const formattedDate = format(date, "MMMM d, yyyy HH:mm:ss", {
      timeZone: "Asia/Kolkata",
    });

    return formattedDate;
  };
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`${BASE_URL}/${cover}`} alt="alternate" />
        </Link>
      </div>
      <div className="content">
        <Link to={`/post/${_id}`}>
          <h3>{title}</h3>
        </Link>

        <p className="info">
          <a className="author">{author.username}</a>
          <time>{renderDatePicker(date)}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
