import { useGame } from '../hooks/useGame.js';
import '../styles/WordDisplay.css';

/**
 * Word Display Component - Shows the word with guessed letters revealed
 */
const WordDisplay = () => {
  const { state } = useGame();
  
  const renderLetters = () => {
    return state.currentWord.split('').map((letter, index) => {
      const isRevealed = state.guessedLetters.includes(letter);
      const letterClass = `word-letter ${isRevealed ? 'revealed' : 'hidden'} ${state.shakingLetters ? 'shake' : ''}`;
      
      return (
        <span key={index} className={letterClass}>
          {isRevealed ? letter : '_'}
        </span>
      );
    });
  };

  return (
    <div className="word-display">
      <div className="word-container">
        {renderLetters()}
      </div>
      
      <div className="word-info">
        <span className="word-length">
          {state.currentWord.length} letras
        </span>
        <span className="letters-found">
          {state.guessedLetters.length} encontradas
        </span>
      </div>
    </div>
  );
};

export default WordDisplay;
