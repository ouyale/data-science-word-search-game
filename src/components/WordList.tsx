import React from 'react';
import { useGameContext } from '../context/GameContext';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

const WordList: React.FC = () => {
  const { words, foundWords, definitions } = useGameContext();
  const [expandedWord, setExpandedWord] = React.useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Words to Find</h2>
      <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {words.map(word => {
          const found = foundWords.includes(word);
          const isExpanded = expandedWord === word;

          return (
            <div
              key={word}
              className={`flex flex-col p-2 rounded-lg transition-all ${
                found ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  found ? 'bg-green-500' : 'bg-gray-200'
                }`}>
                  {found && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className={`font-medium ${found ? 'text-green-700' : 'text-gray-700'}`}>
                  {word}
                </span>
                {found && (
                  <button
                    onClick={() => setExpandedWord(isExpanded ? null : word)}
                    className="ml-auto text-gray-500 hover:text-gray-700"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
              {found && isExpanded && (
                <div className="mt-2 text-sm text-gray-600 pl-8 border-l-2 border-green-200">
                  {definitions[word]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordList;