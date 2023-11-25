import * as fs from 'fs';
import * as path from 'path';
import genDiff from '../src/gendiff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// beforeAll(() => {
//   const firstJSON = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
// });

const firstJSON = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
const secondJSON = fs.readFileSync(getFixturePath('file2.json'), 'utf-8');

const expectedJSON = firstJSON;

const actual = genDiff(firstJSON, secondJSON);

test('json files', () => {
  expect(expectedJSON).toEqual(actual);
});
