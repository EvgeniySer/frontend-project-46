#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs';
import generateDiff from './src/gendiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .command('*')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2) => {
    const content1 = fs.readFileSync(filepath1, 'utf-8');
    const content2 = fs.readFileSync(filepath2, 'utf-8');

    const data1 = JSON.parse(content1);
    const data2 = JSON.parse(content2);

    const diff = generateDiff(data1, data2);
    console.log(diff);
  });

program.parse();
