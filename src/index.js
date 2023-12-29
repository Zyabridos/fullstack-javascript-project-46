import genDiff from './main.js';
import parser from './parser.js';
import { getFileData, getFileExt, getAbsolutePath } from './utils.js';

export default (filepath1, filepath2, formatName) => {
  const absolutePath1 = getAbsolutePath(filepath1);
  const fileExtension1 = getFileExt(filepath1);
  const fileData1 = getFileData(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);
  const fileExtension2 = getFileExt(filepath2);
  const fileData2 = getFileData(filepath2);
  const obj1 = parser(fileData1, fileExtension1);
  const obj2 = parser(fileData2, fileExtension2);
  genDiff(
    obj1,
    obj2,
    formatName,
  );
};
