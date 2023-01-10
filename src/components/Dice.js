import React from "react";

function Dice(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
    }
    return(
        <div className="dice-container" style={styles}>
            <h2 className="single-dice">{props.value}</h2>
        </div>
    )
}

export default Dice