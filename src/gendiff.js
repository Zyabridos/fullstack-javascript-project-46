import _ from 'lodash';

const sortKeysAlphabetically = (data) => Object.keys(data).sort().reduce((obj, key) => {
  obj[key] = data[key];
  return obj;
}, {});

const genDiff = (data1, data2) => {
  const sortedData1 = sortKeysAlphabetically(data1);
  let result = '';

  const entries = _.toPairs({ ...sortedData1, ...data2 });

  for (const [key, value] of entries) {
    if (!Object.hasOwn(data1, key)) {
      result += `${` + ${key}`}: ${value}\n`;
    } else if (!Object.hasOwn(data2, key)) {
      result += `${` - ${key}`}: ${value}\n`;
    } else if (data1[key] === data2[key]) {
      result += `${`   ${key}`}: ${value}\n`;
    } else if (data1[key] !== data2[key]) {
      const valueOfChangedFirstKey = data1[key];
      const valueOfChangedSecondKey = data2[key];
      result += `${` - ${key}`}: ${valueOfChangedFirstKey}\n`;
      result += `${` + ${key}`}: ${valueOfChangedSecondKey}\n`;
    }
  }

  return `{\n${result}}`;
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

console.log(genDiff(data1, data2));

export default genDiff;
