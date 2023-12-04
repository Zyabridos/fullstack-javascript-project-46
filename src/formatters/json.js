import genDiffStylish from './stylish.js';

const genDiffJSON = (file1, file2) => {
  const result = genDiffStylish(file1, file2);
  return JSON.stringify(result);
};
