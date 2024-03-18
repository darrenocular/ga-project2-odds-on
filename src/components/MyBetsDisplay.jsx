import React, { useState } from "react";
import Button from "./Button";
import ActiveBetsDisplay from "./ActiveBetsDisplay";
import BetsHistoryDisplay from "./BetsHistoryDisplay";
import styles from "./MyBetsDisplay.module.css";

const MyBetsDisplay = () => {
  const [showBetsHistory, setShowBetsHistory] = useState(false);

  return (
    <div className={styles["my-bets-display"]}>
      <div>
        <Button
          className={
            !showBetsHistory ? "btn-types-active" : "btn-types-inactive"
          }
          onClick={() => setShowBetsHistory(false)}
        >
          Active Bets
        </Button>
        <Button
          className={
            showBetsHistory ? "btn-types-active" : "btn-types-inactive"
          }
          onClick={() => setShowBetsHistory(true)}
        >
          Bets History
        </Button>
      </div>
      {!showBetsHistory ? (
        <ActiveBetsDisplay></ActiveBetsDisplay>
      ) : (
        <BetsHistoryDisplay></BetsHistoryDisplay>
      )}
    </div>
  );
};

export default MyBetsDisplay;
