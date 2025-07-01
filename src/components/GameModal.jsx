import { useState } from 'react';
import { useGame } from '../hooks/useGame.js';
import '../styles/GameModal.css';

/**
 * Game Modal Component - Shows win/lose modal with score input
 */
const GameModal = () => {
  const { state, saveScore, resetGame, startGame } = useGame();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSaveScore = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Por favor ingresa tu nombre');
      return;
    }

    if (username.length < 2) {
      setError('El nombre debe tener al menos 2 caracteres');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await saveScore(username.trim());
      // Modal will close automatically via context
    } catch (err) {
      setError('Error al guardar el puntaje. Inténtalo de nuevo.');
      console.error('Save score error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    resetGame();
  };

  const handlePlayAgain = () => {
    startGame();
  };

  const getModalContent = () => {
    if (state.modalType === 'win') {
      return {
        title: '🎉 ¡GANASTE!',
        subtitle: '¡Felicitaciones! Has completado la palabra',
        className: 'win',
        showScoreForm: true
      };
    }
    
    if (state.modalType === 'lose') {
      return {
        title: '💀 PERDISTE',
        subtitle: `La palabra era: "${state.currentWord}"`,
        className: 'lose',
        showScoreForm: state.currentScore > 0 // Only if player got some points
      };
    }
    
    return {
      title: '🎮 JUEGO TERMINADO',
      subtitle: '',
      className: 'default',
      showScoreForm: false
    };
  };

  const modalContent = getModalContent();

  return (
    <div className="modal-overlay">
      <div className={`game-modal ${modalContent.className}`}>
        <div className="modal-header">
          <h2 className="modal-title">{modalContent.title}</h2>
          <p className="modal-subtitle">{modalContent.subtitle}</p>
        </div>

        <div className="modal-score">
          <div className="score-display">
            <span className="score-label">Tu Puntuación</span>
            <span className="score-value">{state.currentScore}</span>
            <span className="score-breakdown">
              {state.correctLetters} letras × {state.remainingTime}s = {state.currentScore} pts
            </span>
          </div>
        </div>

        {modalContent.showScoreForm ? (
          <form onSubmit={handleSaveScore} className="score-form">
            <div className="form-group">
              <label htmlFor="username">💾 Guarda tu puntuación</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu nombre..."
                maxLength={20}
                disabled={isLoading}
                autoFocus
              />
              {error && <span className="error-message">{error}</span>}
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="save-button"
                disabled={isLoading}
              >
                {isLoading ? '💾 Guardando...' : '💾 Guardar'}
              </button>
              
              <button 
                type="button" 
                className="skip-button"
                onClick={handleSkip}
                disabled={isLoading}
              >
                ⏭️ Omitir
              </button>
            </div>
          </form>
        ) : (
          <div className="modal-actions">
            <button 
              className="play-again-button"
              onClick={handlePlayAgain}
            >
              🔄 Jugar de Nuevo
            </button>
            
            <button 
              className="menu-button"
              onClick={resetGame}
            >
              🏠 Menú Principal
            </button>
          </div>
        )}

        {state.modalType === 'win' && (
          <div className="celebration">
            <div className="confetti">🎊</div>
            <div className="confetti">🎉</div>
            <div className="confetti">✨</div>
            <div className="confetti">🌟</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameModal;
