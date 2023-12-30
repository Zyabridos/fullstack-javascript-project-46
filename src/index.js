import genDiff from './formatters/index.js';
import parser from './parser.js';
import { getFileData, getFileExt } from './utils.js';

export default (filepath1, filepath2, formatName) => genDiff(
  parser(getFileData(filepath1), getFileExt(filepath2)),
  parser(getFileData(filepath1), getFileExt(filepath2)),
  formatName,
);
