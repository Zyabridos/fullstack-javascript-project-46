import _ from 'lodash';

const added = (data1, data2) => _.toPairs(data2).filter(([key]) => !Object.hasOwn(data1, key));

const deleted = (data1, data2) => _.toPairs(data1).filter(([key]) => !Object.hasOwn(data2, key));

const unchanged = (data1, data2) => _.toPairs(data1).filter(([key]) => data1[key] === data2[key]);

const changed = (data1, data2) => _.toPairs(data1).filter(([key, value]) => data1[value] !== data2[value]);

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

console.log(added(data1, data2));
console.log(deleted(data1, data2));
console.log(unchanged(data1, data2));
console.log(changed(data1, data2));
