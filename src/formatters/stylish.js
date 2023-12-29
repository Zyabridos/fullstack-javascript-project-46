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

const genDiffStylish = (tree) => {
  const iter = (object, spaceCount = 2) => {
    const currentIndent = ' '.repeat(spaceCount);
    const bracketIndent = ' '.repeat(spaceCount - 2);
    const result = object.map((key) => {
      switch (key.action) {
        case 'deleted':
          return `${currentIndent}- ${key}: ${stringify(key.oldValue, spaceCount)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(key.newValue, spaceCount)}`;
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(key.children, spaceCount + 4)}`;
        case 'changed':
          return [`${currentIndent}- ${key}: ${stringify(key.oldValue, spaceCount)}\n${currentIndent}+ ${key}: ${key.newValue}`];
        default:
          return `${currentIndent}  ${key}: ${key.oldValue}`;
      }
    });

    return [
      '{',
      ...result,
      `${bracketIndent}}`]
      .join('\n');
  };

  return iter(tree, 0);
};

export default genDiffStylish;
