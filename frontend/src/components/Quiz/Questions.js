import { useContext, useState, useEffect } from "react";
import { GamestateContext } from "./Quiz_Helpers/Contexts";
import { ResponseContext } from "./Quiz_Helpers/Contexts";
import useAxios from "../../hooks/useAxios";
import { useSelector } from "react-redux";
import { Loader, Placeholder } from "rsuite";
import {decode} from 'html-entities';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

function Questions() {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
  } = useSelector((state) => state);

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }
  const { response, loading } = useAxios({ url: apiUrl });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  const { setResponse } = useContext(ResponseContext);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[currentQuestion];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
      setResponse(response);
    }
  }, [response, currentQuestion, setResponse]);

  const { score, setScore, setGamestate } = useContext(GamestateContext);

  if (loading) {
    return (
      <div>
        <Placeholder.Paragraph rows={8} />
        <Loader center content="loading" />
      </div>
    );
  }
  const handleClickAnswer = (selectedAnswer) => {
  if (!answeredCorrectly) {
    // Prevent further interaction after answering
    setAnsweredCorrectly(true);

    if (response.results[currentQuestion].correct_answer === selectedAnswer) {
      setScore(score + 1);
    } 
  }
};

  const nextQuestion = () => {
    setCurrentQuestion(() => currentQuestion + 1);
    setAnsweredCorrectly(false);
  };
  const finishQuiz = () => {
    setGamestate("score");
  };
  return (
    <div className="w-1/2 h-1/2 bg-blue-300 rounded-lg flex flex-col justify-center items-center m-3 p-2">
      <h2 className="w-3/4 text-center font-bold text-2xl">
        <span>{currentQuestion + 1}. </span>
        {decode(response.results[currentQuestion].question)}
      </h2>
      <div className="mt-5 flex flex-col w-full justify-center items-center">
        {options.map((data, id) => (
          <button
            onClick={() => handleClickAnswer(data)}
            key={id}
            className={`flex flex-col justify-center items-center w-1/2 h-12 m-2 rounded-lg text-center text-lg text-gray-900 shadow-sm bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2
            ${answeredCorrectly ? (response.results[currentQuestion].correct_answer === data ? "bg-green-400" : "bg-white") : ""}`}
            disabled={answeredCorrectly}
          >
            {decode(data)}
          </button>
        ))}
      </div>
      <div className="w-3/4 text-center font-semibold text-2xl m-3">
        Score: {score} / {response.results.length}
      </div>
      <div id="next">
        {currentQuestion === response.results.length - 1 ? (
          <button onClick={finishQuiz} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">Finish Quiz</button>
        ) : (
          <button onClick={nextQuestion} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">Next Question <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg></button>
        )}
      </div>
    </div>
  );
}
export default Questions;
