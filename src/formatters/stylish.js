import _ from 'lodash';

const stringify = (value, spacesCount) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = spacesCount + depth * 4;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 2);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `  ${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const genDiffStylish = (file1, file2) => {
  const iter = (objectOfFile1, objectOfFile2, spaceCount = 2) => {
    const currentIndent = ' '.repeat(spaceCount);
    const bracketIndent = ' '.repeat(spaceCount - 2);

    const result = _.sortBy(_.union(_.keys(objectOfFile1), _.keys(objectOfFile2)))
      .map((key) => {
        const value1 = objectOfFile1[key];
        const value2 = objectOfFile2[key];

        if (!_.has(objectOfFile2, key)) {
          return `${currentIndent}- ${key}: ${stringify(value1, spaceCount)}`;
        }

        if (!_.has(objectOfFile1, key)) {
          return `${currentIndent}+ ${key}: ${stringify(value2, spaceCount)}`;
        }

        if (_.isObject(value1) && _.isObject(value2)) {
          return `${currentIndent}  ${key}: ${iter(value1, value2, spaceCount + 4)}`;
        }

        if (value1 !== value2) {
          return [`${currentIndent}- ${key}: ${stringify(value1, spaceCount)}\n${currentIndent}+ ${key}: ${value2}`];
        }

        return `${currentIndent}  ${key}: ${value2}`;
      });

    return [
      '{',
      ...result,
      `${bracketIndent}}`]
      .join('\n');
  };

  return iter(file1, file2);
};

export default genDiffStylish;
