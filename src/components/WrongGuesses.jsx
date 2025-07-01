import { useGame } from '../hooks/useGame.js';
import '../styles/WrongGuesses.css';

/**
 * Wrong Guesses Component - Shows incorrect letter attempts
 */
const WrongGuesses = () => {
  const { state } = useGame();
  
  const renderWrongLetters = () => {
    return state.wrongGuesses.map((letter, index) => (
      <span 
        key={letter}
        className={`wrong-letter fall-animation`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {letter}
      </span>
    ));
  };

  const getRemainingAttempts = () => {
    return 6 - state.wrongGuesses.length;
  };

  return (
    <div className="wrong-guesses">
      <div className="wrong-guesses-header">
        <h3>❌ Errores ({state.wrongGuesses.length}/6)</h3>
        <span className="remaining-attempts">
          {getRemainingAttempts()} intentos restantes
        </span>
      </div>
      
      <div className="wrong-letters-container">
        {state.wrongGuesses.length > 0 ? (
          renderWrongLetters()
        ) : (
          <span className="no-errors">¡Sin errores aún! 😊</span>
        )}
      </div>
      
      <div className="error-visual">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={`error-dot ${index < state.wrongGuesses.length ? 'filled' : 'empty'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WrongGuesses;
