import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../Helper";

const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState("");
  const { userId } = useParams();
  useEffect(() => {
    fetch(`${BASE_URL}/profile/${userId}`).then((response) => {
      response.json().then((profileInfo) => {
        setProfileInfo(profileInfo);
      });
    });
  }, []);

  return (
    <div className="profile-info">
      <h1>Your Profile</h1>
      <div className="info">
        <label>Your Name : </label>
        <div>{profileInfo.name}</div>
      </div>
      <div className="info">
        <label>Your Username : </label>
        <div>{profileInfo.username}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
