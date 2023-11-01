import React from "react";
import { useContext } from "react";
import { GamestateContext, ResponseContext } from "./Quiz_Helpers/Contexts";
// import { questions } from "./Quiz_Helpers/question";

const Score = (props) => {
  const { score, setScore, username, setUsername, setGamestate } = useContext(GamestateContext);
  const { response } = useContext(ResponseContext);
  if (username === "") {
    setUsername("Player")
  }
  const restartQuiz = () => {
    setScore(0)
    setGamestate("menu")
    setUsername("")
  }
  return (
    <div className="w-1/2 h-auto bg-blue-300 rounded-lg flex flex-col justify-center items-center m-3 p-2">
      <h1 className="text-center font-bold text-2xl m-2">Quiz Finished!!</h1>
      <h1 className="text-center font-bold text-2xl m-4">{username}'s Score : {score} / {response.results.length}</h1>
      <button onClick={restartQuiz} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">Restart Quiz</button>
    </div>
  );
};

export default Score;
