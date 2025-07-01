import initSqlJs from 'sql.js';

/**
 * Database utility class for managing SQLite operations in the browser
 */
class DatabaseManager {
  constructor() {
    this.db = null;
    this.initialized = false;
  }

  /**
   * Initialize the SQLite database
   */
  async init() {
    if (this.initialized) return;

    try {
      // Initialize sql.js with WASM
      const SQL = await initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
      });

      // Try to load existing database from localStorage
      const savedDb = localStorage.getItem('hangman_db');
      
      if (savedDb) {
        // Load existing database
        const uint8Array = new Uint8Array(JSON.parse(savedDb));
        this.db = new SQL.Database(uint8Array);
      } else {
        // Create new database
        this.db = new SQL.Database();
        await this.createTables();
      }

      this.initialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  /**
   * Create the necessary tables
   */
  async createTables() {
    const createPlayersTable = `
      CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        score INTEGER NOT NULL,
        correct_letters INTEGER NOT NULL,
        remaining_time INTEGER NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      this.db.run(createPlayersTable);
      this.saveDatabase();
      console.log('Tables created successfully');
    } catch (error) {
      console.error('Failed to create tables:', error);
      throw error;
    }
  }

  /**
   * Save the database to localStorage
   */
  saveDatabase() {
    if (!this.db) return;
    
    try {
      const data = this.db.export();
      const buffer = JSON.stringify(Array.from(data));
      localStorage.setItem('hangman_db', buffer);
    } catch (error) {
      console.error('Failed to save database:', error);
    }
  }

  /**
   * Add a new player score
   * @param {string} username - Player's username
   * @param {number} correctLetters - Number of correct letters guessed
   * @param {number} remainingTime - Time remaining when game ended
   */
  async addScore(username, correctLetters, remainingTime) {
    if (!this.db) {
      await this.init();
    }

    const score = remainingTime * correctLetters;
    
    const stmt = this.db.prepare(`
      INSERT INTO players (username, score, correct_letters, remaining_time)
      VALUES (?, ?, ?, ?)
    `);

    try {
      stmt.run([username, score, correctLetters, remainingTime]);
      stmt.free();
      this.saveDatabase();
      
      console.log(`Score added: ${username} - ${score} points`);
      return { username, score, correctLetters, remainingTime };
    } catch (error) {
      console.error('Failed to add score:', error);
      throw error;
    }
  }

  /**
   * Get top 10 players from leaderboard
   * @returns {Array} Array of top players
   */
  async getLeaderboard(limit = 10) {
    if (!this.db) {
      await this.init();
    }

    try {
      const result = this.db.exec(`
        SELECT username, score, correct_letters, remaining_time, timestamp
        FROM players
        ORDER BY score DESC, timestamp ASC
        LIMIT ?
      `, [limit]);

      if (result.length === 0) return [];

      const columns = result[0].columns;
      const values = result[0].values;

      return values.map(row => {
        const player = {};
        columns.forEach((col, index) => {
          player[col] = row[index];
        });
        return player;
      });
    } catch (error) {
      console.error('Failed to get leaderboard:', error);
      return [];
    }
  }

  /**
   * Get player statistics
   */
  async getStats() {
    if (!this.db) {
      await this.init();
    }

    try {
      const result = this.db.exec(`
        SELECT 
          COUNT(*) as total_games,
          MAX(score) as best_score,
          AVG(score) as avg_score,
          SUM(correct_letters) as total_letters
        FROM players
      `);

      if (result.length === 0) {
        return {
          total_games: 0,
          best_score: 0,
          avg_score: 0,
          total_letters: 0
        };
      }

      const columns = result[0].columns;
      const values = result[0].values[0];
      
      const stats = {};
      columns.forEach((col, index) => {
        stats[col] = values[index];
      });

      return stats;
    } catch (error) {
      console.error('Failed to get stats:', error);
      return {
        total_games: 0,
        best_score: 0,
        avg_score: 0,
        total_letters: 0
      };
    }
  }

  /**
   * Clear all data (for testing/reset)
   */
  async clearDatabase() {
    if (!this.db) {
      await this.init();
    }

    try {
      this.db.run('DELETE FROM players');
      this.saveDatabase();
      console.log('Database cleared');
    } catch (error) {
      console.error('Failed to clear database:', error);
    }
  }

  /**
   * Close database connection
   */
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
      this.initialized = false;
    }
  }
}

// Create singleton instance
const dbManager = new DatabaseManager();

export default dbManager;
