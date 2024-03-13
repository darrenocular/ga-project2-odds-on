import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  return <div>{params.username}'s Profile</div>;
};

export default Profile;
