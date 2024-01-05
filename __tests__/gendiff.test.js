// @ts-check
import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import parser from '../src/parser.js';
import { getValueOf } from '../src/formatters/plain.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename));

const expectedStylish = readFile('expectedStylishFormat.txt').toString();
const expectedPlain = readFile('expectedPlainFormat.txt').toString();
const expectedJSON = readFile('expectedJsonFormat.txt').toString();

const casesStylish = [
  ['json', 'stylish', expectedStylish],
  ['json', undefined, expectedStylish],
  ['yaml', 'stylish', expectedStylish],
  ['yaml', undefined, expectedStylish],
  ['yml', 'stylish', expectedStylish],
  ['yml', undefined, expectedStylish],
];

const casesPlain = [
  ['json', 'plain', expectedPlain],
  ['yaml', 'plain', expectedPlain],
  ['yml', 'plain', expectedPlain],
];

const casesJSON = [
  ['json', 'json', expectedJSON],
  ['yaml', 'json', expectedJSON],
  ['yml', 'json', expectedJSON],
];

test.each(casesPlain)('test plain format', (fileExtention, formatName, expected) => {
  const actual = genDiff(getFixturePath(`file1.${fileExtention}`), getFixturePath(`file2.${fileExtention}`), formatName);
  expect(actual).toEqual(expected);
});

test.each(casesJSON)('test JSON format', (fileExtention, formatName, expected) => {
  const actual = genDiff(getFixturePath(`file1.${fileExtention}`), getFixturePath(`file2.${fileExtention}`), formatName);
  expect(actual).toEqual(expected);
});

test.each(casesStylish)('test stylish format', (fileExtention, formatName, expected) => {
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
