import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import genDiff from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename));

const firstJSON = yaml.load(readFile('file1.json'));
const secondJSON = yaml.load(readFile('file2.json'));

const firstYAML = yaml.load(readFile('file1.yaml'));
const secondYAML = yaml.load(readFile('file2.yaml'));

const expectedStylishJSON = readFile('expectedStylishFormat.txt').toString();
const expectedPlainJSON = readFile('expectedPlainFormat.txt').toString();

test('comparing json', () => {
  expect(genDiff(firstJSON, secondJSON))
    .toBe(expectedStylishJSON);
  expect(genDiff(firstJSON, secondJSON))
    .toBe(expectedPlainJSON);
});

test('comparing yaml', () => {
  expect(genDiff(firstYAML, secondYAML))
    .toBe(expectedStylishJSON);
  expect(genDiff(firstYAML, secondYAML))
    .toBe(expectedPlainJSON);
});
