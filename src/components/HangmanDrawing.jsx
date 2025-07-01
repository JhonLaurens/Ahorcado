import PropTypes from 'prop-types';
import '../styles/HangmanDrawing.css';

/**
 * Hangman Drawing Component - ASCII art hangman that builds with wrong guesses
 */
const HangmanDrawing = ({ wrongCount }) => {
  const getVisibleParts = () => {
    const progressiveParts = [
      '  ║  │',     // 1 wrong: pole
      '  ║  😵',     // 2 wrong: head
      '  ║  │',     // 3 wrong: body
      '  ║ /│',     // 4 wrong: left arm
      '  ║ /│\\',    // 5 wrong: right arm
      '  ║ / \\',    // 6 wrong: legs
    ];

    const parts = ['  ╔══╗'];
    
    // Add progressive parts based on wrong count
    for (let i = 0; i < Math.min(wrongCount, progressiveParts.length); i++) {
      if (i === 2) {
        // Skip the simple body line if we're adding arms
        continue;
      }
      if (i === 3 && wrongCount >= 5) {
        // Replace left arm with both arms
        parts.push('  ║ /│\\');
        continue;
      }
      if (i === 4) {
        // Skip if we already added both arms
        continue;
      }
      parts.push(progressiveParts[i]);
    }
    
    // Always add the base
    parts.push('══╩══');
    
    return parts;
  };

  const getHangmanClass = () => {
    if (wrongCount >= 6) return 'hangman-drawing complete shake';
    if (wrongCount >= 4) return 'hangman-drawing danger';
    if (wrongCount >= 2) return 'hangman-drawing warning';
    return 'hangman-drawing normal';
  };

  return (
    <div className={getHangmanClass()}>
      <div className="hangman-title">
        🎯 Ahorcado ({wrongCount}/6)
      </div>
      
      <div className="hangman-art">
        {getVisibleParts().map((part, index) => (
          <div 
            key={`hangman-part-${part}-${index}`} 
            className={`hangman-line ${wrongCount >= 6 ? 'final' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {part}
          </div>
        ))}
      </div>
      
      {wrongCount === 0 && (
        <div className="hangman-hint">
          ¡El juego comienza limpio! 🎉
        </div>
      )}
      
      {wrongCount >= 6 && (
        <div className="hangman-game-over">
          💀 ¡GAME OVER! 💀
        </div>
      )}
    </div>
  );
};

HangmanDrawing.propTypes = {
  wrongCount: PropTypes.number.isRequired,
};

export default HangmanDrawing;
