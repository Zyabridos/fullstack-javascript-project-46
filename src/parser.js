import process from 'process';
import path from 'path';
import * as fs from 'fs';
import yaml from 'js-yaml';

// const configPath = '../__fixtures/';
// const format = path.extname(configPath);
// const data = fs.readSync(configPath);

// let parse;
// if (format === '') {
//   parse = JSON.parse;
// } else if (format === '.yaml') {
//   parse = yaml.safeLoad;
// }

// parse(data);

const jsonData1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'file1.json')));

const jsonData2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'file2.json')));

const yamlData1 = yaml.load(fs.readFileSync(path.resolve(process.cwd(), 'file1.yaml')));

const yamlData2 = yaml.load(fs.readFileSync(path.resolve(process.cwd(), 'file2.yaml')));

// console.log(path.extname(',,/fixtures/file1'));

console.log(yamlData2);
