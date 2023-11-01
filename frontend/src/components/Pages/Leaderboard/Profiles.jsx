import React from 'react';

const Profiles = ( props ) => {
    const {Leaderboard} = props;
    return (
        <div className='mt-3 w-full'>
            {Item(Leaderboard)}
        </div>
    )
}

const Item = (data) => {
    return (
        <>
            {
                data.map((value, index) => (
                    <div className="w-full flex justify-center gap-5" key={index}>
                        <div className="flex items-center justify-start gap-3">
                            <img src={value.img} alt="Avatar" className="w-1/6 rounded-full" />

                            <div className="p-2">
                                <h3 className='name text-dark'>{value.name}</h3>
                                <span>{value.location}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <span>{value.score}</span>
                        </div>
                    </div>
                )
                )
            }
        </>
    )
}

export default Profiles