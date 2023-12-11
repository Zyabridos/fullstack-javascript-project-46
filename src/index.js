import {
  getAbsolutePath, getFileData, getFileExt,
} from './utils.js';
import genDiffPlain from './formatters/plain.js';
import genDiffStylish from './formatters/stylish.js';
import parser from './parser.js';

const absoluteFilepath1 = getAbsolutePath(filepath1);
const absoluteFilepath2 = getAbsolutePath(filepath2);

const fileData1 = getFileData(filepath1);
const fileData2 = getFileData(filepath2);

export const fileExt1 = getFileExt(filepath1);
export const fileExt2 = getFileExt(filepath2);

export default (filepath1, filepath2, formatName) => {
  if (formatName === undefined) {
    return 'stylish';
  }
  const diffStylishTree = genDiffStylish(filepath1, filepath2);
  switch (formatName) {
    case 'stylish':
      return diffStylishTree;
    case 'plain':
      return genDiffPlain(filepath1, filepath2);
    case 'json':
      return JSON.stringify(diffStylishTree);
    default:
      throw new Error(`Unknown option: ${formatName}.\n
      usage: genDiff  [-v | --version]\n
                      [-h | --help]\n`);
  }
};
