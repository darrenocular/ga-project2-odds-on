import React, { useState, useEffect } from "react";
import OddsItem from "./OddsItem";
import styles from "./OddsDisplay.module.css";

// Sample data from API call

const sampleOdds = [
  {
    id: "d756a505b0d891226dc732c7ddd7ae35",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-13T19:30:00Z",
    home_team: "Bournemouth",
    away_team: "Luton",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Bournemouth",
                price: 1.44,
              },
              {
                name: "Luton",
                price: 5.5,
              },
              {
                name: "Draw",
                price: 4.75,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a129f11bf34fb47d466a643a3c9f5ceb",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-16T15:00:00Z",
    home_team: "Burnley",
    away_team: "Brentford",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Brentford",
                price: 2.1,
              },
              {
                name: "Burnley",
                price: 3.3,
              },
              {
                name: "Draw",
                price: 3.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "31b4def5f8f3dbe9ec1926cc6c687b1c",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-16T15:00:00Z",
    home_team: "Luton",
    away_team: "Nottingham Forest",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Luton",
                price: 2.7,
              },
              {
                name: "Nottingham Forest",
                price: 2.5,
              },
              {
                name: "Draw",
                price: 3.4,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "4b4a54c0ea8948a8db5002b77a1f37ef",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-16T17:30:00Z",
    home_team: "Fulham",
    away_team: "Tottenham Hotspur",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Fulham",
                price: 3.25,
              },
              {
                name: "Tottenham Hotspur",
                price: 2.0,
              },
              {
                name: "Draw",
                price: 3.8,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3e78091b6f63ae11ee2eb16ce25756c5",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-17T14:00:00Z",
    home_team: "West Ham United",
    away_team: "Aston Villa",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Aston Villa",
                price: 2.38,
              },
              {
                name: "West Ham United",
                price: 2.75,
              },
              {
                name: "Draw",
                price: 3.6,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "4606047aeb27e6856b3ff293ec578e43",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T12:30:00Z",
    home_team: "Newcastle United",
    away_team: "West Ham United",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Newcastle United",
                price: 1.67,
              },
              {
                name: "West Ham United",
                price: 4.5,
              },
              {
                name: "Draw",
                price: 4.2,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "6619d3ca44afc07cccaee264d4f62977",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T15:00:00Z",
    home_team: "Bournemouth",
    away_team: "Everton",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Bournemouth",
                price: 2.0,
              },
              {
                name: "Everton",
                price: 3.5,
              },
              {
                name: "Draw",
                price: 3.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2597298743f78005ba7c2b7f9cefd2a4",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T15:00:00Z",
    home_team: "Chelsea",
    away_team: "Burnley",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Burnley",
                price: 8.5,
              },
              {
                name: "Chelsea",
                price: 1.29,
              },
              {
                name: "Draw",
                price: 5.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "d1e3eb5871c7e3b1ac9dabd09d94344f",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T15:00:00Z",
    home_team: "Nottingham Forest",
    away_team: "Crystal Palace",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Crystal Palace",
                price: 2.9,
              },
              {
                name: "Nottingham Forest",
                price: 2.3,
              },
              {
                name: "Draw",
                price: 3.3,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "efb7bcd1f4959bf80197ec581b077cb2",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T15:00:00Z",
    home_team: "Sheffield United",
    away_team: "Fulham",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Fulham",
                price: 1.85,
              },
              {
                name: "Sheffield United",
                price: 3.8,
              },
              {
                name: "Draw",
                price: 3.8,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "8a065e80284e1157870534a772c62305",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T15:00:00Z",
    home_team: "Tottenham Hotspur",
    away_team: "Luton",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Luton",
                price: 9.0,
              },
              {
                name: "Tottenham Hotspur",
                price: 1.25,
              },
              {
                name: "Draw",
                price: 6.0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "60b84c40ac236905064dae0535ba9c73",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T17:30:00Z",
    home_team: "Aston Villa",
    away_team: "Wolverhampton Wanderers",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Aston Villa",
                price: 1.62,
              },
              {
                name: "Wolverhampton Wanderers",
                price: 4.75,
              },
              {
                name: "Draw",
                price: 4.0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3c3df999f07010248fb7e25e24bc851e",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-30T20:00:00Z",
    home_team: "Brentford",
    away_team: "Manchester United",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Brentford",
                price: 2.7,
              },
              {
                name: "Manchester United",
                price: 2.5,
              },
              {
                name: "Draw",
                price: 3.4,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "6cc43229e6d4cecb17a81350fadc348e",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-31T13:00:00Z",
    home_team: "Liverpool",
    away_team: "Brighton and Hove Albion",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Brighton and Hove Albion",
                price: 6.5,
              },
              {
                name: "Liverpool",
                price: 1.36,
              },
              {
                name: "Draw",
                price: 5.0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "742a2b03e7bda7de65179b2a3eee8bd2",
    sport_key: "soccer_epl",
    sport_title: "EPL",
    commence_time: "2024-03-31T15:30:00Z",
    home_team: "Manchester City",
    away_team: "Arsenal",
    bookmakers: [
      {
        key: "paddypower",
        title: "Paddy Power",
        last_update: "2024-03-13T15:29:29Z",
        markets: [
          {
            key: "h2h",
            last_update: "2024-03-13T15:29:29Z",
            outcomes: [
              {
                name: "Arsenal",
                price: 3.75,
              },
              {
                name: "Manchester City",
                price: 1.8,
              },
              {
                name: "Draw",
                price: 4.0,
              },
            ],
          },
        ],
      },
    ],
  },
];

const OddsDisplay = () => {
  const [odds, setOdds] = useState([]);

  // Get odds (works)
  //   const getOdds = async (signal) => {
  //     try {
  //       const res = await fetch(
  //         "https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=257cd4535f1bde886a7e14b2102f90b7&bookmakers=paddypower&markets=h2h",
  //         { signal }
  //       );

  //       if (res.ok) {
  //         const data = await res.json();
  //         setOdds(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  // Get odds on mount
  //   useEffect(() => {
  //     const oddsController = new AbortController();
  //     getOdds(oddsController.signal);

  //     return () => oddsController.abort();
  //   }, [odds]);

  //   useEffect(() => {
  //     getOdds();
  //   }, []);

  return (
    <div className={styles["odds-display"]}>
      <p className={styles["league-header"]}>English Premier League (EPL)</p>
      {sampleOdds.map((game, idx) => (
        <OddsItem
          className={idx % 2 === 0 ? "bg-lt-orange" : "bg-lt-yellow"}
          key={idx}
          game={game}
        ></OddsItem>
      ))}
    </div>
  );
};

export default OddsDisplay;
