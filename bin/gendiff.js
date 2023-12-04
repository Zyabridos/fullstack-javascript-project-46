#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/formatters/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format (default: "stylish")')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2, option) => {
    const type = option.format ? option.format : 'stylish';
    const result = genDiff(filepath1, filepath2, option.type);
    console.log(result);
  });

program.parse();
