import React, { useRef, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import type { GridPosition } from '../utils/gridGenerator';

interface Selection {
  start: GridPosition | null;
  current: GridPosition | null;
}

const WordGrid: React.FC = () => {
  const { grid, checkWord, gameOver } = useGameContext();
  const gridRef = useRef<HTMLDivElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState<Selection>({ start: null, current: null });
  const [selectedCells, setSelectedCells] = useState<GridPosition[]>([]);

  const gridSize = grid.length; // Dynamic grid size

  const handleMouseDown = (row: number, col: number) => {
    if (gameOver) return;
    
    setIsSelecting(true);
    const newSelection = { row, col };
    setSelection({ start: newSelection, current: newSelection });
    setSelectedCells([newSelection]);
  };

  const handleMouseMove = (row: number, col: number) => {
    if (!isSelecting || gameOver) return;

    const current = { row, col };
    setSelection(prev => ({ ...prev, current }));

    if (selection.start) {
      const cells = getSelectedCells(selection.start, current);
      setSelectedCells(cells);
    }
  };

  const handleMouseUp = () => {
    if (!isSelecting || gameOver) return;

    const word = selectedCells
      .map(cell => grid[cell.row][cell.col])
      .join('');
    
    checkWord(word);
    
    setIsSelecting(false);
    setSelection({ start: null, current: null });
    setSelectedCells([]);
  };

  const getSelectedCells = (start: GridPosition, end: GridPosition): GridPosition[] => {
    const cells: GridPosition[] = [];
    const dx = Math.sign(end.col - start.col);
    const dy = Math.sign(end.row - start.row);
    
    if (dx === 0 && dy === 0) {
      cells.push({ row: start.row, col: start.col });
      return cells;
    }

    let current = { ...start };
    while (true) {
      cells.push({ ...current });
      if (current.row === end.row && current.col === end.col) break;
      current.row += dy;
      current.col += dx;
    }

    return cells;
  };

  return (
    <div 
      className="aspect-square grid gap-1 bg-indigo-50 p-4 rounded-xl"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
      }}
      ref={gridRef}
      onMouseLeave={() => {
        if (isSelecting) {
          setIsSelecting(false);
          setSelection({ start: null, current: null });
          setSelectedCells([]);
        }
      }}
    >
      {grid.map((row, i) => (
        row.map((letter, j) => {
          const isSelected = selectedCells.some(cell => cell.row === i && cell.col === j);
          
          return (
            <div
              key={`${i}-${j}`}
              className={`
                aspect-square flex items-center justify-center
                text-lg font-semibold rounded-lg
                cursor-pointer select-none
                transition-all duration-200
                ${isSelected 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-800 hover:bg-indigo-100'}
                ${gameOver ? 'opacity-50' : ''}
              `}
              onMouseDown={() => handleMouseDown(i, j)}
              onMouseMove={() => handleMouseMove(i, j)}
              onMouseUp={handleMouseUp}
            >
              {letter}
            </div>
          );
        })
      ))}
    </div>
  );
};

export default WordGrid;