import './App.css';
import HangmanGame from './components/HangmanGame.jsx';
import { GameProvider } from './context/GameContext.jsx';

/**
 * Main App Component
 */
function App() {
  return (
    <GameProvider>
      <div className="App">
        <HangmanGame />
      </div>
    </GameProvider>
  );
}

export default App;
