import _ from 'lodash';

const stringify = (data, replacer = '', repeatReplacer = 1) => {
  let objectToStr = '';
  if (typeof data === 'object') {
    // return _.toPairs(data).map(([key, value]) =>
    // objectToStr = `${replacer.repeat(spacesCount) + key} : ${value}\n`);
    for (const [key, value] of _.toPairs(data)) {
      objectToStr += `${replacer.repeat(repeatReplacer) + key}: ${value}\n`;
    }
    return objectToStr;
  }
  const stringWithoustQuotation = data.replaceAll("'", '');
  return `${replacer.repeat(repeatReplacer)}${stringWithoustQuotation}`;
};

const data = {
  hello: 'world',
  is: true,
};

const nested = {
  string: 'value',
  boolean: true,
  number: 5,
  float: 1.25,
  object: {
    5: 'number',
    1.25: 'float',
    null: 'null',
    true: 'boolean',
    value: 'string',
    nested: {
      boolean: true,
      float: 1.25,
      string: 'value',
      number: 5,
      null: null,
    },
  },
};
console.log(stringify('Hello', '+', 5));
console.log(stringify('Hello'));
console.log(stringify(data, '+', 2));
console.log(stringify(nested, '* ', 6));
