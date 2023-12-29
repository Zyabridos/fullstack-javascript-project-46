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

// const genDiffStylish = (file1, file2) => {
//   const iter = (objectOfFile1, objectOfFile2, spaceCount = 2) => {
//     const currentIndent = ' '.repeat(spaceCount);
//     const bracketIndent = ' '.repeat(spaceCount - 2);

//     const result = _.sortBy(_.union(_.keys(objectOfFile1), _.keys(objectOfFile2)))
//       .map((key) => {
//         const value1 = objectOfFile1[key];
//         const value2 = objectOfFile2[key];

//         if (!_.has(objectOfFile2, key)) {
//           return `${currentIndent}- ${key}: ${stringify(value1, spaceCount)}`;
//         }

//         if (!_.has(objectOfFile1, key)) {
//           return `${currentIndent}+ ${key}: ${stringify(value2, spaceCount)}`;
//         }

//         if (_.isObject(value1) && _.isObject(value2)) {
//           return `${currentIndent}  ${key}: ${iter(value1, value2, spaceCount + 4)}`;
//         }

//         if (value1 !== value2) {
//           return [`${currentIndent}- ${key}: ${stringify(value1, spaceCount)}\n${currentIndent}+ ${key}: ${value2}`];
//         }

//         return `${currentIndent}  ${key}: ${value2}`;
//       });

//     return [
//       '{',
//       ...result,
//       `${bracketIndent}}`]
//       .join('\n');
//   };

//   return iter(file1, file2);
// };

// export default genDiffStylish;

// const genDiffStylish = (tree) => {
//   const iter = (object, depth, spaceCount = 2) => {
//     const currentIndent = ' '.repeat(spaceCount);
//     const bracketIndent = ' '.repeat(spaceCount - 2);
//     const result = object.map((key) => {
//       switch (key.action) {
//         case 'deleted':
//           return `${currentIndent}- ${key}: ${stringify(key.oldValue, spaceCount)}`;
//         case 'added':
//           return `${currentIndent}+ ${key}: ${stringify(key.newValue, spaceCount)}`;
//         case 'nested':
//           return `${currentIndent}  ${key}: ${iter(key.children, spaceCount + 4)}`;
//         case 'changed':
//           return [`${currentIndent}- ${key}: ${stringify(key.oldValue, spaceCount)}\n${currentIndent}+ ${key}: ${key.newValue}`];
//         default:
//           return `${currentIndent}  ${key}: ${key.oldValue}`;
//       }
//     });

//     return [
//       '{',
//       ...result,
//       `${bracketIndent}}`]
//       .join('\n');
//   };

//   return iter(tree, 0);
// };
// export default genDiffStylish;

const data = {
  added: '+ ',
  deleted: '- ',
  space: '  ',
};

const getSpace = (depth, symbol) => {
  if (!symbol) {
    return '    '.repeat(depth);
  }
  if (depth === 0 && !symbol) {
    return '';
  }
  return `${'    '.repeat(depth)}  ${symbol}`;
};

const genDiffStylish = (tree) => {
  const iter = (object, depth) => {
    const result = object.map((key) => {
      switch (key.action) {
        case 'deleted':
          return `${getSpace(depth, data.deleted)}${key.key}: ${stringify(key.oldValue, depth)}`;
        case 'added':
          return `${getSpace(depth, data.added)}${key.key}: ${stringify(key.newValue, depth)}`;
        case 'nested':
          return `${getSpace(depth, data.space)}${key.key}: ${iter(key.children, depth + 1)}`;
        case 'changed':
          return [`${getSpace(depth, data.deleted)}${key.key}: ${stringify(key.oldValue, depth)}\n${getSpace(depth, data.added)}${key.key}: ${stringify(key.newValue, depth)}`];
        default:
          return `${getSpace(depth, data.space)}${key.key}: ${stringify(key.oldValue, depth)}`;
      }
    });

    return [
      '{',
      ...result,
      `${getSpace(depth)}}`]
      .join('\n');
  };

  return iter(tree, 0);
};

const file1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const file2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

console.log(genDiffStylish(file1, file2));

export default genDiffStylish;
