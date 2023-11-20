#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/gendiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0')
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    return result;
  });

program.parse();
