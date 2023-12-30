import _ from 'lodash';

const makeSpace = (depthLevel, symbol) => {
  if (depthLevel === 0 && !symbol) {
    return '';
  }
  if (!symbol) {
    return '    '.repeat(depthLevel);
  }
  return `${'    '.repeat(depthLevel)}  ${symbol}`;
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
  const iter = (object, depthLevel) => {
    const result = object.map((key) => {
      switch (key.status) {
        case 'deleted':
          return `${makeSpace(depthLevel, '- ')}${key.key}: ${stringify(key.firstValue, depthLevel)}`;
        case 'added':
          return `${makeSpace(depthLevel, '+ ')}${key.key}: ${stringify(key.secondValue, depthLevel)}`;
        case 'nested':
          return `${makeSpace(depthLevel, '  ')}${key.key}: ${iter(key.children, depthLevel + 1)}`;
        case 'changed':
          return [`${makeSpace(depthLevel, '- ')}${key.key}: ${stringify(key.firstValue, depthLevel)}\n
          ${makeSpace(depthLevel, '+ ')}${key.key}: ${stringify(key.secondValue, depthLevel)}`];
        default:
          return `${makeSpace(depthLevel, '  ')}${key.key}: ${stringify(key.firstValue, depthLevel)}`;
      }
    });

    return [
      '{',
      ...result,
      `${makeSpace(depthLevel)}}`]
      .join('\n');
  };

  return iter(tree, 0);
};

export default genDiffStylish;
