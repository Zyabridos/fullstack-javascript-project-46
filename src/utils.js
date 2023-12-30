import path from 'path';
import * as fs from 'fs';

export const getFileExt = (filepath) => filepath.split('.')[1];
export const getFileData = (filepath) => {
  const absolutePath = path.resolve((process.cwd(), filepath));
  return fs.readFileSync(absolutePath, 'utf-8');
};
