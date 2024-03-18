import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import MyBets from "./pages/MyBets";
import Scores from "./pages/Scores";
import LoginModal from "./components/LoginModal";
import LoginContext from "./context/LoginContext";

// Sample data from API call
// const sampleOdds = [
//   {
//     id: "4606047aeb27e6856b3ff293ec578e43",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T12:30:00Z",
//     home_team: "Newcastle United",
//     away_team: "West Ham United",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Newcastle United",
//                 price: 1.75,
//               },
//               {
//                 name: "West Ham United",
//                 price: 4.0,
//               },
//               {
//                 name: "Draw",
//                 price: 4.0,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "6619d3ca44afc07cccaee264d4f62977",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T15:00:00Z",
//     home_team: "Bournemouth",
//     away_team: "Everton",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Bournemouth",
//                 price: 2.1,
//               },
//               {
//                 name: "Everton",
//                 price: 3.3,
//               },
//               {
//                 name: "Draw",
//                 price: 3.5,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "2597298743f78005ba7c2b7f9cefd2a4",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T15:00:00Z",
//     home_team: "Chelsea",
//     away_team: "Burnley",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Burnley",
//                 price: 9.0,
//               },
//               {
//                 name: "Chelsea",
//                 price: 1.25,
//               },
//               {
//                 name: "Draw",
//                 price: 5.5,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "d1e3eb5871c7e3b1ac9dabd09d94344f",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T15:00:00Z",
//     home_team: "Nottingham Forest",
//     away_team: "Crystal Palace",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Crystal Palace",
//                 price: 3.2,
//               },
//               {
//                 name: "Nottingham Forest",
//                 price: 2.25,
//               },
//               {
//                 name: "Draw",
//                 price: 3.3,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "efb7bcd1f4959bf80197ec581b077cb2",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T15:00:00Z",
//     home_team: "Sheffield United",
//     away_team: "Fulham",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Fulham",
//                 price: 1.7,
//               },
//               {
//                 name: "Sheffield United",
//                 price: 4.33,
//               },
//               {
//                 name: "Draw",
//                 price: 4.0,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "8a065e80284e1157870534a772c62305",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T15:00:00Z",
//     home_team: "Tottenham Hotspur",
//     away_team: "Luton",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Luton",
//                 price: 9.0,
//               },
//               {
//                 name: "Tottenham Hotspur",
//                 price: 1.22,
//               },
//               {
//                 name: "Draw",
//                 price: 6.5,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "60b84c40ac236905064dae0535ba9c73",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T17:30:00Z",
//     home_team: "Aston Villa",
//     away_team: "Wolverhampton Wanderers",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Aston Villa",
//                 price: 1.57,
//               },
//               {
//                 name: "Wolverhampton Wanderers",
//                 price: 5.0,
//               },
//               {
//                 name: "Draw",
//                 price: 4.2,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "3c3df999f07010248fb7e25e24bc851e",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T20:00:00Z",
//     home_team: "Brentford",
//     away_team: "Manchester United",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Brentford",
//                 price: 3.0,
//               },
//               {
//                 name: "Manchester United",
//                 price: 2.2,
//               },
//               {
//                 name: "Draw",
//                 price: 3.5,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "6cc43229e6d4cecb17a81350fadc348e",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-31T13:00:00Z",
//     home_team: "Liverpool",
//     away_team: "Brighton and Hove Albion",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Brighton and Hove Albion",
//                 price: 7.0,
//               },
//               {
//                 name: "Liverpool",
//                 price: 1.33,
//               },
//               {
//                 name: "Draw",
//                 price: 5.5,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "742a2b03e7bda7de65179b2a3eee8bd2",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-31T15:30:00Z",
//     home_team: "Manchester City",
//     away_team: "Arsenal",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Arsenal",
//                 price: 4.33,
//               },
//               {
//                 name: "Manchester City",
//                 price: 1.75,
//               },
//               {
//                 name: "Draw",
//                 price: 3.75,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "2b45606a19467a04cbe30aabdba5f6d9",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-02T18:30:00Z",
//     home_team: "Newcastle United",
//     away_team: "Everton",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Everton",
//                 price: 4.0,
//               },
//               {
//                 name: "Newcastle United",
//                 price: 1.75,
//               },
//               {
//                 name: "Draw",
//                 price: 3.8,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "5d50cb1b7d2e3290d56d0398e01e60e3",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-02T18:30:00Z",
//     home_team: "Nottingham Forest",
//     away_team: "Fulham",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Fulham",
//                 price: 2.6,
//               },
//               {
//                 name: "Nottingham Forest",
//                 price: 2.62,
//               },
//               {
//                 name: "Draw",
//                 price: 3.3,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "69763436c65e956ddc950c436b64a290",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-02T18:45:00Z",
//     home_team: "Bournemouth",
//     away_team: "Crystal Palace",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Bournemouth",
//                 price: 1.85,
//               },
//               {
//                 name: "Crystal Palace",
//                 price: 3.8,
//               },
//               {
//                 name: "Draw",
//                 price: 3.75,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "2883b9e70f9f90877c85ebb1bceebf82",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-02T18:45:00Z",
//     home_team: "Burnley",
//     away_team: "Wolverhampton Wanderers",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Burnley",
//                 price: 2.7,
//               },
//               {
//                 name: "Wolverhampton Wanderers",
//                 price: 2.5,
//               },
//               {
//                 name: "Draw",
//                 price: 3.4,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "10d617cd5230f91dd2886bc5249d2f63",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-02T19:15:00Z",
//     home_team: "West Ham United",
//     away_team: "Tottenham Hotspur",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Tottenham Hotspur",
//                 price: 2.1,
//               },
//               {
//                 name: "West Ham United",
//                 price: 3.1,
//               },
//               {
//                 name: "Draw",
//                 price: 3.8,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "7801e89270a952704db9fe98f66720b9",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-03T18:30:00Z",
//     home_team: "Arsenal",
//     away_team: "Luton",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Arsenal",
//                 price: 1.14,
//               },
//               {
//                 name: "Luton",
//                 price: 15.0,
//               },
//               {
//                 name: "Draw",
//                 price: 8.0,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "ed20905dccc1b8fd3c7e553e8c2e7dbe",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-03T18:30:00Z",
//     home_team: "Brentford",
//     away_team: "Brighton and Hove Albion",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Brentford",
//                 price: 2.5,
//               },
//               {
//                 name: "Brighton and Hove Albion",
//                 price: 2.5,
//               },
//               {
//                 name: "Draw",
//                 price: 3.6,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "4c51af29ed929e650f9be88ab4ae5d77",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-03T19:15:00Z",
//     home_team: "Manchester City",
//     away_team: "Aston Villa",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Aston Villa",
//                 price: 9.5,
//               },
//               {
//                 name: "Manchester City",
//                 price: 1.25,
//               },
//               {
//                 name: "Draw",
//                 price: 5.5,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "bb4fa8be4734f8faaa37de47c0423b29",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-04T18:30:00Z",
//     home_team: "Liverpool",
//     away_team: "Sheffield United",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Liverpool",
//                 price: 1.08,
//               },
//               {
//                 name: "Sheffield United",
//                 price: 23.0,
//               },
//               {
//                 name: "Draw",
//                 price: 10.0,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "669758585d86adfedda3eed1dbedb47a",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-04T19:15:00Z",
//     home_team: "Chelsea",
//     away_team: "Manchester United",
//     bookmakers: [
//       {
//         key: "paddypower",
//         title: "Paddy Power",
//         last_update: "2024-03-18T17:43:50Z",
//         markets: [
//           {
//             key: "h2h",
//             last_update: "2024-03-18T17:43:50Z",
//             outcomes: [
//               {
//                 name: "Chelsea",
//                 price: 1.95,
//               },
//               {
//                 name: "Manchester United",
//                 price: 3.4,
//               },
//               {
//                 name: "Draw",
//                 price: 3.8,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

