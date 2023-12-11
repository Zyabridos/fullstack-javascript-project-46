import genDiffPlain from './formatters/plain.js';
import genDiffStylish from './formatters/stylish.js';

export default (filepath1, filepath2, formatName) => {
  const diffStylishTree = genDiffStylish(filepath1, filepath2);
  switch (formatName) {
    case 'stylish':
      return diffStylishTree;
    case 'plain':
      return genDiffPlain(filepath1, filepath2);
    case 'json':
      return JSON.stringify(diffStylishTree);
    case 'JSON':
      return JSON.stringify(diffStylishTree);
    default:
      throw new Error(`Unknown option: ${formatName}.\n
      usage: genDiff  [-v | --version]\n
                      [-h | --help]\n`);
  }
};
