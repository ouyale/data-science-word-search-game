import React from 'react';
import { useGameContext } from '../context/GameContext';
import { Timer, RefreshCw } from 'lucide-react';
import { TOPICS } from '../constants';

const GameControls: React.FC = () => {
  const {
    wordCount,
    setWordCount,
    timerEnabled,
    setTimerEnabled,
    regenerateGame,
    gameOver,
    victory,
    currentTopic,
    setCurrentTopic
  } = useGameContext();

  return (
    <div className="flex flex-wrap items-center gap-6 mb-6">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Topic:</label>
        <select
          value={currentTopic}
          onChange={(e) => {
            setCurrentTopic(e.target.value as keyof typeof TOPICS);
            regenerateGame();
          }}
          className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {Object.entries(TOPICS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Words:</label>
        <select
          value={wordCount}
          onChange={(e) => setWordCount(Number(e.target.value))}
          className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {[5, 10, 15, 20].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Timer className="w-5 h-5 text-gray-600" />
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={timerEnabled}
            onChange={(e) => setTimerEnabled(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>

      <button
        onClick={regenerateGame}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <RefreshCw className="w-4 h-4" />
        New Game
      </button>

      {gameOver && (
        <div className={`text-lg font-bold ${victory ? 'text-green-600' : 'text-red-600'}`}>
          {victory ? '🎉 Congratulations! You found all words!' : 'Game Over!'}
        </div>
      )}
    </div>
  );
};

export default GameControls;