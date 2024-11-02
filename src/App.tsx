import React from 'react';
import { Brain, Search } from 'lucide-react';
import WordGrid from './components/WordGrid';
import WordList from './components/WordList';
import GameTimer from './components/Timer';
import GameControls from './components/GameControls';
import { GameProvider, useGameContext } from './context/GameContext';

const TimerDisplay = () => {
  const { timerEnabled } = useGameContext();
  return timerEnabled ? <GameTimer /> : null;
};

const ProgressBar = () => {
  const { words, foundWords } = useGameContext();
  const progress = (foundWords.length / words.length) * 100;
  
  return (
    <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-indigo-600 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
        <header className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Data Science Word Search</h1>
            <Search className="w-8 h-8 text-indigo-600" />
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Find all the hidden data science terms in the grid. Click and drag to select words.
            Discover definitions as you find them!
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <GameControls />
            
            <div className="flex items-center justify-between mb-6">
              <TimerDisplay />
              <ProgressBar />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <WordGrid />
              </div>
              <div className="lg:col-span-2">
                <WordList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </GameProvider>
  );
}

export default App;