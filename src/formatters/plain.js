const getValueOf = (value) => {
  switch (typeof (value)) {
    case 'string':
      return `'${value}'`;
    case 'boolean':
      return value;
    case null:
      return value;
    default:
      return '[complex value]';
  }
};

export default (astTree) => {
  const property = 'Property';

  const iter = (parsedObj, path) => {
    const result = parsedObj
      .map((key) => {
        const fullKey = `${path}${key.key}`;

        switch (key.status) {
          case 'deleted':
            return `${property} '${fullKey}' was removed`;
          case 'added':
            return `${property} '${fullKey}' was added with value: ${getValueOf(key.secondValue)}`;
          case 'nested':
            return iter(key.children, `${fullKey}.`);
          case 'changed':
            return `${property} '${fullKey}' was updated. From ${getValueOf(key.firstValue)} to ${getValueOf(key.secondValue)}`;
          default:
            return null;
        }
      });

    return [...result]
      .filter((item) => item != null)
      .join('\n');
  };

  return iter(astTree, '');
};
