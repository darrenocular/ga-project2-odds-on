import React, { useState, useContext } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import styles from "./BetItem.module.css";
import LoginContext from "../context/LoginContext";

const BetItem = ({ className, bet, userBetId, getBets }) => {
  const loginContext = useContext(LoginContext);
  const [isAmending, setIsAmending] = useState(false);
  const [betAmountInput, setBetAmountInput] = useState(undefined);
  const betId = bet["bet_id"];
  const game = loginContext.odds.find((game) => game.id === betId);

  const handleAmendBet = async () => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appDpRLHVndobtdcz/tbl3xbkqsX22izh3j",
        {
          method: "PATCH",
          headers: {
            Authorization: import.meta.env.VITE_AIRTABLE_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                id: userBetId,
                fields: {
                  bet_amount: Number(betAmountInput),
                },
              },
            ],
          }),
        }
      );

      if (res.ok) {
        getBets();
        setBetAmountInput(undefined);
      }
    } catch (error) {}
  };

  const handleDeleteBet = async () => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appDpRLHVndobtdcz/tbl3xbkqsX22izh3j/" +
          userBetId,
        {
          method: "DELETE",
          headers: {
            Authorization: import.meta.env.VITE_AIRTABLE_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        console.log("Bet deleted");
        getBets();
      }
    } catch (error) {}
  };

  return (
    <tr className={`${styles.row} ${styles[className]}`}>
      <td>{game ? `${game["home_team"]} vs ${game["away_team"]}` : "Match"}</td>
      <td>
        {game ? `${new Date(game["commence_time"]).toDateString()}` : "Date"}
      </td>
      <td>{bet["bet_type"]}</td>
      <td>{bet.odds}</td>
      <td>
        {isAmending ? (
          <FormInput
            type="text"
            className="bet-amount-input"
            value={betAmountInput}
            onChange={(e) => setBetAmountInput(e.target.value)}
            autoFocus={true}
          ></FormInput>
        ) : (
          bet["bet_amount"]
        )}
      </td>
      <td className={styles.flex}>
        <Button
          className="btn-amend"
          onClick={
            isAmending
              ? Number(betAmountInput) > bet["bet_amount"]
                ? loginContext.loggedInUser.fields["wallet_balance"] >=
                  Number(betAmountInput) - bet["bet_amount"]
                  ? () => {
                      loginContext.handleReduceWallet(
                        Number(betAmountInput) - bet["bet_amount"]
                      );
                      handleAmendBet();
                      setIsAmending(false);
                    }
                  : () => console.log("Insufficient funds")
                : () => {
                    loginContext.handleAddWallet(
                      bet["bet_amount"] - Number(betAmountInput)
                    );
                    handleAmendBet();
                    setIsAmending(false);
                  }
              : () => {
                  setIsAmending(true);
                  setBetAmountInput(bet["bet_amount"]);
                }
          }
        >
          Amend
        </Button>
        <Button
          className="btn-delete"
          onClick={() => {
            handleDeleteBet();
            loginContext.handleAddWallet(bet["bet_amount"]);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default BetItem;
