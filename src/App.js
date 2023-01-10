import { useEffect, useState } from 'react';
import './App.css';
import Confetti from 'react-confetti'
import Dice from './components/Dice';
import { nanoid } from 'nanoid';

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const [showConfetti, setShowConfetti] = useState(false)
    
  const [diceArray, setDiceArray] = useState(allNewDice())

  function handleConfetti(){
    setShowConfetti(prevShow => !prevShow)
  }
  
  useEffect(()=> {
    function handleWindowSize(){
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleWindowSize)

    return _ => {
      window.removeEventListener('resize', handleWindowSize)
    }   
  })

  const diceElements = diceArray.map((dice)=> {
    return <Dice value={dice.value} key={dice.id} isHeld={dice.isHeld} />
  })

  function allNewDice(){
    let newDiceArray = []
    for(let i = 0; i < 10 ; i++){
      newDiceArray.push({ 
        value: Math.floor(Math.random() * 6) + 1, 
        isHeld: false,
        id: nanoid()
      })
  }
  return newDiceArray
}

  function getNewDice(){
    setDiceArray(allNewDice())
  }

  return (
    <div className="app">
      <h1 className='app-title'>Tenzies</h1>
      <p className='app-description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='all-dice-container'>
        {diceElements}
      </div>
      <button className='roll-btn' onClick={getNewDice}>Roll</button>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
        <button onClick={handleConfetti}>Confetti!!!!</button>
    </div>
  );
}

export default App;
