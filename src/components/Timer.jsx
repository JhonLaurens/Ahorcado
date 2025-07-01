import { useGame } from '../hooks/useGame.js';
import '../styles/Timer.css';

/**
 * Timer Component - Shows remaining time with visual indicators
 */
const Timer = () => {
  const { state } = useGame();
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getTimerClass = () => {
    if (state.remainingTime <= 10) return 'timer critical';
    if (state.remainingTime <= 30) return 'timer warning';
    return 'timer normal';
  };
  
  const getProgressPercentage = () => {
    return (state.remainingTime / 90) * 100;
  };

  return (
    <div className={getTimerClass()}>
      <div className="timer-label">⏱️ Tiempo</div>
      <div className="timer-value">
        {formatTime(state.remainingTime)}
      </div>
      <div className="timer-progress">
        <div 
          className="timer-progress-bar"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
