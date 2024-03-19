import React, { useState, useContext } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import styles from "./BetTypesDisplay.module.css";
import LoginContext from "../context/LoginContext";

const BetTypesDisplay = ({
  id,
  homeTeam,
  awayTeam,
  betType,
  homeWinOdds,
  drawOdds,
  awayWinOdds,
  matchDate,
}) => {
  const loginContext = useContext(LoginContext);
  const [betAmounts, setBetAmounts] = useState({
    H: "",
    D: "",
    A: "",
  });

  const handleBetAmountChange = (e) => {
    setBetAmounts((prev) => {
      return {
        ...prev,
        [e.target.name]: Number(e.target.value),
      };
    });
  };

  // Add bet
  const addBet = async (e) => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appDpRLHVndobtdcz/tbl3xbkqsX22izh3j",
        {
          method: "POST",
          headers: {
            Authorization: import.meta.env.VITE_AIRTABLE_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  user_id: [loginContext.loggedInUser.id],
                  bet_id: id,
                  bet_type: e.target.name,
                  bet_amount: betAmounts[e.target.name],
                  odds:
                    e.target.name === "H"
                      ? homeWinOdds
                      : e.target.name === "D"
                      ? drawOdds
                      : awayWinOdds,
                  home_team: homeTeam,
                  away_team: awayTeam,
                  match_date: matchDate,
                },
              },
            ],
          }),
        }
      );

      if (res.ok) {
        loginContext.getBets();
      }
    } catch (error) {}
  };

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
              placeholder="0"
              className="bet-input"
              value={betAmounts.H}
              name="H"
              onChange={handleBetAmountChange}
            ></FormInput>
            <Button
              className="btn-bet"
              name="H"
              onClick={
                loginContext.loggedInUser.fields["wallet_balance"] >=
                Number(betAmounts.H)
                  ? (e) => {
                      addBet(e);
                      loginContext.handleReduceWallet(betAmounts.H);
                      setBetAmounts({
                        H: "",
                        D: "",
                        A: "",
                      });
                    }
                  : () => console.log("Insufficient funds")
              }
            >
              Place Bet
            </Button>
          </td>
        </tr>
        <tr className={styles.row}>
          <td>{betType.toUpperCase()}: Draw</td>
          <td>{drawOdds}</td>
          <td>
            <FormInput
              type="text"
              placeholder="0"
              className="bet-input"
              value={betAmounts.D}
              name="D"
              onChange={handleBetAmountChange}
            ></FormInput>
            <Button
              className="btn-bet"
              name="D"
              onClick={
                loginContext.loggedInUser.fields["wallet_balance"] >=
                Number(betAmounts.D)
                  ? (e) => {
                      addBet(e);
                      loginContext.handleReduceWallet(betAmounts.D);
                      setBetAmounts({
                        H: "",
                        D: "",
                        A: "",
                      });
                    }
                  : () => console.log("Insufficient funds")
              }
            >
              Place Bet
            </Button>
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
              placeholder="0"
              className="bet-input"
              value={betAmounts.A}
              name="A"
              onChange={handleBetAmountChange}
            ></FormInput>
            <Button
              className="btn-bet"
              name="A"
              onClick={
                loginContext.loggedInUser.fields["wallet_balance"] >=
                Number(betAmounts.A)
                  ? (e) => {
                      addBet(e);
                      loginContext.handleReduceWallet(betAmounts.A);
                      setBetAmounts({
                        H: "",
                        D: "",
                        A: "",
                      });
                    }
                  : () => console.log("Insufficient funds")
              }
            >
              Place Bet
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BetTypesDisplay;
