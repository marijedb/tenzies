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
    
  const [diceArray, setDiceArray] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)
  
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
  }
  return (
    <div className="app">
      <h1 className='app-title'>Tenzies</h1>
      <p className='app-description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
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
