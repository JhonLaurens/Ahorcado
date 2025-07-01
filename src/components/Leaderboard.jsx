import { useGame } from '../hooks/useGame.js';
import '../styles/Leaderboard.css';

/**
 * Leaderboard Component - Shows top 10 players
 */
const Leaderboard = () => {
  const { state } = useGame();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRankEmoji = (index) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}.`;
    }
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>🏆 LEADERBOARD</h2>
        <span className="leaderboard-subtitle">Top 10 Jugadores</span>
      </div>

      <div className="leaderboard-content">
        {state.leaderboard.length === 0 ? (
          <div className="empty-leaderboard">
            <div className="empty-icon">📊</div>
            <p>¡Sé el primero en jugar!</p>
            <span className="empty-hint">Completa tu primer juego para aparecer aquí</span>
          </div>
        ) : (
          <div className="leaderboard-list">
            {state.leaderboard.map((player, index) => (
              <div 
                key={`${player.username}-${player.timestamp}`}
                className={`leaderboard-item ${index < 3 ? 'podium' : ''}`}
              >
                <div className="player-rank">
                  {getRankEmoji(index)}
                </div>
                
                <div className="player-info">
                  <div className="player-name">
                    {player.username}
                  </div>
                  <div className="player-details">
                    <span className="score">{player.score} pts</span>
                    <span className="stats">
                      {player.correct_letters} letras · {player.remaining_time}s
                    </span>
                  </div>
                </div>
                
                <div className="player-date">
                  {formatDate(player.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {state.stats && (
        <div className="leaderboard-stats">
          <h3>📈 Estadísticas</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{state.stats.total_games}</span>
              <span className="stat-label">Juegos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{state.stats.best_score}</span>
              <span className="stat-label">Mejor</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{Math.round(state.stats.avg_score || 0)}</span>
              <span className="stat-label">Promedio</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{state.stats.total_letters}</span>
              <span className="stat-label">Letras</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
