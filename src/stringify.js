const stringify = (data, replacer = ' ', spacesCount = 1) => {
  const result = {};
  const entries = Object.entries(data);
  if (typeof data === 'object') {
    // return Object.entries(data).map(([key, value]) =>
    // data[replacer.repeat(spacesCount) + key] = value);
    for (const [key, value] of entries) {
      result[replacer.repeat(spacesCount) + key] = value;
    }
    return result;
  }
  return `${replacer.repeat(spacesCount)}${data}`;
};

const data = { hello: 'world', is: true, nested: { count: 5 } };
console.log(stringify('Hello', '+', 5));
console.log(stringify(data, ' - '));
