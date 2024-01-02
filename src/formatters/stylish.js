import _ from 'lodash';

const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - 2);

const getBracketIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - spacesCount);

const doStringify = (value, depth = 1) => {
  if (!_.isPlainObject(value)) return `${value}`;

  const currentIndent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);

  const currentValue = Object.entries(value);

  const lines = currentValue.map(([key, val]) => `${currentIndent}  ${key}: ${doStringify(val, depth + 1)}`);

  const result = ['{', ...lines, `${bracketIndent}}`].join('\n');

  return result;
};

const genDiffStylish = (diff) => {
  const iter = (currentValue, depth = 1) => {
    const currentIndent = getIndent(depth);
    const bracketIndent = getBracketIndent(depth);

    const lines = currentValue.flatMap((node) => {
      switch (node.status) {
        case 'nested':
          return `${currentIndent}  ${node.key}: ${iter(node.children, depth + 1)}`;

        case 'deleted':
          return `${currentIndent}- ${node.key}: ${doStringify(node.value1, depth + 1)}`;

        case 'added':
          return `${currentIndent}+ ${node.key}: ${doStringify(node.value2, depth + 1)}`;

        case 'unchanged':
          return `${currentIndent}  ${node.key}: ${doStringify(node.value1, depth + 1)}`;

        case 'changed':
          return [
            `${currentIndent}- ${node.key}: ${doStringify(node.value1, depth + 1)}`,
            `${currentIndent}+ ${node.key}: ${doStringify(node.value2, depth + 1)}`,
          ];

        default:
          throw new Error(`Unknown type: ${node.status}!`);
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(diff);
};

export default genDiffStylish;
