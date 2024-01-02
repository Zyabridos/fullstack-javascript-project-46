import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import { getFileExt } from '../src/utils.js';
import parser from '../src/parser.js';
import { getValueOf } from '../src/formatters/plain.js';

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
  ['yml', 'json', expectedJSON],
  ['yml', undefined, expectedStylish],
];

test.each(cases)('test main functionality', (fileExtention, formatName, expected) => {
  const actual = genDiff(getFixturePath(`file1.${fileExtention}`), getFixturePath(`file2.${fileExtention}`), formatName);
  expect(actual).toEqual(expected);
});

test('test main functionality with wrong data', () => {
  expect(() => {
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'newType');
  }).toThrow(`Unknown format\n
      usage: genDiff  [-v | --version]\n
                      [-h | --help]\n`);
});

test('test getValueOf', () => {
  expect(() => {
    getValueOf(null).toBeNull();
  });
  expect(() => {
    getValueOf(NaN);
  }).toThrow('The value is unknown to me.');
});

test('test parser with wrong data', () => {
  expect(() => {
    parser('I am file.js');
  }).toThrow('Format file is not correct');
});
