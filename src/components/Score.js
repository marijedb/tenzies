import React from "react";

function Score(){
    return(
        <div className="score">
            <div>
                <p>Current Score:</p>
                <div className="score--board">
                    <p>1 Roll</p>
                </div>
            </div>

            <div>
                <p>High Score:</p>
                <div className="score--board">
                    <p>12 Rolls!</p>
                </div>
            </div>
        </div>
    )
}

export default Score;