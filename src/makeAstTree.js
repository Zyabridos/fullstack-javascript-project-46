import _ from 'lodash';

const makeAstTree = (data1, data2) => _.sortBy(_.union(_.keys(data1), _.keys(data2)))
  .map((key) => {
    const value = data1[key];
    const Value = data2[key];
    const changedTo = data2[key];

    if (!_.has(data1, key)) {
      return {
        key,
        Value,
        status: 'added',
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        value,
        status: 'deleted',
      };
    }
    if (_.isObject(value) && _.isObject(Value)) {
      return {
        key,
        children: makeAstTree(value, Value),
        status: 'nested',
      };
    }
    if (value !== Value) {
      return {
        key,
        value,
        status: 'changed',
        changedTo,
      };
    }
    return {
      key,
      value,
      status: 'unchanged',
    };
  });

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

const result = makeAstTree(file1, file2);
console.log(JSON.stringify(result));
