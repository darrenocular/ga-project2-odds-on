import React from "react";
import styles from "./BetsHistoryItem.module.css";

const BetsHistoryItem = ({ className, bet }) => {
  return (
    <tr className={`${styles.row} ${styles[className]}`}>
      <td>{bet ? `${bet["home_team"]} vs ${bet["away_team"]}` : "Match"}</td>
      <td>{bet ? `${new Date(bet["match_date"]).toDateString()}` : "Date"}</td>
      <td>{bet["bet_type"]}</td>
      <td>{bet.odds}</td>
      <td>{bet["bet_amount"]}</td>
      <td
        className={bet["bet_win"] ? `${styles.success}` : `${styles.failure}`}
      >
        {bet["bet_win"] ? "Success" : "Failure"}
      </td>
      <td
        className={bet["bet_win"] ? `${styles.success}` : `${styles.failure}`}
      >
        {bet["bet_win"] ? "+" : "-"}
        {bet["net_gain"]}
      </td>
    </tr>
  );
};

export default BetsHistoryItem;
