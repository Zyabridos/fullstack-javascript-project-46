import _ from 'lodash';

const makeAstTree = (data1, data2) => _.sortBy(_.union(_.keys(data1), _.keys(data2)))
  .map((key) => {
    const firstValue = data1[key];
    const secondValue = data2[key];

    if (!_.has(data1, key)) {
      return {
        key,
        secondValue,
        status: 'added',
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        firstValue,
        status: 'deleted',
      };
    }
    if (_.isObject(firstValue) && _.isObject(secondValue)) {
      return {
        key,
        children: makeAstTree(firstValue, secondValue),
        status: 'nested',
      };
    }
    if (firstValue !== secondValue) {
      return {
        key,
        firstValue,
        status: 'changed',
        secondValue,
      };
    }
    return {
      key,
      firstValue,
      status: 'unchanged',
    };
  });

export default makeAstTree;

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

console.log(JSON.stringify(makeAstTree(file1, file2)));
