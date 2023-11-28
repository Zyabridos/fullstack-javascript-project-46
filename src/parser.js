import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setPathToJSONfiles = () => path.join(__dirname, '..', '__fixtures__', 'json');
const setPathToYAMLfiles = () => path.join(__dirname, '..', '__fixtures__', 'yaml');

const pathToJSONfiles = setPathToJSONfiles();
const pathToYAMLfiles = setPathToYAMLfiles();

const jsonFileReader = (pathToElement) => {
  const content = fs.readdirSync(pathToElement);
  content.forEach((element) => {
    const isDir = fs.lstatSync(path.join(pathToElement, element)).isDirectory();
    if (isDir) {
      jsonFileReader(path.join(pathToElement, element));
    } else {
      const fileContent = fs.readFileSync(path.join(pathToElement, element), 'utf-8');
      const parsed = JSON.parse(fileContent);
      console.log(parsed);
    }
  });
};

const yamlFileReader = (pathToElement) => {
  const content = fs.readdirSync(pathToElement);
  content.forEach((element) => {
    const isDir = fs.lstatSync(path.join(pathToElement, element)).isDirectory();
    if (isDir) {
      jsonFileReader(path.join(pathToElement, element));
    } else {
      const fileContent = fs.readFileSync(path.join(pathToElement, element), 'utf-8');
      const parsed = yaml.load(fileContent);
      console.log(parsed);
    }
  });
};

jsonFileReader(pathToJSONfiles);
yamlFileReader(pathToYAMLfiles);
