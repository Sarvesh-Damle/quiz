import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";
import Team from "./components/Pages/Team";
import Signin from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import Error from "./components/Pages/Error";
import Ranks from "./components/Pages/Leaderboard/Ranks";
import Navbar from "./components/Pages/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer autoClose={1000}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sa" element={<Error/>} />
          <Route path="/leaderboard" element={<Ranks />} />
        </Routes>
    </Router>
  );
}

export default App;
