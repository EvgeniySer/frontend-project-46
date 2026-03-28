import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const allKeys = _.sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])]);

  const lines = allKeys.map(key => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);

    if (!hasKey1) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (!hasKey2) {
      return `  - ${key}: ${data1[key]}`;
    }

    const value1 = data1[key];
    const value2 = data2[key];

    if (value1 !== value2) {
      return [
        `  - ${key}: ${value1}`,
        `  + ${key}: ${value2}`
      ].join('\n');
    }

    return `    ${key}: ${value1}`;
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default generateDiff;
