import path from 'path';
import * as fs from 'fs';

export const getAbsolutePath = (filepath) => path.resolve((process.cwd(), filepath));
export const getFileExt = (filepath) => filepath.split('.')[1];
export const getFileData = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
