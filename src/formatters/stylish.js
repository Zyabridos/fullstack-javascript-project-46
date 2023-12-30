import _ from 'lodash';

const countSpaces = (depth, symbol) => {
  if (!symbol) {
    return '    '.repeat(depth);
  }
  if (depth === 0 && !symbol) {
    return '';
  }
  return `${'    '.repeat(depth)}  ${symbol}`;
};

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
  const iter = (object, depth) => {
    const result = object.map((key) => {
      switch (key.status) {
        case 'deleted':
          return `${countSpaces(depth, '- ')}${key.key}: ${stringify(key.oldValue, depth)}`;
        case 'added':
          return `${countSpaces(depth, '+ ')}${key.key}: ${stringify(key.newValue, depth)}`;
        case 'nested':
          return `${countSpaces(depth, '  ')}${key.key}: ${iter(key.children, depth + 1)}`;
        case 'changed':
          return [`${countSpaces(depth, '- ')}${key.key}: ${stringify(key.oldValue, depth)}\n
          ${countSpaces(depth, '+ ')}${key.key}: ${stringify(key.newValue, depth)}`];
        default:
          return `${countSpaces(depth, '  ')}${key.key}: ${stringify(key.oldValue, depth)}`;
      }
    });

    return [
      '{',
      ...result,
      `${countSpaces(depth)}}`]
      .join('\n');
  };

  return iter(tree, 0);
};

export default genDiffStylish;
