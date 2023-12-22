import _ from 'lodash';

export default (data1, data2) => _.sortBy(_.union(_.keys(data1), _.keys(data2)))
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
