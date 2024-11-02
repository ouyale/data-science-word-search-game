export const calculateGridSize = (words: string[]): number => {
  // Find the longest word length
  const maxWordLength = Math.max(...words.map(word => word.length));
  
  // Calculate minimum grid size based on longest word and number of words
  const minSize = Math.max(
    maxWordLength,
    Math.ceil(Math.sqrt(words.length * 2)) + 2
  );
  
  // Add some padding based on number of words
  const padding = words.length <= 5 ? 2 : words.length <= 10 ? 3 : 4;
  
  // Return the calculated size
  return Math.min(minSize + padding, 15); // Cap at 15x15 maximum
};