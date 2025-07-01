import { useGame } from '../hooks/useGame.js';
import '../styles/HangmanGame.css';
import { GAME_STATES } from '../utils/constants.js';
import GameBoard from './GameBoard.jsx';
import GameModal from './GameModal.jsx';
import Leaderboard from './Leaderboard.jsx';
import MainMenu from './MainMenu.jsx';

/**
 * Main Hangman Game Component
 */
const HangmanGame = () => {
  const { state } = useGame();

  const renderGameContent = () => {
    switch (state.gameState) {
      case GAME_STATES.MENU:
        return <MainMenu />;
      case GAME_STATES.PLAYING:
      case GAME_STATES.PAUSED:
      case GAME_STATES.WON:
      case GAME_STATES.LOST:
        return <GameBoard />;
      default:
        return <MainMenu />;
    }
  };

  return (
    <div className="hangman-game">
      <div className="game-container">
        <div className="game-area">
          {renderGameContent()}
        </div>
        
        <div className="sidebar">
          <Leaderboard />
        </div>
      </div>
      
      {state.showModal && <GameModal />}
    </div>
  );
};

export default HangmanGame;
