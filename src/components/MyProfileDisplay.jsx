import React, { useContext } from "react";
import styles from "./MyProfileDisplay.module.css";
import ProfilePicture from "./ProfilePicture";
import LoginContext from "../context/LoginContext";
import WalletDisplay from "./WalletDisplay";

const MyProfileDisplay = () => {
  const loginContext = useContext(LoginContext);
  return (
    <div className={styles["my-profile-display"]}>
      <ProfilePicture></ProfilePicture>
      <p className={styles.user}>
        {loginContext.loggedInUser.fields["first_name"]}{" "}
        {loginContext.loggedInUser.fields["last_name"]}
      </p>
      <p className={styles.username}>
        @{loginContext.loggedInUser.fields.username}
      </p>
      <WalletDisplay></WalletDisplay>
    </div>
  );
};

export default MyProfileDisplay;
