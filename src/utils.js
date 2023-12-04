const sortKeysAlphabetically = (data) => Object.keys(data).sort().reduce((obj, key) => {
  obj[key] = data[key];
  return obj;
}, {});

export default sortKeysAlphabetically;
