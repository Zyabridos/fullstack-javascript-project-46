import _ from 'lodash';

const makeIndent = (depth, replacer = ' ', spacesCount = 4) => {
  const indent = (depth * spacesCount);
  return replacer.repeat(indent - 2);
};

const makeBracketIndent = (depth, replacer = ' ', spacesCount = 4) => {
  const indent = (depth * spacesCount);
  return replacer.repeat(indent - spacesCount);
};

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const currentIndent = makeIndent(depth);
  const bracketIndent = makeBracketIndent(depth);

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}  ${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`]
    .join('\n');
};

const genDiffStylish = (astTree) => {
  const iter = (currentValue, depth = 1) => {
    const currentIndent = makeIndent(depth);
    const bracketIndent = makeBracketIndent(depth);

    const result = currentValue.flatMap((key) => {
      switch (key.status) {
        case 'nested':
          return `${currentIndent}  ${key.key}: ${iter(key.children, depth + 1)}`;

        case 'deleted':
          return `${currentIndent}- ${key.key}: ${stringify(key.value1, depth + 1)}`;

        case 'added':
          return `${currentIndent}+ ${key.key}: ${stringify(key.value2, depth + 1)}`;

        case 'unchanged':
          return `${currentIndent}  ${key.key}: ${stringify(key.value1, depth + 1)}`;

        case 'changed':
          return [
            `${currentIndent}- ${key.key}: ${stringify(key.value1, depth + 1)}`,
            `${currentIndent}+ ${key.key}: ${stringify(key.value2, depth + 1)}`,
          ];

        default:
          throw new Error(`Unknown type: ${key.status}!`);
      }
    });

    return [
      '{',
      ...result,
      `${bracketIndent}}`]
      .join('\n');
  };

  return iter(astTree);
};

export default genDiffStylish;
