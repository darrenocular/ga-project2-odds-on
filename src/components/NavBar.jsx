import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Button from "./Button";

const NavBar = () => {
  // Simular current username
  const username = "darrenocular";

  const showLoginModal = () => {};

  return (
    <header className={styles.navbar}>
      <ul>
        <li>
          <span className={styles.logo}>Odds-On</span>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* Only appears if user is logged in */}
        {/* <li>
          <Link to={`/${username}`}>Profile</Link>
        </li>
        <li>
          <Link to={`/${username}/bets`}>My Bets</Link>
        </li> */}
        <li>
          <Button className="btn-login" onClick={showLoginModal}>
            Login
          </Button>
        </li>
        {/* Only appears if user is logged in */}
        {/* <li>
          <Button className="btn-login">Log Out</Button>
        </li> */}
        {/* <li>
            <Link to="/:username">@username</Link>
          </li> */}
      </ul>
    </header>
  );
};

export default NavBar;
