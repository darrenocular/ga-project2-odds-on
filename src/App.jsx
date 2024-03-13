import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import MyBets from "./pages/MyBets";
import LiveScores from "./pages/LiveScores";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/livescores" element={<LiveScores />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/bets" element={<MyBets />} />
        <Route path="*" element={<Index />} />
      </Routes>
    </>
  );
}

export default App;
