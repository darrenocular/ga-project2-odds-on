import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Button from "./Button";
import LoginContext from "../context/LoginContext";

const NavBar = ({ setShowLoginModal, setLoggedInUser }) => {
  const loginContext = useContext(LoginContext);

  return (
    <>
      <header className={styles.navbar}>
        <ul>
          <li>
            <span className={styles.logo}>Odds-On</span>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/scores">Scores</Link>
          </li>
          {loginContext.loggedInUser && (
            <>
              <li>
                <Link to={`/${loginContext.loggedInUser.fields.username}`}>
                  @{loginContext.loggedInUser.fields.username}
                </Link>
              </li>
              <li>
                <Link to={`/${loginContext.loggedInUser.fields.username}/bets`}>
                  My Bets
                </Link>
              </li>
            </>
          )}
          {loginContext.loggedInUser ? (
            <li>
              <Link to="/">
                <Button
                  className="btn-login"
                  onClick={() => setLoggedInUser(null)}
                >
                  Log Out
                </Button>
              </Link>
            </li>
          ) : (
            <li>
              <Button
                className="btn-login"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </Button>
            </li>
          )}
        </ul>
      </header>
    </>
  );
};

export default NavBar;
