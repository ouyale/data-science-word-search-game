import { calculateGridSize } from './calculateGridSize';

export interface GridPosition {
  row: number;
  col: number;
  direction: Direction;
}

export type Direction = 'horizontal' | 'vertical' | 'diagonal' | 'reverse-horizontal' | 'reverse-vertical' | 'reverse-diagonal';

const directions: Direction[] = [
  'horizontal',
  'vertical',
  'diagonal',
  'reverse-horizontal',
  'reverse-vertical',
  'reverse-diagonal'
];

const canPlaceWord = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: Direction,
  gridSize: number
): boolean => {
  const length = word.length;

  for (let i = 0; i < length; i++) {
    let currentRow = row;
    let currentCol = col;

    switch (direction) {
      case 'horizontal':
        currentCol = col + i;
        break;
      case 'vertical':
        currentRow = row + i;
        break;
      case 'diagonal':
        currentRow = row + i;
        currentCol = col + i;
        break;
      case 'reverse-horizontal':
        currentCol = col - i;
        break;
      case 'reverse-vertical':
        currentRow = row - i;
        break;
      case 'reverse-diagonal':
        currentRow = row - i;
        currentCol = col - i;
        break;
    }

    if (
      currentRow < 0 ||
      currentRow >= gridSize ||
      currentCol < 0 ||
      currentCol >= gridSize
    ) {
      return false;
    }

    if (
      grid[currentRow][currentCol] !== '' &&
      grid[currentRow][currentCol] !== word[i]
    ) {
      return false;
    }
  }

  return true;
};

const placeWord = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: Direction
): void => {
  for (let i = 0; i < word.length; i++) {
    let currentRow = row;
    let currentCol = col;

    switch (direction) {
      case 'horizontal':
        currentCol = col + i;
        break;
      case 'vertical':
        currentRow = row + i;
        break;
      case 'diagonal':
        currentRow = row + i;
        currentCol = col + i;
        break;
      case 'reverse-horizontal':
        currentCol = col - i;
        break;
      case 'reverse-vertical':
        currentRow = row - i;
        break;
      case 'reverse-diagonal':
        currentRow = row - i;
        currentCol = col - i;
        break;
    }

    grid[currentRow][currentCol] = word[i];
  }
};

export const generateGrid = (words: string[]): { grid: string[][], positions: Record<string, GridPosition> } => {
  // Calculate optimal grid size based on word lengths
  const gridSize = calculateGridSize(words);
  
  // Initialize empty grid
  const grid: string[][] = Array(gridSize).fill(null).map(() => 
    Array(gridSize).fill('')
  );
  
  const positions: Record<string, GridPosition> = {};

  // Sort words by length (longest first)
  const sortedWords = [...words].sort((a, b) => b.length - a.length);

  // Place each word
  sortedWords.forEach(word => {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);

      if (canPlaceWord(grid, word, row, col, direction, gridSize)) {
        placeWord(grid, word, row, col, direction);
        positions[word] = { row, col, direction };
        placed = true;
      }

      attempts++;
    }

    if (!placed) {
      console.warn(`Could not place word: ${word}`);
    }
  });

  // Fill remaining spaces with random letters
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return { grid, positions };
};