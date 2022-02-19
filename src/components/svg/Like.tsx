import React, { useState } from "react";

const Like = () => {
    const [like, setLike] = useState("none");

    const Switch = () => {
        if (like === "none") {
            setLike("red")
            // set delay
        }
        else {
            setLike("none")
        }
    }

    return (
        <button onClick={Switch}>
            <svg width="25" height="22" viewBox="0 0 25 22" fill={like} xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75958 2.77216C1.39671 5.13503 1.39671 8.96602 3.75958 11.3289L12.9244 20.4937L12.9874 20.4307L13.0505 20.4938L22.2153 11.329C24.5782 8.96609 24.5782 5.13511 22.2153 2.77223C19.8525 0.409358 16.0215 0.40936 13.6586 2.77224L13.341 3.08978C13.1458 3.28505 12.8292 3.28505 12.6339 3.08978L12.3163 2.77216C9.95344 0.409281 6.12246 0.409282 3.75958 2.77216Z" stroke="#888888" strokeWidth="2" />
            </svg>
        </button>
    )
};

export default Like;
