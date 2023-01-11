import React from "react";

function Score(props){
    return(
        <div className="score">
            <div>
                <p>Current Score:</p>
                <div className="score--board">
                    <p>{props.currentScore} {props.currentScore === 1 ? "Roll" : "Rolls"}</p>
                </div>
            </div>

            <div>
                <p>High Score:</p>
                <div className="score--board">
                    <p>{props.highScore} Rolls</p>
                </div>
            </div>
        </div>
    )
}

export default Score;