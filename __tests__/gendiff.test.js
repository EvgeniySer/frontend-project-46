import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import generateDiff from '../src/gendiff.js';
import parse from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

describe('gendiff', () => {
  test('compares two flat JSON files correctly', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    const data1 = parse(filepath1);
    const data2 = parse(filepath2);

    const expected = fs.readFileSync(
      getFixturePath('expected.txt'),
      'utf-8'
    ).trim();

    const actual = generateDiff(data1, data2);
    expect(actual).toBe(expected);
  });

  test('handles identical files', () => {
    const filepath = getFixturePath('file1.json');
    const data = parse(filepath);

    const expected = `{
  follow: false
  host: hexlet.io
  proxy: 123.234.53.22
  timeout: 50
}`;


    const actual = generateDiff(data, data);
    expect(actual).toBe(expected);
  });

  test('handles empty files', () => {
    const empty = {};
    const expected = `{}`;
    const actual = generateDiff(empty, empty);
    expect(actual).toBe(expected);
  });
});
