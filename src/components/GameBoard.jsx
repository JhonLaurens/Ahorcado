import { useEffect } from 'react';
import { useGame } from '../hooks/useGame.js';
import '../styles/GameBoard.css';
import { GAME_STATES } from '../utils/constants.js';
import HangmanDrawing from './HangmanDrawing.jsx';
import Timer from './Timer.jsx';
import WordDisplay from './WordDisplay.jsx';
import WrongGuesses from './WrongGuesses.jsx';

/**
 * Main Game Board Component
 */
const GameBoard = () => {
  const { state, guessLetter, pauseGame, resumeGame } = useGame();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Only handle letter keys during active gameplay
      if (state.gameState !== GAME_STATES.PLAYING) return;
      
      const key = event.key.toLowerCase();
      
      // Check if it's a letter (a-z)
      if (key.length === 1 && key >= 'a' && key <= 'z') {
        event.preventDefault();
        guessLetter(key);
      }
      
      // Handle pause/resume with space or ESC
      if (key === ' ' || key === 'escape') {
        event.preventDefault();
        if (state.gameState === GAME_STATES.PLAYING) {
          pauseGame();
        } else if (state.gameState === GAME_STATES.PAUSED) {
          resumeGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [state.gameState, guessLetter, pauseGame, resumeGame]);

  const renderGameStatus = () => {
    if (state.gameState === GAME_STATES.PAUSED) {
      return (
        <div className="game-status paused">
          <h2>⏸️ PAUSA</h2>
          <p>Presiona ESPACIO o ESC para continuar</p>
        </div>
      );
    }
    
    if (state.gameState === GAME_STATES.WON) {
      return (
        <div className="game-status won">
          <h2>🎉 ¡GANASTE!</h2>
          <p>Puntuación: {state.currentScore} pts</p>
        </div>
      );
    }
    
    if (state.gameState === GAME_STATES.LOST) {
      return (
        <div className="game-status lost">
          <h2>💀 PERDISTE</h2>
          <p>La palabra era: <strong>{state.currentWord}</strong></p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="game-board">
      <div className="game-header">
        <div className="game-info">
          <Timer />
          <div className="score-display">
            <span className="score-label">Puntuación:</span>
            <span className="score-value">{state.currentScore}</span>
          </div>
        </div>
        
        <div className="game-controls">
          <button 
            className="pause-button"
            onClick={state.gameState === GAME_STATES.PLAYING ? pauseGame : resumeGame}
            disabled={state.gameState === GAME_STATES.WON || state.gameState === GAME_STATES.LOST}
          >
            {state.gameState === GAME_STATES.PLAYING ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>

      {renderGameStatus()}

      <div className="game-content">
        <div className="game-left">
          <HangmanDrawing wrongCount={state.wrongGuesses.length} />
          <WrongGuesses />
        </div>
        
        <div className="game-center">
          <WordDisplay />
          
          <div className="game-hints">
            <p className="hint-text">
              💡 Usa tu teclado para adivinar las letras
            </p>
            <p className="hint-text">
              ⏱️ Cada error resta 8 segundos
            </p>
          </div>
        </div>
      </div>

      <div className="alphabet-display">
        {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(letter => {
          const isGuessed = state.guessedLetters.includes(letter);
          const isWrong = state.wrongGuesses.includes(letter);
          const isShaking = state.shakingLetters && 
                          !isGuessed && 
                          !isWrong && 
                          state.gameState === GAME_STATES.PLAYING;
          
          return (
            <span
              key={letter}
              className={`alphabet-letter ${isGuessed ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${isShaking ? 'shake' : ''}`}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
