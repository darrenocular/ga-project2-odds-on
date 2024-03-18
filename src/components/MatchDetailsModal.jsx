import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import styles from "./MatchDetailsModal.module.css";
import Button from "./Button";
import BetTypesDisplay from "./BetTypesDisplay";
import HistoricalOddsDisplay from "./HistoricalOddsDisplay";

const OverLay = ({ game, setShowMatchDetailsModal }) => {
  const id = game.id;
  const startTime = game["commence_time"];
  const isoStartTime = new Date(startTime);
  const homeTeam = game["home_team"];
  const awayTeam = game["away_team"];
  const betType = game.bookmakers[0].markets[0].key;
  const homeWinOdds = game.bookmakers[0].markets[0].outcomes.find(
    (outcome) => outcome.name === homeTeam
  ).price;
  const awayWinOdds = game.bookmakers[0].markets[0].outcomes.find(
    (outcome) => outcome.name === awayTeam
  ).price;
  const drawOdds = game.bookmakers[0].markets[0].outcomes.find(
    (outcome) => outcome.name === "Draw"
  ).price;

  const [showHistoricalOdds, setShowHistoricalOdds] = useState(false);

  return (
    <div className="backdrop">
      <div className={`modal ${styles["match-details-modal"]}`}>
        <div>
          <Button
            className="btn-close"
            onClick={() => setShowMatchDetailsModal(false)}
          >
            X
          </Button>
        </div>
        <p className={styles["league-header"]}>English Premier League (EPL)</p>
        <p className={styles["game-title"]}>
          {homeTeam} vs {awayTeam}
        </p>
        <p className={styles["date-time"]}>
          {isoStartTime.toDateString() + " " + isoStartTime.toTimeString()}
        </p>
        <div>
          <Button
            className={
              !showHistoricalOdds ? "btn-types-active" : "btn-types-inactive"
            }
            onClick={() => setShowHistoricalOdds(false)}
          >
            Bet types
          </Button>
          <Button
            className={
              showHistoricalOdds ? "btn-types-active" : "btn-types-inactive"
            }
            onClick={() => setShowHistoricalOdds(true)}
          >
            Historical Odds
          </Button>
        </div>
        {!showHistoricalOdds ? (
          <BetTypesDisplay
            id={id}
            matchDate={startTime}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            betType={betType}
            homeWinOdds={homeWinOdds}
            drawOdds={drawOdds}
            awayWinOdds={awayWinOdds}
          ></BetTypesDisplay>
        ) : (
          <HistoricalOddsDisplay></HistoricalOddsDisplay>
        )}
      </div>
    </div>
  );
};

const MatchDetailsModal = ({ game, setShowMatchDetailsModal }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          game={game}
          setShowMatchDetailsModal={setShowMatchDetailsModal}
        ></OverLay>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default MatchDetailsModal;
