import genDiffStylish from './stylish.js';
import genDiffPlain from './plain.js';

const getFormatName = (formatName) => {
  if (formatName === undefined) {
    return 'stylish';
  }

  return formatName;
};

export default (file1, file2, formatName) => {
  const diffStylishTree = genDiffStylish(file1, file2);
  switch (getFormatName(formatName)) {
    case 'stylish':
      return diffStylishTree;
    case 'plain':
      return genDiffPlain(file1, file2);
    case 'json':
      return JSON.stringify(diffStylishTree);
    default:
      throw new Error(`Unknown option: ${formatName}.\n
      usage: genDiff  [-v | --version]\n
                      [-h | --help]\n`);
  }
};
