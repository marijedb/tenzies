import { useEffect, useState } from 'react';
import './App.css';
import Confetti from 'react-confetti'
import Dice from './components/Dice';

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const [showConfetti, setShowConfetti] = useState(false)
    
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

  return (
    <div className="app">
      <h1>Tenzies</h1>
      <div className='all-dice-container'>
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
      </div>
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
        <button onClick={handleConfetti}>Confetti!!!!</button>
    </div>
  );
}

export default App;
