import React, { useContext } from "react";
import LoginContext from "../context/LoginContext";
import styles from "./ActiveBetsDisplay.module.css";
import BetItem from "./BetItem";

const ActiveBetsDisplay = () => {
  const loginContext = useContext(LoginContext);

  return (
    <div className={styles["active-bets-display"]}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Match</th>
            <th>Match Date</th>
            <th>Bet Type</th>
            <th>Odds</th>
            <th>Bet Amount (S$)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {loginContext.userBets.map(
            (bet, idx) =>
              !bet.fields["match_completed"] && (
                <BetItem
                  className={idx % 2 === 0 ? "bg-lt-orange" : "bg-lt-yellow"}
                  userBetId={bet.id}
                  bet={bet.fields}
                  getBets={loginContext.getBets}
                  key={idx}
                ></BetItem>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveBetsDisplay;
