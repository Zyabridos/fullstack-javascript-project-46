import genDiffStylish from './stylish.js';
import genDiffPlain from './plain.js';
import makeAstTree from '../makeAstTree.js';

export default (parseFile1, parseFile2, formatName = 'stylish') => {
  const astTree = makeAstTree(parseFile1, parseFile2);
  switch (formatName) {
    case 'stylish':
      return genDiffStylish(astTree);
    case 'plain':
      return genDiffPlain(astTree);
    case 'json':
      return JSON.stringify(astTree);
    default:
      throw new Error(`Unknown format\n
      usage: genDiff  [-v | --version]\n
                      [-h | --help]\n`);
  }
};
