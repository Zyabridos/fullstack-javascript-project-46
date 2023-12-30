import yaml from 'js-yaml';

export default (fileData, fileExtension) => {
  switch (fileExtension) {
    // case '.json':
    //   return JSON.parse(fileData);
    case '.yml':
      return yaml.load(fileData);
    case '.yaml':
      return yaml.load(fileData);
    default:
      // throw new Error(`Unknown format: '${fileExtension}'!`);
      return '.json';
  }
};
