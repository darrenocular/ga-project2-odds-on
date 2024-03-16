import React, { useState, useContext } from "react";
import styles from "./OddsItem.module.css";
import Button from "./Button";
import MatchDetailsModal from "./MatchDetailsModal";
import LoginContext from "../context/LoginContext";

const OddsItem = ({ className, game }) => {
  const loginContext = useContext(LoginContext);

  const id = game.id;
  const startTime = game["commence_time"];
  const isoStartTime = new Date(startTime);
  const homeTeam = game["home_team"];
  const awayTeam = game["away_team"];
  const homeWinOdds = game.bookmakers[0].markets[0].outcomes[0].price;
  const awayWinOdds = game.bookmakers[0].markets[0].outcomes[1].price;
  const drawOdds = game.bookmakers[0].markets[0].outcomes[2].price;

  const [showMatchDetailsModal, setShowMatchDetailsModal] = useState(false);

  return (
    <>
      {showMatchDetailsModal && (
        <MatchDetailsModal
          game={game}
          setShowMatchDetailsModal={setShowMatchDetailsModal}
        ></MatchDetailsModal>
      )}

      <div className={`${styles["odds-item"]} ${styles[className]}`}>
        <div className={styles["game-details"]}>
          <div className={styles["start-time"]}>
            {isoStartTime.toDateString()}
          </div>
          <div className={styles.game}>
            {homeTeam} vs {awayTeam}
          </div>
          <div className={styles["home-odds"]}>
            {homeTeam} Win: {homeWinOdds}
          </div>
          <div className={styles.draw}>Draw: {drawOdds}</div>
          <div className={styles["away-odds"]}>
            {awayTeam} Win: {awayWinOdds}
          </div>
        </div>
        <div>
          <Button
            className="btn-bet"
            onClick={() => {
              loginContext.loggedInUser
                ? setShowMatchDetailsModal(true)
                : loginContext.setShowLoginModal(true);
            }}
          >
            Place Bet
          </Button>
        </div>
      </div>
    </>
  );
};

export default OddsItem;
