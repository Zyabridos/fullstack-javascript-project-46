import _ from 'lodash';
import sortKeysAlphabetically from '../utils.js';

const getValueOf = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  if (typeof (value) === 'boolean' || value == null) {
    return value;
  }
  return '[complex value]';
};

const genDiffPlain = (file1, file2) => {
  const property = 'Property';

  const iter = (parseObj1, parseObj2, path) => {
    const result = _.sortBy(_.union(_.keys(parseObj1), _.keys(parseObj2)))
      .map((key) => {
        const value1 = parseObj1[key];
        const value2 = parseObj2[key];
        const fullKey = `${path}${key}`;
        if (!_.has(parseObj2, key)) {
          return `${property} '${fullKey}' was removed`;
        }

        if (!_.has(parseObj1, key)) {
          return `${property} '${fullKey}' was added with value: ${getValueOf(value2)}`;
        }

        if (value1 !== value2) {
          if (_.isObject(value1) && _.isObject(value2)) {
            return iter(value1, value2, `${fullKey}.`);
          }
          return `${property} '${fullKey}' was updated. From ${getValueOf(value1)} to ${getValueOf(value2)}`;
        }

        return null;
      });

    return [...result]
      .filter((item) => item != null)
      .join('\n');
  };

  return iter(file1, file2, '');
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

// console.log(genDiffPlain(data3, data4));

export default genDiffPlain;
