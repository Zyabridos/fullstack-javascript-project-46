import _ from 'lodash';

const makeAstTree = (data1, data2) => _.sortBy(_.union(_.keys(data1), _.keys(data2)))
  .map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data2, key)) {
      return {
        status: 'deleted',
        key,
        value1,
      };
    }
    if (!_.has(data1, key)) {
      return {
        status: 'added',
        key,
        value2,
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        status: 'nested',
        key,
        children: makeAstTree(value1, value2),
      };
    }
    if (value1 !== value2) {
      return {
        status: 'changed',
        key,
        value1,
        value2,
      };
    }
    return {
      status: 'unchanged',
      value1,
      key,
    };
  });

export default makeAstTree;
