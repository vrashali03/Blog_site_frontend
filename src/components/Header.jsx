import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { BASE_URL } from "../Helper";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${BASE_URL}/userVerification`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUserInfo("");
    navigate("/");
  };

  const [open, setOpen] = useState(false); //open and closes the dropdown
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleMenu = () => {
    //closes the dropdown
    setOpen(false);
  };

  const username = userInfo?.username;

  return (
    <header>
      <div className="header-logo">
        <Link to="/" className="logo">
          MyBlog
        </Link>
      </div>
      <div className="header-nav">
        <nav>
          {username && (
            <>
              <span>Hello, {username}</span>
              <Link to="/create">Create new post</Link>
              <div>
                <div className="profile-dropdown">
                  <button onClick={handleOpen}>Profile</button>
                  {open ? (
                    <ul className="menu">
                      <li className="drop-item">
                        {/* <button onClick={handleMenu}>Your Posts</button> */}
                        <Link
                          className="post-li"
                          onClick={handleMenu}
                          to={`/posts/${userInfo.id}`}>
                          Your Posts
                        </Link>
                      </li>
                      <li className="drop-item">
                        <Link
                          className="profile-li"
                          onClick={handleMenu}
                          to={`/profile/${userInfo.id}`}>
                          Profile
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
              {/* <a onClick={logout}>Logout</a> */}
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register"> Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
