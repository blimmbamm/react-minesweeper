
import { useSelector } from 'react-redux';
import './App.css';
import MinesweeperGrid from './components/MinesweeperGrid';
import MenuBar from './components/MenuBar';
import GameOverOverlay from './components/GameOverOverlay';

function App() {
  
  const {isOver: gameIsOver} = useSelector((state) => state.fieldsGrid.gameStatus);
 
    return (
    <div className="App" >        
      <MenuBar />
      <MinesweeperGrid />
      {gameIsOver && <GameOverOverlay />}
      {/* {gameIsOver && !gameIsWon && <div>Game over, you lose...</div>}
      {gameIsOver && gameIsWon && <div>Game over, you win!</div>} */}
    </div>
  );
}

export default App;
