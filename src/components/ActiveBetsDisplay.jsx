import React, { useContext, useState, useEffect } from "react";
import LoginContext from "../context/LoginContext";
import styles from "./ActiveBetsDisplay.module.css";
import BetItem from "./BetItem";

const ActiveBetsDisplay = () => {
  const loginContext = useContext(LoginContext);
  const [bets, setBets] = useState([]);
  const [userBets, setUserBets] = useState([]);

  const getBets = async () => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appDpRLHVndobtdcz/tbl3xbkqsX22izh3j",
        {
          headers: {
            Authorization: import.meta.env.VITE_AIRTABLE_TOKEN,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setBets(data.records);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBets();
  }, []);

  useEffect(() => {
    if (loginContext.loggedInUser) {
      const filteredBets = bets.filter((bet) => {
        return bet.fields["user_id"][0] === loginContext.loggedInUser.id;
      });
      setUserBets(filteredBets);
    }
  }, [bets]);

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
          {userBets.map((bet, idx) => (
            <BetItem
              className={idx % 2 === 0 ? "bg-lt-orange" : "bg-lt-yellow"}
              userBetId={bet.id}
              bet={bet.fields}
              getBets={getBets}
              key={idx}
            ></BetItem>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveBetsDisplay;
