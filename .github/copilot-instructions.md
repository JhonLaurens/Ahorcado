# Copilot Instructions for Hangman Game

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a React + Vite Hangman game with SQLite database integration for local-first storage.

## Key Technologies

- React 18 with hooks (useState, useEffect, useContext)
- Vite for build tooling
- sql.js for SQLite in browser (WASM)
- CSS Grid/Flexbox for responsive layout
- Lottie-react for animations

## Code Style Preferences

- Use functional components with hooks
- Prefer arrow functions for component definitions
- Use CSS modules or styled-components for styling
- Keep components small and focused
- Use TypeScript-style JSDoc comments for better IntelliSense

## Project Structure

- `/src/components` - React components
- `/src/hooks` - Custom React hooks
- `/src/utils` - Utility functions and database helpers
- `/src/styles` - CSS files and animations
- `/src/context` - React Context providers

## Game Mechanics

- 90-second timer with 8-second penalty per wrong guess
- Keyboard input only (no mouse clicking letters)
- Letter shake animation every 15 seconds
- SQLite database for storing scores and leaderboard
- Responsive layout: game on left, leaderboard on right

## Database Schema

- Players table: id, username, score, timestamp
- Score calculation: remaining_time \* correct_letters

## Animation Requirements

- Use CSS animations for letter shaking and falling
- Lottie animations for win/lose states
- Smooth transitions for UI state changes
