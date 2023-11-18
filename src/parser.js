import process from 'process';
import path from 'path';
import * as fs from 'fs';

const data1 = fs.readFileSync(path.resolve(process.cwd(), 'file1.json'));
const jsonData1 = JSON.parse(data1);

const data2 = fs.readFileSync(path.resolve(process.cwd(), 'file2.json'));
const jsonData2 = JSON.parse(data2);
