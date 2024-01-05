export const getValueOf = (value) => {
  switch (typeof (value)) {
    case 'string':
      return `'${value}'`;
    case 'boolean':
      return value;
    case null:
      return null;
    case 'object':
      if (value === null) {
        return value;
      }
      return '[complex value]';
    default:
      return value;
  }
};

export default (astTree) => {
  const property = 'Property';
  const iter = (object, path) => {
    const result = object
      .map((key) => {
        const fullKey = `${path}${key.key}`;

        switch (key.status) {
          case 'deleted':
            return `${property} '${fullKey}' was removed`;
          case 'added':
            return `${property} '${fullKey}' was added with value: ${getValueOf(key.value2)}`;
          case 'nested':
            return iter(key.children, `${fullKey}.`);
          case 'changed':
            return `${property} '${fullKey}' was updated. From ${getValueOf(key.value1)} to ${getValueOf(key.value2)}`;

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
