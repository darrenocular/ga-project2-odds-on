import React, { useContext } from "react";
import OddsItem from "./OddsItem";
import styles from "./OddsDisplay.module.css";
import LoginContext from "../context/LoginContext";

const OddsDisplay = () => {
  const loginContext = useContext(LoginContext);

  return (
    <>
      <div className={styles["odds-display"]}>
        <p className={styles["league-header"]}>English Premier League (EPL)</p>
        {/* {loginContext.sampleOdds.map((game, idx) => (
          <OddsItem
            className={idx % 2 === 0 ? "bg-lt-orange" : "bg-lt-yellow"}
            key={idx}
            game={game}
          ></OddsItem>
        ))} */}
        {loginContext.odds.map((game, idx) => (
          <OddsItem
            className={idx % 2 === 0 ? "bg-lt-orange" : "bg-lt-yellow"}
            key={idx}
            game={game}
          ></OddsItem>
        ))}
      </div>
    </>
  );
};

export default OddsDisplay;
