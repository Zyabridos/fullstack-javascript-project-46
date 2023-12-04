import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import genDiffPlain from '../src/formatters/plain.js';
import genDiffStylish from '../src/formatters/stylish.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename));

const firstJSON = yaml.load(readFile('file1.json'));
const secondJSON = yaml.load(readFile('file2.json'));

const firstYAML = yaml.load(readFile('file1.yaml'));
const secondYAML = yaml.load(readFile('file2.yaml'));

const expectedStylishJSON = readFile('expectedStylishFormat.txt').toString();
const expectedPlainJSON = readFile('expectedPlainFormat.txt').toString();

test('comparing two stylish json', () => {
  expect(genDiffStylish(firstJSON, secondJSON))
    .toBe(expectedStylishJSON);
});

test('comparing two plain json', () => {
  expect(genDiffPlain(firstJSON, secondJSON))
    .toBe(expectedPlainJSON);
});
