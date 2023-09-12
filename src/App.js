
import './App.css';
import MinesweeperGrid from './components/MinesweeperGrid';

function App() {

  // const canvasRef = useRef();

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   context.fillStyle = 'red';
  //   context.fillRect(10, 10, 80, 80);

  // }, []);



 

  return (
    <div className="App">
      {/* <canvas ref={canvasRef} id="myCanvas" width={100} height={100} style={{border: "1px solid #000000"}}></canvas> */}
      <MinesweeperGrid />
    </div>
  );
}

export default App;
