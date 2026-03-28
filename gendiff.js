#!/usr/bin/env node

import { program } from 'commander';

const version = '1.0.0';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(version, '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'display help for command')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(`Comparing files:\nFile 1: ${filepath1}\nFile 2: ${filepath2}`);
    console.log(`Format: ${program.opts().format || 'default'}`);
  });

program.parse();
