import _ from 'lodash';

const printValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const cb = (node, path = '') => {
    const {
      key, value, type, newValue, children,
    } = node;
    const lines = [];

    const currentPath = path ? `${path}.${key}` : key;

    switch (type) {
      case 'root':
        children.forEach((child) => {
          const childLines = cb(child, currentPath);
          lines.push(...childLines);
        });
        break;

      case 'nested':
        children.forEach((child) => {
          const childLines = cb(child, currentPath);
          lines.push(...childLines);
        });
        break;

      case 'added':
        lines.push(`Property '${currentPath}' was added with value: ${printValue(value)}`);
        break;

      case 'removed':
        lines.push(`Property '${currentPath}' was removed`);
        break;

      case 'updated':
        lines.push(`Property '${currentPath}' was updated. From ${printValue(value)} to ${printValue(newValue)}`);
        break;

      default:
        break;
    }

    return lines;
  };

  return cb(tree, '').join('\n');
};

export default plain;
