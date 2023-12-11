import genDiff from './main.js';
import parser from './parser.js';
import { getFileData, getFileExt } from './utils.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  genDiff(
    parser(getFileData(filepath1), getFileExt(filepath1)),
    parser(getFileData(filepath2), getFileExt(filepath2)),
    formatName,
  );
};
