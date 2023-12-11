import _ from "lodash";

const getValueOf = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  if (typeof (value) === 'boolean' || value == null) {
    return value;
  }
  return '[complex value]';
};

const genDiffPlain = (file1, file2) => {
  const property = 'Property';

  const iter = (parseObj1, parseObj2, path) => {
    const result = _.sortBy(_.union(_.keys(parseObj1), _.keys(parseObj2)))
      .map((key) => {
        const value1 = parseObj1[key];
        const value2 = parseObj2[key];
        const fullKey = `${path}${key}`;
        if (!_.has(parseObj2, key)) {
          return `${property} '${fullKey}' was removed`;
        }

        if (!_.has(parseObj1, key)) {
          return `${property} '${fullKey}' was added with value: ${getValueOf(value2)}`;
        }

        if (value1 !== value2) {
          if (_.isObject(value1) && _.isObject(value2)) {
            return iter(value1, value2, `${fullKey}.`);
          }
          return `${property} '${fullKey}' was updated. From ${getValueOf(value1)} to ${getValueOf(value2)}`;
        }

        return null;
      });

    return [...result]
      .filter((item) => item != null)
      .join('\n');
  };

  return iter(file1, file2, '');
};

export default genDiffPlain;
