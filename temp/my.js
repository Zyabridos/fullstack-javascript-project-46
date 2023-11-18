function intersect(data1, data2) {
  return Object.keys(data1).filter((k) => Object.hasOwn(data2, k));
}

function added(data1, data2) {
  return Object.entries(data1).filter(([e, k]) => (Object.entries(data2, [e, k])) === (Object.entries(data1, [e, k])));
}

function deletedKeys(data1, data2) {
  return Object.keys(data1).filter((k) => !Object.hasOwn(data2, k));
}

const gendiff = (data1, data2) => {
  deletedKeys(data1, data2);
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
