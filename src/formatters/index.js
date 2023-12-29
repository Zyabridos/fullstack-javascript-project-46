import genDiffPlain from './plain.js';
import genDiffStylish from './stylish.js';
import makeAstTree from '../makeAstTree.js';

const getFormatName = (formatName = 'stylish') => formatName;

export default (filepath1, filepath2, formatName) => {
  const diffStylishTree = makeAstTree(filepath1, filepath2);
  switch (getFormatName(formatName)) {
    case 'stylish':
      return genDiffStylish(filepath1, filepath2);
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
