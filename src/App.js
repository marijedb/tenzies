import './App.css';
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react';

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
    <div className="App">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
        <button onClick={handleConfetti}>Confetti!!!!</button>
    </div>
  );
}

export default App;
