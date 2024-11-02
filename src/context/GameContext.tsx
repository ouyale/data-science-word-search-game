import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { generateGrid } from "../utils/gridGenerator";
import { TOPICS, WORD_LISTS, WORD_DEFINITIONS, type Topic } from "../constants";
import confetti from "canvas-confetti";

interface GameContextType {
  grid: string[][];
  words: string[];
  foundWords: string[];
  currentTopic: Topic;
  wordCount: number;
  gameOver: boolean;
  victory: boolean;
  timerEnabled: boolean;
  definitions: Record<string, string>;
  checkWord: (word: string) => void;
  setCurrentTopic: (topic: Topic) => void;
  setWordCount: (count: number) => void;
  setTimerEnabled: (enabled: boolean) => void;
  setGameOver: (over: boolean) => void;
  regenerateGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTopic, setCurrentTopic] = useState<Topic>('DATA_SCIENCE');
  const [wordCount, setWordCount] = useState(5);
  const [words, setWords] = useState<string[]>([]);
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [definitions, setDefinitions] = useState<Record<string, string>>({});

  const initializeGame = useCallback(() => {
    const availableWords = WORD_LISTS[currentTopic];
    const selectedWords = availableWords
      .sort(() => Math.random() - 0.5)
      .slice(0, wordCount);
    
    const selectedDefinitions: Record<string, string> = {};
    selectedWords.forEach(word => {
      selectedDefinitions[word] = WORD_DEFINITIONS[word] || 'Definition not available';
    });

    const { grid: newGrid } = generateGrid(selectedWords);
    
    setWords(selectedWords);
    setGrid(newGrid);
    setFoundWords([]);
    setDefinitions(selectedDefinitions);
    setGameOver(false);
    setVictory(false);
  }, [currentTopic, wordCount]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const checkWord = useCallback((selectedWord: string) => {
    if (gameOver) return;

    const word = selectedWord.trim().toUpperCase();
    if (words.includes(word) && !foundWords.includes(word)) {
      setFoundWords(prev => [...prev, word]);
      
      if (foundWords.length + 1 === words.length) {
        setGameOver(true);
        setVictory(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  }, [words, foundWords, gameOver]);

  const regenerateGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <GameContext.Provider value={{
      grid,
      words,
      foundWords,
      currentTopic,
      wordCount,
      gameOver,
      victory,
      timerEnabled,
      definitions,
      checkWord,
      setCurrentTopic,
      setWordCount,
      setTimerEnabled,
      setGameOver,
      regenerateGame
    }}>
      {children}
    </GameContext.Provider>
  );
};