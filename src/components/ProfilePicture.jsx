import React from "react";
import styles from "./ProfilePicture.module.css";

const ProfilePicture = () => {
  return (
    <img
      src="https://www.ncpg.org.sg/images/default-source/default-album/excuses.png"
      className={styles["profile-img"]}
    ></img>
  );
};

export default ProfilePicture;
