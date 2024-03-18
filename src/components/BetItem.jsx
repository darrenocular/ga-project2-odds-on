import React, { useState, useContext } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import styles from "./BetItem.module.css";
import LoginContext from "../context/LoginContext";

const BetItem = ({ className, bet, userBetId, getBets }) => {
  const loginContext = useContext(LoginContext);
  const [isAmending, setIsAmending] = useState(false);
  const [betAmountInput, setBetAmountInput] = useState("");
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
        console.log("Bet amended");
        getBets();
      }
    } catch (error) {
      console.log(error.message);
    }
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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <tr className={`${styles.row} ${styles[className]}`}>
      <td>Match</td>
      <td>Match Date</td>
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
              ? () => {
                  handleAmendBet();
                  setIsAmending(false);
                  {
                    Number(betAmountInput) - bet["bet_amount"] > 0
                      ? loginContext.handleReduceWallet(
                          Number(betAmountInput) - bet["bet_amount"]
                        )
                      : loginContext.handleAddWallet(
                          bet["bet_amount"] - Number(betAmountInput)
                        );
                  }
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
