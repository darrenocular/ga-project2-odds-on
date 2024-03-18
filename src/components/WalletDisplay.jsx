import React, { useState, useContext } from "react";
import LoginContext from "../context/LoginContext";
import Button from "./Button";
import styles from "./WalletDisplay.module.css";
import FormInput from "./FormInput";

const WalletDisplay = () => {
  const [addWalletInput, setAddWalletInput] = useState("");
  const [showAddWalletInput, setShowAddWalletInput] = useState(false);
  const loginContext = useContext(LoginContext);

  return (
    <div className={styles["wallet-display"]}>
      <p>Wallet</p>
      <div className={styles.row}>
        <p>Balance: S${loginContext.loggedInUser.fields["wallet_balance"]}</p>
        <div className={styles.subrow}>
          {showAddWalletInput && (
            <>
              S$
              <FormInput
                type="text"
                className="add-funds-input"
                placeholder="0"
                value={addWalletInput}
                onChange={(e) => setAddWalletInput(e.target.value)}
                autoFocus={true}
              ></FormInput>
            </>
          )}
          <Button
            className="btn-add-funds"
            onClick={
              showAddWalletInput
                ? () => {
                    loginContext.handleAddWallet(addWalletInput);
                    setShowAddWalletInput(false);
                  }
                : () => setShowAddWalletInput(true)
            }
          >
            Add
          </Button>
        </div>
      </div>
      {showAddWalletInput && (
        <div>
          <img src="./qr.jpg"></img>
        </div>
      )}
    </div>
  );
};

export default WalletDisplay;
