import React, { useState, useEffect } from "react";
import styles from "./ScoresDisplay.module.css";
import ScoresItem from "./ScoresItem";

const sampleScores = [
  {
    id: "d756a505b0d891226dc732c7ddd7ae35",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-13T19:30:04Z",
    completed: true,
    home_team: "Bournemouth",
    away_team: "Luton",
    scores: [
      {
        name: "Luton",
        score: "3",
      },
      {
        name: "Bournemouth",
        score: "4",
      },
    ],
    last_update: "2024-03-14T02:56:29Z",
  },
  {
    id: "a129f11bf34fb47d466a643a3c9f5ceb",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-16T15:00:00Z",
    completed: false,
    home_team: "Burnley",
    away_team: "Brentford",
    scores: null,
    last_update: null,
  },
  {
    id: "31b4def5f8f3dbe9ec1926cc6c687b1c",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-16T15:00:00Z",
    completed: false,
    home_team: "Luton",
    away_team: "Nottingham Forest",
    scores: null,
    last_update: null,
  },
  {
    id: "4b4a54c0ea8948a8db5002b77a1f37ef",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-16T17:30:00Z",
    completed: false,
    home_team: "Fulham",
    away_team: "Tottenham Hotspur",
    scores: null,
    last_update: null,
  },
  {
    id: "3e78091b6f63ae11ee2eb16ce25756c5",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-17T14:00:00Z",
    completed: false,
    home_team: "West Ham United",
    away_team: "Aston Villa",
    scores: null,
    last_update: null,
  },
  {
    id: "4606047aeb27e6856b3ff293ec578e43",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T12:30:00Z",
    completed: false,
    home_team: "Newcastle United",
    away_team: "West Ham United",
    scores: null,
    last_update: null,
  },
  {
    id: "6619d3ca44afc07cccaee264d4f62977",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T15:00:00Z",
    completed: false,
    home_team: "Bournemouth",
    away_team: "Everton",
    scores: null,
    last_update: null,
  },
  {
    id: "2597298743f78005ba7c2b7f9cefd2a4",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T15:00:00Z",
    completed: false,
    home_team: "Chelsea",
    away_team: "Burnley",
    scores: null,
    last_update: null,
  },
  {
    id: "d1e3eb5871c7e3b1ac9dabd09d94344f",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T15:00:00Z",
    completed: false,
    home_team: "Nottingham Forest",
    away_team: "Crystal Palace",
    scores: null,
    last_update: null,
  },
  {
    id: "efb7bcd1f4959bf80197ec581b077cb2",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T15:00:00Z",
    completed: false,
    home_team: "Sheffield United",
    away_team: "Fulham",
    scores: null,
    last_update: null,
  },
  {
    id: "8a065e80284e1157870534a772c62305",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T15:00:00Z",
    completed: false,
    home_team: "Tottenham Hotspur",
    away_team: "Luton",
    scores: null,
    last_update: null,
  },
  {
    id: "60b84c40ac236905064dae0535ba9c73",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T17:30:00Z",
    completed: false,
    home_team: "Aston Villa",
    away_team: "Wolverhampton Wanderers",
    scores: null,
    last_update: null,
  },
  {
    id: "3c3df999f07010248fb7e25e24bc851e",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T20:00:00Z",
    completed: false,
    home_team: "Brentford",
    away_team: "Manchester United",
    scores: null,
    last_update: null,
  },
  {
    id: "6cc43229e6d4cecb17a81350fadc348e",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-31T13:00:00Z",
    completed: false,
    home_team: "Liverpool",
    away_team: "Brighton and Hove Albion",
    scores: null,
    last_update: null,
  },
  {
    id: "742a2b03e7bda7de65179b2a3eee8bd2",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-31T15:30:00Z",
    completed: false,
    home_team: "Manchester City",
    away_team: "Arsenal",
    scores: null,
    last_update: null,
  },
];

const ScoresDisplay = () => {
  const [scores, setScores] = useState([]);

  // const getScores = async () => {
  //   try {
  //     const res = await fetch(
  //       import.meta.env.VITE_SERVER +
  //         "/scores/?daysFrom=3&apiKey=" +
  //         import.meta.env.VITE_API_KEY
  //     );

  //     if (res.ok) {
  //       const data = await res.json();
  //       setScores(data);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   const scoresController = new AbortController();
  //   getScores(scoresController.signal);

  //   return () => {
  //     return scoresController.abort();
  //   };
  // }, [scores]);

  // useEffect(() => {
  //   getScores();
  // }, []);

  return (
    <>
      <div className={styles["scores-display"]}>
        <p className={styles["league-header"]}>English Premier League (EPL)</p>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Match</th>
              <th>Match Date</th>
              <th>Status</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {sampleScores.map((game, idx) => (
              <ScoresItem
                className={idx % 2 === 0 ? "bg-lt-orange" : "bg-lt-yellow"}
                game={game}
                key={idx}
              ></ScoresItem>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ScoresDisplay;
