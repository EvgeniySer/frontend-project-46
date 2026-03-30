import { test, expect, describe } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import compareFiles from '../src/compareFiles.js';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// Функция нормализации строк — учитывает разные варианты форматирования
const normalizeString = (str) => str
  .replace(/\r\n/g, '\n')      // заменяем CRLF на LF
  .replace(/\n+/g, '\n')       // множественные \n → один \n
  .replace(/^\n+|\n+$/g, '')   // убираем \n в начале и конце
  .trim()                      // убираем пробелы по краям
  .replace(/[ \t]+$/gm, ''); // убираем пробелы/табы в конце каждой строки

// Функция для проверки парсинга YAML (если файлы имеют расширение .yaml)
const validateYamlFiles = (file1, file2) => {
  if (file1.endsWith('.yaml') || file2.endsWith('.yaml')) {
    try {
      const content1 = fs.readFileSync(getFixturePath(file1), 'utf8');
      const content2 = fs.readFileSync(getFixturePath(file2), 'utf8');
      yaml.load(content1);
      yaml.load(content2);
    } catch (error) {
      console.error('YAML parsing error:', error);
      throw error;
    }
  }
};

describe.each([
  ['file1nested.json', 'file2nested.json', 'stylish', 'expected_nested_file.txt'],
  ['file1nested.yaml', 'file2nested.yaml', 'stylish', 'expected_nested_file.txt'],
  ['file1nested.json', 'file2nested.json', 'plain', 'expected_plain_file.txt'],
  ['file1nested.json', 'file2nested.json', 'json', 'expected_json_file.json'],
])('.compareFiles(%s, %s, %s)', (a, b, c, expected) => {
  test(`returns ${expected}`, () => {
    // Отладочная печать: версии Node.js и npm, текущие параметры теста
    console.log('=== DEBUG: gendiff test ===');
    console.log('Node.js version:', process.version);
    console.log('Format:', c);
    console.log('File1:', a);
    console.log('File2:', b);
    console.log('Expected file:', expected);

    // Проверяем парсинг YAML, если это YAML‑файлы
    validateYamlFiles(a, b);

    // Получаем фактический результат и ожидаемое содержимое
    const actual = compareFiles(a, b, c);
    const expectedContent = fs.readFileSync(getFixturePath(expected), 'utf8');

    // Выводим длины строк для диагностики
    console.log('Actual length:', actual.length);
    console.log('Expected length:', expectedContent.length);

    // Выводим первые 100 символов для визуального сравнения
    console.log('Actual (first 100 chars):', actual.substring(0, 100));
    console.log('Expected (first 100 chars):', expectedContent.substring(0, 100));

    // Нормализуем строки перед сравнением
    const normalizedActual = normalizeString(actual);
    const normalizedExpected = normalizeString(expectedContent);

    // Выводим нормализованные длины и содержимое
    console.log('Normalized actual length:', normalizedActual.length);
    console.log('Normalized expected length:', normalizedExpected.length);
    console.log('Normalized actual:', normalizedActual);
    console.log('Normalized expected:', normalizedExpected);

    // Сравниваем нормализованные строки
    expect(normalizedActual).toBe(normalizedExpected);
  });
});
