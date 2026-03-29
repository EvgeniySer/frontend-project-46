import parse from './parse.js';

export default (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const allKeys = new Set([...Object.keys(data1), ...Object.keys(data2)]);
  const sortedKeys = Array.from(allKeys).sort();
  const lines = [];

  for (const key of sortedKeys) {
    if (key in data1 && key in data2) {
      if (data1[key] === data2[key]) {
        lines.push(`  ${key}: ${data1[key]}`);
      } else {
        lines.push(`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`);
      }
    } else if (key in data1) {
      lines.push(`- ${key}: ${data1[key]}`);
    } else {
      lines.push(`+ ${key}: ${data2[key]}`);
    }
  }

  if (lines.length === 0) {
    return '{}';
  }

  return `{\n  ${lines.join('\n  ')}\n}`;
};
