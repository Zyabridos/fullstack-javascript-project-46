import genDiffStylish from './stylish.js';
import genDiffPlain from './plain.js';

export default (file1, file2, formatName) => {
  switch (formatName) {
    case 'stylish':
      return genDiffStylish(file1, file2);
    case 'plain':
      return genDiffPlain(file1, file2);
    default:
      // return 'cdcd';
      throw new Error(`Unknown option: ${formatName}.\n
      usage: genDiff  [-v | --version]\n
                      [-h | --help]\n`);
  }
};
