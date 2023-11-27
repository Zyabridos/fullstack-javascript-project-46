import process from 'process';
import path from 'path';
import * as fs from 'fs';
import yaml from 'js-yaml';

const filePath = '../__fixtures__/';
const format = path.extname(filePath);
// const data = fs.readFileSync(filePath, 'utf-8');
const data = fs.readFileSync(path.resolve(process.cwd(), filePath));

let parse;
if (format === '.json') {
  parse = JSON.parse;
} else if (format === '.yaml') {
  parse = yaml.safeLoad;
}

parse(data);

const jsonData1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'file1.json')));

const jsonData2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'file2.json')));

const yamlData1 = yaml.load(fs.readFileSync(path.resolve(process.cwd(), 'file1.yaml')));

const yamlData2 = yaml.load(fs.readFileSync(path.resolve(process.cwd(), 'file2.yaml')));

console.log(path.extname(filePath));
