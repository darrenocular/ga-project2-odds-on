import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import OddsDisplay from "./components/OddsDisplay";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import MyBets from "./pages/MyBets";

function App() {
  return (
    <>
      <NavBar />
      <OddsDisplay />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/bets" element={<MyBets />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
