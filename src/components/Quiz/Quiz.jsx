import React from 'react';
import Menu from './Menu';
import { useState } from 'react';
import Questions from './Questions';
import {GamestateContext} from "./Quiz_Helpers/Contexts";
import Score from './Score';

// 'menu', 'questions', 'score'
const Quiz = () => {
    const [gamestate, setGamestate] = useState("menu");
    const [username, setUsername] = useState("");
    const [score, setScore] = useState(0)
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center font-sans">
            <GamestateContext.Provider value={{gamestate, setGamestate, username, setUsername, score, setScore}}>
                {gamestate === "menu" ? <Menu /> : null}
                {gamestate === "questions" ? <Questions /> : null}
                {gamestate === "score" ? <Score /> : null}
            </GamestateContext.Provider>
        </div>
    );
}

export default Quiz