import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import genDiff from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename));

const expectedStylish = readFile('expectedStylishFormat.txt').toString();
const expectedPlain = readFile('expectedPlainFormat.txt').toString();
const expectedJSON = readFile('expectedJsonFormat.txt').toString();

const cases = [
  ['json', 'stylish', expectedStylish],
  ['json', 'plain', expectedPlain],
  ['json', 'json', expectedJSON],
  ['json', undefined, expectedStylish],
  ['yaml', 'stylish', expectedStylish],
  ['yaml', 'plain', expectedPlain],
  ['yaml', 'json', expectedJSON],
  ['yaml', undefined, expectedStylish],
  ['yml', 'stylish', expectedStylish],
  ['yml', 'plain', expectedPlain],
  ['yml', undefined, expectedStylish],
  ['yml', undefined, expectedStylish],
];

test.each(cases)('replacer "%s" repeated %s times', (fileExtention, formatName, expected) => {
  const actual = genDiff(getFixturePath(`file1.${fileExtention}`), getFixturePath(`file2.${fileExtention}`), formatName);
  expect(actual).toEqual(expected);
});
