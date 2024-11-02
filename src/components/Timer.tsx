import React, { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';

const GAME_DURATION = 180; // 3 minutes in seconds

const GameTimer: React.FC = () => {
  const { gameOver, setGameOver, timerEnabled } = useGameContext();
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION);
  
  useEffect(() => {
    if (!timerEnabled || gameOver) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerEnabled, gameOver, setGameOver]);

  useEffect(() => {
    setTimeRemaining(GAME_DURATION);
  }, [timerEnabled]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="font-mono text-lg font-semibold">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};

export default GameTimer;