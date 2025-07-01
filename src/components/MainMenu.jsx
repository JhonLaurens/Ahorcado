import { useGame } from '../hooks/useGame.js';
import '../styles/MainMenu.css';

/**
 * Main Menu Component
 */
const MainMenu = () => {
  const { startGame, clearDatabase } = useGame();

  return (
    <div className="main-menu">
      <div className="menu-content">
        <h1 className="game-title">
          🎯 HANGMAN
        </h1>
        
        <p className="game-subtitle">
          ¡Adivina la palabra antes de que se acabe el tiempo!
        </p>
        
        <div className="game-rules">
          <h3>📋 Reglas del Juego:</h3>
          <ul>
            <li>⏱️ Tienes 90 segundos iniciales</li>
            <li>❌ Cada letra incorrecta resta 8 segundos</li>
            <li>🎯 Máximo 6 errores permitidos</li>
            <li>⌨️ Usa solo el teclado físico</li>
            <li>📊 Tu puntuación: tiempo_restante × letras_correctas</li>
          </ul>
        </div>

        <div className="menu-actions">
          <button 
            className="start-button"
            onClick={startGame}
          >
            🚀 EMPEZAR JUEGO
          </button>
          
          <button 
            className="clear-button"
            onClick={clearDatabase}
            title="Borrar toda la base de datos local"
          >
            🗑️ LIMPIAR DATOS
          </button>
        </div>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">💾</span>
            <span className="feature-text">Base de datos local SQLite</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🏆</span>
            <span className="feature-text">Leaderboard en tiempo real</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎨</span>
            <span className="feature-text">Animaciones CSS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