// const sampleScores = [
//   {
//     id: "a129f11bf34fb47d466a643a3c9f5ceb",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-16T15:00:11Z",
//     completed: true,
//     home_team: "Burnley",
//     away_team: "Brentford",
//     scores: [
//       {
//         name: "Burnley",
//         score: "2",
//       },
//       {
//         name: "Brentford",
//         score: "1",
//       },
//     ],
//     last_update: "2024-03-17T14:16:07Z",
//   },
//   {
//     id: "31b4def5f8f3dbe9ec1926cc6c687b1c",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-16T15:00:39Z",
//     completed: true,
//     home_team: "Luton",
//     away_team: "Nottingham Forest",
//     scores: [
//       {
//         name: "Luton",
//         score: "1",
//       },
//       {
//         name: "Nottingham Forest",
//         score: "1",
//       },
//     ],
//     last_update: "2024-03-17T14:16:07Z",
//   },
//   {
//     id: "4b4a54c0ea8948a8db5002b77a1f37ef",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-16T17:30:09Z",
//     completed: true,
//     home_team: "Fulham",
//     away_team: "Tottenham Hotspur",
//     scores: [
//       {
//         name: "Fulham",
//         score: "3",
//       },
//       {
//         name: "Tottenham Hotspur",
//         score: "0",
//       },
//     ],
//     last_update: "2024-03-17T14:16:07Z",
//   },
//   {
//     id: "3e78091b6f63ae11ee2eb16ce25756c5",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-17T14:00:32Z",
//     completed: true,
//     home_team: "West Ham United",
//     away_team: "Aston Villa",
//     scores: [
//       {
//         name: "Aston Villa",
//         score: "1",
//       },
//       {
//         name: "West Ham United",
//         score: "1",
//       },
//     ],
//     last_update: "2024-03-17T21:25:43Z",
//   },
//   {
//     id: "4606047aeb27e6856b3ff293ec578e43",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T12:30:00Z",
//     completed: false,
//     home_team: "Newcastle United",
//     away_team: "West Ham United",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "6619d3ca44afc07cccaee264d4f62977",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T15:00:00Z",
//     completed: false,
//     home_team: "Bournemouth",
//     away_team: "Everton",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "2597298743f78005ba7c2b7f9cefd2a4",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T15:00:00Z",
//     completed: false,
//     home_team: "Chelsea",
//     away_team: "Burnley",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "d1e3eb5871c7e3b1ac9dabd09d94344f",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T15:00:00Z",
//     completed: false,
//     home_team: "Nottingham Forest",
//     away_team: "Crystal Palace",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "efb7bcd1f4959bf80197ec581b077cb2",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T15:00:00Z",
//     completed: false,
//     home_team: "Sheffield United",
//     away_team: "Fulham",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "8a065e80284e1157870534a772c62305",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T15:00:00Z",
//     completed: false,
//     home_team: "Tottenham Hotspur",
//     away_team: "Luton",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "60b84c40ac236905064dae0535ba9c73",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T17:30:00Z",
//     completed: false,
//     home_team: "Aston Villa",
//     away_team: "Wolverhampton Wanderers",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "3c3df999f07010248fb7e25e24bc851e",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-30T20:00:00Z",
//     completed: false,
//     home_team: "Brentford",
//     away_team: "Manchester United",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "6cc43229e6d4cecb17a81350fadc348e",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-31T13:00:00Z",
//     completed: false,
//     home_team: "Liverpool",
//     away_team: "Brighton and Hove Albion",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "742a2b03e7bda7de65179b2a3eee8bd2",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-03-31T15:30:00Z",
//     completed: false,
//     home_team: "Manchester City",
//     away_team: "Arsenal",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "2b45606a19467a04cbe30aabdba5f6d9",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-02T18:30:00Z",
//     completed: false,
//     home_team: "Newcastle United",
//     away_team: "Everton",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "5d50cb1b7d2e3290d56d0398e01e60e3",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-02T18:30:00Z",
//     completed: false,
//     home_team: "Nottingham Forest",
//     away_team: "Fulham",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "69763436c65e956ddc950c436b64a290",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-02T18:45:00Z",
//     completed: false,
//     home_team: "Bournemouth",
//     away_team: "Crystal Palace",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "2883b9e70f9f90877c85ebb1bceebf82",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-02T18:45:00Z",
//     completed: false,
//     home_team: "Burnley",
//     away_team: "Wolverhampton Wanderers",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "10d617cd5230f91dd2886bc5249d2f63",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-02T19:15:00Z",
//     completed: false,
//     home_team: "West Ham United",
//     away_team: "Tottenham Hotspur",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "7801e89270a952704db9fe98f66720b9",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-03T18:30:00Z",
//     completed: false,
//     home_team: "Arsenal",
//     away_team: "Luton",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "ed20905dccc1b8fd3c7e553e8c2e7dbe",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-03T18:30:00Z",
//     completed: false,
//     home_team: "Brentford",
//     away_team: "Brighton and Hove Albion",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "4c51af29ed929e650f9be88ab4ae5d77",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-03T19:15:00Z",
//     completed: false,
//     home_team: "Manchester City",
//     away_team: "Aston Villa",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "bb4fa8be4734f8faaa37de47c0423b29",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-04T18:30:00Z",
//     completed: false,
//     home_team: "Liverpool",
//     away_team: "Sheffield United",
//     scores: null,
//     last_update: null,
//   },
//   {
//     id: "669758585d86adfedda3eed1dbedb47a",
//     sport_key: "soccer_epl",
//     sport_title: "EPL",
//     commence_time: "2024-04-04T19:15:00Z",
//     completed: false,
//     home_team: "Chelsea",
//     away_team: "Manchester United",
//     scores: null,
//     last_update: null,
//   },
// ];

function App() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [odds, setOdds] = useState([]);
  const [scores, setScores] = useState([]);
  const [bets, setBets] = useState([]);
  const [userBets, setUserBets] = useState([]);

  // Get odds (works)
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
    } catch (error) {
      console.log(error);
    }
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
    } catch (error) {
      console.log(error.message);
    }
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
    } catch (error) {
      console.log(error.message);
    }
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

  const updateUserBets = async () => {
    // const completedMatches = sampleScores.filter((score) => score.completed);
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
    } catch (error) {
      console.log(error.message);
    }
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
    } catch (error) {
      console.log(error.message);
    }
  };

  // Get odds on mount
  useEffect(() => {
    const oddsController = new AbortController();
    getOdds(oddsController.signal);

    return () => oddsController.abort();
  }, []);

  // Get scores on mount
  useEffect(() => {
    const scoresController = new AbortController();
    getScores(scoresController.signal);

    return () => {
      return scoresController.abort();
    };
  }, []);

  // Get all users and bets on load
  useEffect(() => {
    getUsers();
    getBets();
  }, []);

  // Filter for user bets based on logged in user
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
