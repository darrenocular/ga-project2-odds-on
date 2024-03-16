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
  const users = useRef([]);
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
        users.current = data.records;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogin = (username, password) => {
    const userMatchOnUsername = users.current.find(
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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <LoginContext.Provider value={{ loggedInUser, setShowLoginModal }}>
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
          <Route path="/:username" element={<Profile />} />
          <Route path="/:username/bets" element={<MyBets />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </LoginContext.Provider>
    </>
  );
}

export default App;
