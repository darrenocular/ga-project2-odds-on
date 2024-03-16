import React from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import styles from "./BetTypesDisplay.module.css";

const BetTypesDisplay = ({
  homeTeam,
  awayTeam,
  betType,
  homeWinOdds,
  drawOdds,
  awayWinOdds,
}) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>Bet Type</th>
          <th>Odds</th>
          <th>Bet Amount (S$)</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        <tr className={styles.row}>
          <td>
            {betType.toUpperCase()}: {homeTeam} (H) Win
          </td>
          <td>{homeWinOdds}</td>
          <td>
            <FormInput
              type="text"
              placeholder="Bet amount"
              className="bet-input"
            ></FormInput>
            <Button className="btn-bet">Place Bet</Button>
          </td>
        </tr>
        <tr className={styles.row}>
          <td>{betType.toUpperCase()}: Draw</td>
          <td>{drawOdds}</td>
          <td>
            <FormInput
              type="text"
              placeholder="Bet amount"
              className="bet-input"
            ></FormInput>
            <Button className="btn-bet">Place Bet</Button>
          </td>
        </tr>
        <tr className={styles.row}>
          <td>
            {betType.toUpperCase()}: {awayTeam} (A) Win
          </td>
          <td>{awayWinOdds}</td>
          <td>
            <FormInput
              type="text"
              placeholder="Bet amount"
              className="bet-input"
            ></FormInput>
            <Button className="btn-bet">Place Bet</Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BetTypesDisplay;
