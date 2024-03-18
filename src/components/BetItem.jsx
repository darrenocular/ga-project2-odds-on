import React, { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import styles from "./BetItem.module.css";

const BetItem = ({ className, bet, userBetId, getBets }) => {
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
                }
              : () => {
                  setIsAmending(true);
                  setBetAmountInput(bet["bet_amount"]);
                }
          }
        >
          Amend
        </Button>
        <Button className="btn-delete" onClick={handleDeleteBet}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default BetItem;
