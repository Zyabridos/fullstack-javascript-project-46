const getValueOf = (value) => {
  switch (typeof (value)) {
    case 'string':
      return `'${value}'`;
    case 'boolean':
      return value;
    case null:
      return value;
    default:
      return '[complex value]';
  }
};

const genDiffPlain = (astTree) => {
  const property = 'Property';

  const iter = (parsedObj, path) => {
    const result = parsedObj
      .map((key) => {
        const fullKey = `${path}${key.key}`;
        switch (key.status) {
          case 'deleted':
            return `${property} '${fullKey}' was removed`;
          case 'added':
            return `${property} '${fullKey}' was added with value: ${getValueOf(key.firstValue)}`;
          case 'nested':
            return iter(key.children, `${fullKey}.`);
          case 'changed':
            return `${property} '${fullKey}' was updated. From ${getValueOf(key.firstValue)} to ${getValueOf(key.secondValue)}`;
          default:
            return null;
        }
      });

    return [...result]
      .filter((item) => item != null)
      .join('\n');
  };

  return iter(astTree, '');
};

export default genDiffPlain;

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

console.log(genDiffPlain(file1, file2));
