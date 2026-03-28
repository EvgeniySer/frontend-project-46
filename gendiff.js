#!/usr/bin/env node

import { program } from 'commander';
import readFile from './src/parser.js';

const version = '1.0.0';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(version, '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'display help for command')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const data1 = readFile(filepath1);
      const data2 = readFile(filepath2);

      console.log('File 1 data:', data1);
      console.log('File 2 data:', data2);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse();
