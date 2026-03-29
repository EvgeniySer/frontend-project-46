import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import generateDiff from '../src/gendiff.js';

// Получаем __dirname для ES‑модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Функция для получения пути к тестовым файлам
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('gendiff', () => {
  test('compares two flat JSON files correctly', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    const actual = generateDiff(filepath1, filepath2);
    expect(actual).toBe(expected);
  });

  test('handles identical files', () => {
    const filepath = getFixturePath('file1.json');

    const expected = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`;

    const actual = generateDiff(filepath, filepath);
    expect(actual).toBe(expected);
  });

  test('handles empty files', () => {
    const filepath = getFixturePath('empty.json');

    const expected = `{}`;

    const actual = generateDiff(filepath, filepath);
    expect(actual).toBe(expected);
  });

  test('compares two flat YAML files correctly', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    const actual = generateDiff(filepath1, filepath2);
    expect(actual).toBe(expected);
  });
});
