import _ from 'lodash';

function intersect(data1, data2) {
  return Object.keys(data1).filter((k) => Object.hasOwn(data2, k));
}

const gendiff = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const values1 = _.values(data1);
  const values2 = _.values(data2);
  const entries1 = _.toPairs(data1);
  const entries2 = _.toPairs(data2);
  const keys = _.keys({ ...data1, ...data2 });
  const entries = _.toPairs({ ...data1, ...data2 });
  const result = {};
  for (const [key, value] of entries) {
    if (!Object.hasOwn(data1, key)) {
      result[key] = `added ${value}`;
    } else if (!Object.hasOwn(data2, key)) {
      result[key] = `deleted ${value}`;
    } else if ((data1[key] === data2[key]) && (data1[value] === data2[value])) {
      result[key] = `unchnged ${value}`;
    } else { result[keys1] = values1; }
  }
  return result;
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

console.log(gendiff(data1, data2));

// for (const [key, value] of entries) {
//   if (!Object.hasOwn(data1, key)) {
//     result[key] = `added ${value}`;
//   } else if (!Object.hasOwn(data2, key)) {
//     result[key] = `deleted ${value}`;
//   } else if ((data1[key] === data2[key]) && (data1[value] === data2[value])) {
//     result[key] = `unchnged ${value}`
//   } else result[key] = value;
// }
