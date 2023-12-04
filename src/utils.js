// const sortKeysAlphabetically = (data) => Object.keys(data).sort().reduce((obj, key) => {
//   obj[key] = data[key];
//   return obj;
// }, {});

// export default sortKeysAlphabetically;
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

        let expr;
        switch (expr) {
          case (!_.has(objectOfFile1, key)):
            return `${currentIndent}+ ${key}: ${stringify(value2, spaceCount)}`;
          case (_.isObject(value1) && _.isObject(value2)):
            return `${currentIndent}  ${key}: ${iter(value1, value2, spaceCount + 4)}`;
          case (value1 !== value2):
            return [`${currentIndent}- ${key}: ${stringify(value1, spaceCount)}\n${currentIndent}+ ${key}: ${value2}`];
          case (!_.has(objectOfFile2, key)):
            return `${currentIndent}- ${key}: ${stringify(value1, spaceCount)}`;
          default:
            return `${currentIndent}  ${key}: ${value2}`;
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

const data3 = {
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

const data4 = {
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

// console.log(genDiffStylish(data3, data4));
// console.log(genDiff(data1, data2));
export default genDiffStylish;
