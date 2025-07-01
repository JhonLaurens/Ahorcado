import { ACTIONS, GAME_STATES, WORD_LIST } from './constants.js';

/**
 * Handle starting a new game
 */
export const handleStartGame = () => {
  const newWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
  return {
    type: ACTIONS.START_GAME,
    payload: { word: newWord }
  };
};

/**
 * Handle letter guess logic
 */
export const handleGuessLetter = (state, letter) => {
  const normalizedLetter = letter.toUpperCase();
  
  // Check if letter already guessed
  if (state.guessedLetters.includes(normalizedLetter) || state.wrongGuesses.includes(normalizedLetter)) {
    return null;
  }

  const isCorrect = state.currentWord.includes(normalizedLetter);
  const newCorrectLetters = isCorrect ? state.correctLetters + 1 : state.correctLetters;
  
  // Calculate time penalty for wrong guess
  const timePenalty = isCorrect ? 0 : 8;
  const newTime = Math.max(0, state.remainingTime - timePenalty);
  
  // Update guessed letters
  const newGuessedLetters = isCorrect 
    ? [...state.guessedLetters, normalizedLetter]
    : state.guessedLetters;
  
  const newWrongGuesses = isCorrect
    ? state.wrongGuesses
    : [...state.wrongGuesses, normalizedLetter];

  // Check win condition
  const hasWon = state.currentWord.split('').every(char => 
    newGuessedLetters.includes(char)
  );

  // Check lose condition (6 wrong guesses or time up)
  const hasLost = newWrongGuesses.length >= 6 || newTime === 0;

  let newGameState = state.gameState;
  let showModal = false;
  let modalType = null;

  if (hasWon) {
    newGameState = GAME_STATES.WON;
    showModal = true;
    modalType = 'win';
  } else if (hasLost) {
    newGameState = GAME_STATES.LOST;
    showModal = true;
    modalType = 'lose';
  }

  return {
    guessedLetters: newGuessedLetters,
    wrongGuesses: newWrongGuesses,
    remainingTime: newTime,
    gameState: newGameState,
    showModal,
    modalType,
    correctLetters: newCorrectLetters,
    currentScore: newTime * newCorrectLetters,
    isTimerRunning: !hasWon && !hasLost
  };
};

/**
 * Handle timer update
 */
export const handleTimerUpdate = (state) => {
  const timeLeft = Math.max(0, state.remainingTime - 1);
  const timerLost = timeLeft === 0 && state.gameState === GAME_STATES.PLAYING;
  
  return {
    remainingTime: timeLeft,
    gameState: timerLost ? GAME_STATES.LOST : state.gameState,
    showModal: timerLost ? true : state.showModal,
    modalType: timerLost ? 'lose' : state.modalType,
    isTimerRunning: !timerLost && state.isTimerRunning
  };
};
