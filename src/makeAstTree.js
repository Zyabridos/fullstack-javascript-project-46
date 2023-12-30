import _ from 'lodash';

const makeAstTree = (data1, data2) => _.sortBy(_.union(_.keys(data1), _.keys(data2)))
  .map((key) => {
    const firstValue = data1[key];
    const secondValue = data2[key];

    if (!_.has(data2, key)) {
      return {
        status: 'deleted',
        key,
        firstValue,
      };
    }
    if (!_.has(data1, key)) {
      return {
        status: 'added',
        key,
        secondValue,
      };
    }
    if (_.isObject(firstValue) && _.isObject(secondValue)) {
      return {
        status: 'nested',
        key,
        children: makeAstTree(firstValue, secondValue),
      };
    }
    if (firstValue !== secondValue) {
      return {
        status: 'changed',
        key,
        firstValue,
        secondValue,
      };
    }
    return {
      status: 'unchanged',
      firstValue,
      key,
    };
  });

export default makeAstTree;
