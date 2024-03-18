import React, { useContext } from "react";
import styles from "./BetsHistoryDisplay.module.css";
import LoginContext from "../context/LoginContext";
import BetsHistoryItem from "./BetsHistoryItem";

const BetsHistoryDisplay = () => {
  const loginContext = useContext(LoginContext);
  return (
    <div className={styles["bets-history-display"]}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Match</th>
            <th>Match Date</th>
            <th>Bet Type</th>
            <th>Odds</th>
            <th>Bet Amount (S$)</th>
            <th>Bet Result</th>
            <th>Net Gain (+/-) (S$)</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {loginContext.userBets.map(
            (bet, idx) =>
              bet.fields["match_completed"] && (
                <BetsHistoryItem
                  className={idx % 2 === 0 ? "bg-lt-orange" : "bg-lt-yellow"}
                  bet={bet.fields}
                  key={idx}
                ></BetsHistoryItem>
              )
          )}
        </tbody>
      </table>
      {/* <div className={styles["net-gain-row"]}>
        <p>
          <strong>Total Net Gain (+/-) (S$)</strong>
        </p>
        <p>XXX</p>
      </div> */}
    </div>
  );
};

export default BetsHistoryDisplay;
