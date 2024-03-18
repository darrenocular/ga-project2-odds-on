import { useState, useRef, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import MyBets from "./pages/MyBets";
import Scores from "./pages/Scores";
import LoginModal from "./components/LoginModal";
import LoginContext from "./context/LoginContext";

function App() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const getUsers = async () => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appDpRLHVndobtdcz/tblg4u2ujHWqgDUJn",
        {
          headers: {
            Authorization: import.meta.env.VITE_AIRTABLE_TOKEN,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setUsers(data.records);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogin = (username, password) => {
    const userMatchOnUsername = users.find(
      (user) => user.fields.username === username
    );

    if (
      userMatchOnUsername &&
      userMatchOnUsername.fields.password === password
    ) {
      setLoggedInUser(userMatchOnUsername);
      setShowLoginModal(false);
    } else {
      console.log("Incorrect username or password");
    }
  };

  const handleAddWallet = async (amountToAdd) => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appDpRLHVndobtdcz/tblg4u2ujHWqgDUJn",
        {
          method: "PATCH",
          headers: {
            Authorization: import.meta.env.VITE_AIRTABLE_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                id: loggedInUser.id,
                fields: {
                  wallet_balance:
                    loggedInUser.fields["wallet_balance"] + Number(amountToAdd),
                },
              },
            ],
          }),
        }
      );

      if (res.ok) {
        console.log("Funds added");
        getUsers();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReduceWallet = async (amountToReduce) => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appDpRLHVndobtdcz/tblg4u2ujHWqgDUJn",
        {
          method: "PATCH",
          headers: {
            Authorization: import.meta.env.VITE_AIRTABLE_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                id: loggedInUser.id,
                fields: {
                  wallet_balance:
                    loggedInUser.fields["wallet_balance"] -
                    Number(amountToReduce),
                },
              },
            ],
          }),
        }
      );

      if (res.ok) {
        console.log("Funds removed");
        getUsers();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Get users on load
  useEffect(() => {
    getUsers();
  }, []);

  // Update loggedInUser on change to wallet balance
  useEffect(() => {
    if (users && loggedInUser) {
      const userToUpdate = users.find(
        (user) => user.fields.username === loggedInUser.fields.username
      );
      setLoggedInUser(userToUpdate);
    }
  }, [users]);

  return (
    <>
      <LoginContext.Provider
        value={{
          loggedInUser,
          setShowLoginModal,
          handleAddWallet,
          handleReduceWallet,
        }}
      >
        <NavBar
          setShowLoginModal={setShowLoginModal}
          setLoggedInUser={setLoggedInUser}
        />
        {showLoginModal && (
          <LoginModal
            setShowLoginModal={setShowLoginModal}
            handleLogin={handleLogin}
          ></LoginModal>
        )}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scores" element={<Scores />} />
          <Route
            path="/:username"
            element={
              loggedInUser ? <Profile /> : <Navigate replace to="/"></Navigate>
            }
          />
          <Route path="/:username/bets" element={<MyBets />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </LoginContext.Provider>
    </>
  );
}

export default App;
