import { useState, useEffect } from "react";
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
  const [odds, setOdds] = useState([]);
  const [scores, setScores] = useState([]);
  const [bets, setBets] = useState([]);
  const [userBets, setUserBets] = useState([]);

  const getOdds = async (signal) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER +
          "/odds/?apiKey=" +
          import.meta.env.VITE_API_KEY +
          "&bookmakers=paddypower&markets=h2h",
        { signal }
      );

      if (res.ok) {
        const data = await res.json();
        setOdds(data);
      }
    } catch (error) {}
  };

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

      let offset = data.offset;
      if (offset !== undefined) {
        do {
          const offsetRes = await fetch(
            "https://api.airtable.com/v0/appDpRLHVndobtdcz/tblg4u2ujHWqgDUJn/&offset=" +
              offset,
            {
              headers: {
                Authorization: import.meta.env.VITE_AIRTABLE_TOKEN,
              },
            }
          );

          if (offsetRes.ok) {
            const offsetData = await res.json();
            setUsers((prev) =>
              structuredClone(prev).concat(structuredClone(offsetData.records))
            );
            offset = offsetData.offset;
          }
        } while (offset !== undefined);
      }
    } catch (error) {}
  };

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

      let offset = data.offset;
      if (offset !== undefined) {
        do {
          const offsetRes = await fetch(
            "https://api.airtable.com/v0/appDpRLHVndobtdcz/tbl3xbkqsX22izh3j/&offset=" +
              offset,
            {
              headers: {
                Authorization: import.meta.env.VITE_AIRTABLE_TOKEN,
              },
            }
          );

          if (offsetRes.ok) {
            const offsetData = await res.json();
            setUsers((prev) =>
              structuredClone(prev).concat(structuredClone(offsetData.records))
            );
            offset = offsetData.offset;
          }
        } while (offset !== undefined);
      }
    } catch (error) {}
  };

  const getUserBets = () => {
    if (loggedInUser) {
      const filteredBets = bets.filter((bet) => {
        return bet.fields["user_id"][0] === loggedInUser.id;
      });
      setUserBets(filteredBets);
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
        getUsers();
      }
    } catch (error) {}
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
        getUsers();
      }
    } catch (error) {}
  };

  const updateUserBets = async () => {
    const completedMatches = scores.filter((score) => score.completed);
    const completedMatchesIds = completedMatches.map(
      (completedMatch) => completedMatch.id
    );
    const userBetsToUpdate = userBets.filter((userBet) =>
      completedMatchesIds.includes(userBet.fields["bet_id"])
    );
    const formattedUserBetsToUpdate = userBetsToUpdate.map((userBet) => {
      return {
        id: userBet.id,
        fields: {
          match_completed: true,
          home_score: Number(
            completedMatches
              .find((score) => score.id === userBet.fields["bet_id"])
              .scores.find(
                (score) => score.name === userBet.fields["home_team"]
              ).score
          ),
          away_score: Number(
            completedMatches
              .find((score) => score.id === userBet.fields["bet_id"])
              .scores.find(
                (score) => score.name === userBet.fields["away_team"]
              ).score
          ),
        },
      };
    });

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
            records: structuredClone(formattedUserBetsToUpdate),
          }),
        }
      );
      if (res.ok) {
        getUserBets();
      }
    } catch (error) {}
  };

  const getScores = async (signal) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER +
          "/scores/?daysFrom=3&apiKey=" +
          import.meta.env.VITE_API_KEY,
        { signal }
      );

      if (res.ok) {
        const data = await res.json();
        setScores(data);
      }
    } catch (error) {}
  };

  // Get all users, bets, odds and scores on mount
  useEffect(() => {
    const oddsController = new AbortController();
    const scoresController = new AbortController();
    getOdds(oddsController.signal);
    getScores(scoresController.signal);
    getUsers();
    getBets();

    return () => {
      oddsController.abort();
      scoresController.abort();
    };
  }, []);

  // Filter for user bets based on logged in user or bets change
  useEffect(() => getUserBets(), [bets, loggedInUser]);

  // Update loggedInUser on change to wallet balance
  useEffect(() => {
    if (users && loggedInUser) {
      const userToUpdate = users.find(
        (user) => user.fields.username === loggedInUser.fields.username
      );
      setLoggedInUser(userToUpdate);
    }
  }, [users]);

  // Update user bets (airtable) on change to scores
  useEffect(() => {
    loggedInUser && updateUserBets();
  }, [scores]);

  return (
    <>
      <LoginContext.Provider
        value={{
          loggedInUser,
          setShowLoginModal,
          handleAddWallet,
          handleReduceWallet,
          odds,
          scores,
          getBets,
          userBets,
          getUserBets,
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
