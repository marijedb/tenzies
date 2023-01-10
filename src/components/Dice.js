import React from "react";

function Dice(props){
    return(
        <div className="dice-container">
            <h2 className="single-dice">{props.value}</h2>
        </div>
    )
}

export default Dice