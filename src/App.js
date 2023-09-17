
import { useSelector } from 'react-redux';
import './App.css';
import MinesweeperGrid from './components/MinesweeperGrid';
import MenuBar from './components/MenuBar';
import GameOverOverlay from './components/GameOverOverlay';
import { useEffect, useState } from 'react';

function App() {
  
  const {isOver: gameIsOver} = useSelector((state) => state.fieldsGrid.gameStatus);
  const [readyForRestart, setReadyForRestart] = useState(false);

  useEffect(() => {
    if(gameIsOver) {
      const timer = setTimeout(() => {
        setReadyForRestart(true);
      }, 5500);
      return () => {clearTimeout(timer)};
    }
  }, [gameIsOver]);

  function restartHandler(){
    // setReadyForRestart(prevReady => !prevReady);
    setReadyForRestart(false);
  }
 
    return (
    <div className="App" >        
      <MenuBar />
      <MinesweeperGrid />
      {readyForRestart && <GameOverOverlay onRestart={restartHandler}/>}
    </div>
  );
}

export default App;
