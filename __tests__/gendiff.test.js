import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const firstJSON = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
const secondJSON = fs.readFileSync(getFixturePath('file2.json'), 'utf-8');
const firstYAML = fs.readFileSync(getFixturePath('file1.yaml'), 'utf-8');
const secondYAML = fs.readFileSync(getFixturePath('file2.yaml'), 'utf-8');

test('json test', () => {
  const actual = genDiff(firstJSON, secondJSON);
  const expected = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;
  expect(actual).toEqual(expected);
});

// test('yml test', () => {
//   const actual = genDiff(firstYAML, secondYAMK);
//   const expected = `{
//  - follow: false
//    host: hexlet.io
//  - proxy: 123.234.53.22
//  - timeout: 50
//  + timeout: 20
//  + verbose: true
// }`;
//   expect(actual).toEqual(expected);
// });
