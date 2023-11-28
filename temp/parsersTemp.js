import process from 'process';
import path from 'path';
import * as fs from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const setPathToFixtures = () => path.join(__dirname, '..', '__fixtures__', 'file1.json');

// const pathToFixtures = setPathToFixtures();

// const files = fs.readdirSync(setPathToFixtures);

const readFiles = (elPath) => {
  const content = fs.readdirSync(elPath);
  content.forEach((el) => {
    const isDir = fs.lstatSync(path.join(elPath, el)).isDirectory();
    if (isDir) {
      readFiles(path.join(elPath, el));
    } else {
      console.log(el);
    }
  });
};

// const filePath = '../__fixtures__/';
// const format = path.extname(filePath);
// // const data = fs.readFileSync(filePath, 'utf-8');
// const data = fs.readFileSync(path.resolve(process.cwd(), filePath));

// let parse;
// if (format === '.json') {
//   parse = JSON.parse;
// } else if (format === '.yaml') {
//   parse = yaml.safeLoad;
// }

// parse(data);

const jsonData1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'file1.json')));

// const jsonData2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'file2.json')));

// const yamlData1 = yaml.load(fs.readFileSync(path.resolve(process.cwd(), 'file1.yaml')));

// const yamlData2 = yaml.load(fs.readFileSync(path.resolve(process.cwd(), 'file2.yaml')));

// readFiles(pathToFixtures);
console.log(jsonData1);
