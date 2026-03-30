import { test, expect, describe } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import compareFiles from '../src/compareFiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// Строгая нормализация строк
const normalizeString = (str) => str
  .replace(/\r\n/g, '\n')
  .replace(/\n+/g, '\n')
  .replace(/^\n+|\n+$/g, '')
  .trim()
  .replace(/[ \t]+$/gm, '')
  .split('\n')
  .map(line => line.trim())
  .join('\n');

describe.each([
  ['file1nested.json', 'file2nested.json', 'stylish', 'expected_nested_file.txt'],
  ['file1nested.yaml', 'file2nested.yaml', 'stylish', 'expected_nested_file.txt'],
  ['file1nested.json', 'file2nested.json', 'plain', 'expected_plain_file.txt'],
  ['file1nested.json', 'file2nested.json', 'json', 'expected_json_file.json'],
])('.compareFiles(%s, %s, %s)', (a, b, c, expected) => {
  test(`returns ${expected}`, () => {
    console.log('=== DEBUG: Test Execution ===');
    console.log('Format:', c);
    console.log('Files:', a, 'vs', b);

    const actual = compareFiles(a, b, c);
    const expectedContent = fs.readFileSync(getFixturePath(expected), 'utf8');

    console.log('Actual length:', actual.length);
    console.log('Expected length:', expectedContent.length);

    const normalizedActual = normalizeString(actual);
    const normalizedExpected = normalizeString(expectedContent);

    expect(normalizedActual).toBe(normalizedExpected);
  });
});
