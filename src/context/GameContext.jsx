import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { ACTIONS, GAME_STATES, WORD_LIST } from '../utils/constants.js';
import dbManager from '../utils/database.js';
import { handleGuessLetter, handleTimerUpdate } from '../utils/gameLogic.js';

/**
 * Game context for managing global state
 */
const GameContext = createContext();

// Initial state
const initialState = {
  // Game state
  gameState: GAME_STATES.MENU,
  currentWord: '',
  guessedLetters: [],
  wrongGuesses: [],
  remainingTime: 90,
  isTimerRunning: false,
  
  // UI state
  showModal: false,
  modalType: null,
  shakingLetters: false,
  
  // Score and leaderboard
  leaderboard: [],
  currentScore: 0,
  correctLetters: 0,
  
  // Statistics
  stats: {
    total_games: 0,
    best_score: 0,
    avg_score: 0,
    total_letters: 0
  }
};

/**
 * Game reducer for state management
 */
const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_GAME: {
      const newWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
      return {
        ...state,
        gameState: GAME_STATES.PLAYING,
        currentWord: newWord,
        guessedLetters: [],
        wrongGuesses: [],
        remainingTime: 90,
        isTimerRunning: true,
        showModal: false,
        currentScore: 0,
        correctLetters: 0
      };
    }

    case ACTIONS.GUESS_LETTER: {
      const result = handleGuessLetter(state, action.payload);
      if (!result) return state;
      
      return {
        ...state,
        ...result
      };
    }

    case ACTIONS.UPDATE_TIMER: {
      const result = handleTimerUpdate(state);
      return {
        ...state,
        ...result
      };
    }

    case ACTIONS.PAUSE_GAME: {
      return {
        ...state,
        gameState: GAME_STATES.PAUSED,
        isTimerRunning: false
      };
    }

    case ACTIONS.RESUME_GAME: {
      return {
        ...state,
        gameState: GAME_STATES.PLAYING,
        isTimerRunning: true
      };
    }

    case ACTIONS.END_GAME: {
      return {
        ...state,
        gameState: GAME_STATES.GAME_OVER,
        isTimerRunning: false,
        showModal: true,
        modalType: 'gameOver'
      };
    }

    case ACTIONS.RESET_GAME: {
      return {
        ...initialState,
        leaderboard: state.leaderboard,
        stats: state.stats
      };
    }

    case ACTIONS.SET_LEADERBOARD: {
      return {
        ...state,
        leaderboard: action.payload
      };
    }

    case ACTIONS.ADD_SCORE: {
      return {
        ...state,
        leaderboard: [action.payload, ...state.leaderboard]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10),
        showModal: false
      };
    }

    case ACTIONS.TRIGGER_SHAKE: {
      return {
        ...state,
        shakingLetters: true
      };
    }

    case 'RESET_SHAKE': {
      return {
        ...state,
        shakingLetters: false
      };
    }

    case 'SET_STATS': {
      return {
        ...state,
        stats: action.payload
      };
    }

    default:
      return state;
  }
};

/**
 * Game Context Provider
 */
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Initialize database and load leaderboard on mount
  useEffect(() => {
    const initDatabase = async () => {
      try {
        await dbManager.init();
        const leaderboard = await dbManager.getLeaderboard();
        const stats = await dbManager.getStats();
        
        dispatch({ type: ACTIONS.SET_LEADERBOARD, payload: leaderboard });
        dispatch({ type: 'SET_STATS', payload: stats });
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };

    initDatabase();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (state.isTimerRunning && state.remainingTime > 0) {
      interval = setInterval(() => {
        dispatch({ type: ACTIONS.UPDATE_TIMER });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isTimerRunning, state.remainingTime]);

  // Shaking animation effect (every 15 seconds during gameplay)
  useEffect(() => {
    let shakeInterval = null;
    
    if (state.gameState === GAME_STATES.PLAYING) {
      shakeInterval = setInterval(() => {
        dispatch({ type: ACTIONS.TRIGGER_SHAKE });
        // Reset shake after animation duration
        setTimeout(() => {
          dispatch({ type: 'RESET_SHAKE' });
        }, 1000);
      }, 15000);
    }

    return () => {
      if (shakeInterval) clearInterval(shakeInterval);
    };
  }, [state.gameState]);

  /**
   * Save score to database and update leaderboard
   */
  const saveScore = useCallback(async (username) => {
    try {
      const scoreData = await dbManager.addScore(
        username, 
        state.correctLetters, 
        state.remainingTime
      );
      
      dispatch({ type: ACTIONS.ADD_SCORE, payload: scoreData });
      
      // Update stats
      const newStats = await dbManager.getStats();
      dispatch({ type: 'SET_STATS', payload: newStats });
      
      return scoreData;
    } catch (error) {
      console.error('Failed to save score:', error);
      throw error;
    }
  }, [state.correctLetters, state.remainingTime]);

  /**
   * Clear database (for testing)
   */
  const clearDatabase = useCallback(async () => {
    try {
      await dbManager.clearDatabase();
      dispatch({ type: ACTIONS.SET_LEADERBOARD, payload: [] });
      dispatch({ type: 'SET_STATS', payload: initialState.stats });
    } catch (error) {
      console.error('Failed to clear database:', error);
    }
  }, []);

  const value = useMemo(() => ({
    state,
    dispatch,
    saveScore,
    clearDatabase,
    // Action creators
    startGame: () => dispatch({ type: ACTIONS.START_GAME }),
    guessLetter: (letter) => dispatch({ type: ACTIONS.GUESS_LETTER, payload: letter }),
    pauseGame: () => dispatch({ type: ACTIONS.PAUSE_GAME }),
    resumeGame: () => dispatch({ type: ACTIONS.RESUME_GAME }),
    resetGame: () => dispatch({ type: ACTIONS.RESET_GAME }),
    endGame: () => dispatch({ type: ACTIONS.END_GAME })
  }), [state, saveScore, clearDatabase]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameContext;
