import yaml from 'js-yaml';

export default (absolutePath) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
