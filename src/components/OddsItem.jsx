import React from "react";
import styles from "./OddsItem.module.css";
import Button from "./Button";

const OddsItem = ({ className, game }) => {
  const id = game.id;
  const startTime = game["commence_time"];
  const homeTeam = game["home_team"];
  const awayTeam = game["away_team"];
  const betType = game.bookmakers[0].markets[0].key;
  const homeWinOdds = game.bookmakers[0].markets[0].outcomes[0].price;
  const awayWinOdds = game.bookmakers[0].markets[0].outcomes[1].price;
  const drawOdds = game.bookmakers[0].markets[0].outcomes[2].price;

  return (
    <div className={`${styles["odds-item"]} ${styles[className]}`}>
      <div>{startTime}</div>
      <div>
        {homeTeam} vs {awayTeam}
      </div>
      <div>
        {homeTeam} wins: {homeWinOdds}
      </div>
      <div>Draw: {drawOdds}</div>
      <div>
        {awayTeam} wins: {awayWinOdds}
      </div>
      <div>
        <Button className="btn-bet">Place Bet</Button>
      </div>
    </div>
  );
};

export default OddsItem;
