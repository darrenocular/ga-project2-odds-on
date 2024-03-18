import React, { useContext } from "react";
import styles from "./ScoresDisplay.module.css";
import ScoresItem from "./ScoresItem";
import LoginContext from "../context/LoginContext";

const ScoresDisplay = () => {
  const loginContext = useContext(LoginContext);

  return (
    <>
      <div className={styles["scores-display"]}>
        <p className={styles["league-header"]}>English Premier League (EPL)</p>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Match</th>
              <th>Match Date</th>
              <th>Status</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {/* {loginContext.sampleScores.map((game, idx) => (
              <ScoresItem
                className={idx % 2 === 0 ? "bg-lt-orange" : "bg-lt-yellow"}
                game={game}
                key={idx}
              ></ScoresItem>
            ))} */}
            {loginContext.scores.map((game, idx) => (
              <ScoresItem
                className={idx % 2 === 0 ? "bg-lt-orange" : "bg-lt-yellow"}
                game={game}
                key={idx}
              ></ScoresItem>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ScoresDisplay;
