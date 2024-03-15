import React from "react";
import styles from "./ScoresItem.module.css";

const ScoresItem = ({ className, game }) => {
  const id = game.id;
  const startTime = game["commence_time"];
  const isoStartTime = new Date(startTime);
  const isGameCompleted = game.completed;
  const homeTeam = game["home_team"];
  const awayTeam = game["away_team"];
  const homeTeamScore = game.scores ? game.scores[0].score : "0";
  const awayTeamScore = game.scores ? game.scores[1].score : "0";

  return (
    <tr className={`${styles.row} ${styles[className]}`}>
      <td>
        {homeTeam} vs {awayTeam}
      </td>
      <td>{isoStartTime.toDateString()}</td>
      <td
        className={
          isGameCompleted ? `${styles.completed}` : `${styles.pending}`
        }
      >
        {isGameCompleted ? "Completed" : "Pending"}
      </td>
      <td>
        {homeTeamScore} - {awayTeamScore}
      </td>
    </tr>
  );
};

export default ScoresItem;
