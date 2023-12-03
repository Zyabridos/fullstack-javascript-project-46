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

const genDiff = (file1, file2) => {
  const added = '+';
  const deleted = '-';
  const unchanged = ' ';

  const iter = (objectOfFile1, objectOfFile2, spaceCount = 2) => {
    const currentIndent = ' '.repeat(spaceCount);
    const bracketIndent = ' '.repeat(spaceCount - 2);

    const result = _.sortBy(_.union(_.keys(objectOfFile1), _.keys(objectOfFile2)))
      .map((key) => {
        const value1 = objectOfFile1[key];
        const value2 = objectOfFile2[key];

        if (!_.has(objectOfFile2, key)) {
          return `${currentIndent}${deleted} ${key}: ${stringify(value1, spaceCount)}`;
        }

        if (!_.has(objectOfFile1, key)) {
          return `${currentIndent}${added} ${key}: ${stringify(value2, spaceCount)}`;
        }

        if (_.isObject(value1) && _.isObject(value2)) {
          return `${currentIndent}${unchanged} ${key}: ${iter(value1, value2, spaceCount + 4)}`;
        }

        if (value1 !== value2) {
          return [`${currentIndent}${deleted} ${key}: ${stringify(value1, spaceCount)}\n${currentIndent}${added} ${key}: ${value2}`];
        }

        return `${currentIndent}${unchanged} ${key}: ${value2}`;
      });

    return [
      '{',
      ...result,
      `${bracketIndent}}`]
      .join('\n');
  };

  return iter(file1, file2);
};

const cdcd = (parseFile1, parseFile2, type) => {
  switch (type) {
    case 'stylish':
      return genDiff(parseFile1, parseFile2);
    default:
      throw new Error('Output format is not correct');
  }
};

const data1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const data2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
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

// console.log(genDiff(data1, data2));

console.log(genDiff(data3, data4));
// console.log(stringify(data3, 5));
export default genDiff;
