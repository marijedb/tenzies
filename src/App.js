import { useEffect, useState } from 'react';
import './App.css';
import Confetti from 'react-confetti'
import Dice from './components/Dice';
import Score from './components/Score';
import { nanoid } from 'nanoid';

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
    
  const [diceArray, setDiceArray] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)

  const [highScore, setHighScore] = useState(() => JSON.parse(localStorage.getItem('highScore')) || 0)
  const [currentScore, setCurrentScore] = useState(1)
  
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

  useEffect(() => {
    const allHeld = diceArray.every(dice => dice.isHeld)
    const firstValue = diceArray[0].value
    const allSameValue = diceArray.every(dice => dice.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
    }
  }, [diceArray])

  useEffect(()=> {
    if(tenzies) {
      setHighScore(prevHighScore => {
        if(currentScore < prevHighScore || prevHighScore === 0){
          localStorage.setItem("highScore", JSON.stringify(currentScore))
          return currentScore
        } else {
          localStorage.setItem("highScore", JSON.stringify(prevHighScore))
          return prevHighScore
        }
      })
    }
  },[tenzies, currentScore])

  const diceElements = diceArray.map((dice)=> {
    return <Dice value={dice.value} key={dice.id} isHeld={dice.isHeld} holdDice={() => holdDice(dice.id)} />
  })

  function generateNewDice(){
    return { 
      value: Math.floor(Math.random() * 6) + 1, 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    let newDiceArray = []
    for(let i = 0; i < 10 ; i++){
      newDiceArray.push(generateNewDice())
  }
  return newDiceArray
}

  function getNewDice(){
    setDiceArray(oldDiceArray => oldDiceArray.map(dice => {
      return dice.isHeld ? dice : generateNewDice()
    }))
    setCurrentScore(prevScore => prevScore + 1)
  }

  function holdDice(id){
   setDiceArray(oldDiceArray => oldDiceArray.map(dice => {
    return dice.id === id ? {
        ...dice, 
        isHeld: !dice.isHeld
      } : 
      dice
   }))
  }

  function startNewGame(){
    setDiceArray(allNewDice())
    setTenzies(false)
    setCurrentScore(1)
  }


  return (
    <div className="app">
      <h1 className='app-title'>Tenzies</h1>
      <p className='app-description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <Score currentScore={currentScore} highScore={highScore}/>
      <div className='all-dice-container'>
        {diceElements}
      </div>
      {tenzies ? 
        <button className='roll-btn' onClick={startNewGame}>New Game</button> : 
        <button className='roll-btn' onClick={getNewDice}>Roll</button>
      }
      {(tenzies) && <Confetti width={windowSize.width} height={windowSize.height} />}
        
    </div>
  );
}

export default App;
