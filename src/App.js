
import { useSelector } from 'react-redux';
import './App.css';
import MinesweeperGrid from './components/MinesweeperGrid';

function App() {

 
  const numberOfFlags = useSelector(state => state.fieldsGrid.numberOfFlags);
  const {isOver: gameIsOver, isWon: gameIsWon} = useSelector((state) => state.fieldsGrid.gameStatus);

 
    return (
    <div className="App" style={{resize: "none"}}>  
    
      <MinesweeperGrid />
      {!gameIsOver && <div>Number of flags used: {numberOfFlags}</div>}
      {gameIsOver && !gameIsWon && <div>Game over, you lose...</div>}
      {gameIsOver && gameIsWon && <div>Game over, you win!</div>}
    </div>
  );
}

export default App;
