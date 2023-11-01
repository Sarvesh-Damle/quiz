import React, { useState } from 'react'
import Profiles from './Profiles'
import { Leaderboard } from './Database';

const Board = () => {

    const [period, setPeriod] = useState(0);

    const handleClick = (e) => {
        setPeriod(e.target.dataset.id);
        console.log(e.target.dataset.id)
        console.log(period)
    }

    return (
        <div className="board">
            <h1 className="text-center font-bold text-3xl m-2">Leaderboard</h1>

            <div className="flex justify-center m-3 p-3">
                <button onClick={handleClick} data-id='7' className='bg-gray-50 rounded-sm border p-4 w-1/6 hover:bg-gray-100 focus:bg-gray-200'>7 Days</button>
                <button onClick={handleClick} data-id='30' className='bg-gray-50 rounded-sm border p-4 w-1/6 hover:bg-gray-100 focus:bg-gray-200'>30 Days</button>
                <button onClick={handleClick} data-id='0' className='bg-gray-50 rounded-sm border p-4 w-1/6 hover:bg-gray-100 focus:bg-gray-200'>All-Time</button>
            </div>

            <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>
        </div>
    )
}

function between(data, period) {
    const today = new Date();
    const previous = new Date(today);

    // Convert 'period' to a number (it should be a string based on your dataset)
    const periodNum = parseInt(period);

    if (!isNaN(periodNum)) {
        if (periodNum !== 0) {
            // Subtract the 'periodNum' days from 'previous' date
            previous.setDate(today.getDate() - periodNum);
        }

        // Filter data based on the date range
        const filteredData = data.filter(val => {
            const userDate = new Date(val.dt);
            return (periodNum === 0) || (previous <= userDate && today >= userDate);
        });

        // Sort the filtered data in descending order by score
        return filteredData.sort((a, b) => b.score - a.score);
    } else {
        // If 'period' is not a valid number, return the original data
        return data;
    }
}




export default Board